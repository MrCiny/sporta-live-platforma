import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { supabase } from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/themeContext";
import { getStyles } from "@/styles/styles";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import { handleImageUpload } from "@/components/handleGallery";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({ name: "", email: "", image: "", username: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    fetchUser()
  }, []);

  const fetchUser = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
          .from("Users")
          .select("*")
          .eq("user_id", user.id)
          .single();

      setUser(data);
      const isValidUrl = (url) => {
        try {
          new URL(url);
          return true;
        } catch (_) {
          return false;
        }
      };
      let avatar_url = data.image

      if (!isValidUrl(avatar_url)) {
        const { data, error } = await supabase
          .storage
          .from("avatars")
          .getPublicUrl(avatar_url);

        if (!error) {
          avatar_url = data.publicUrl;
        }
      }
      setUserData({
        name: data.name || "",
        email: data.email || "",
        avatar_url: avatar_url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        username: data.username || "",
        id: data.user_id
      });
    } else {
      Alert.alert("Error Accessing User");
    }
  }
  
  const handleUpdateProfile = async () => {
    let avatarUrl = userData.avatar_url;
    if (imageUri) 
      avatarUrl = await handleImageUpload('avatars', imageUri);

    const { error } = await supabase.auth.updateUser({
      data: {
        name: userData.name,
        username: userData.username,
        avatar_url: avatarUrl,
      },
    });
    
    await supabase.from("Users").update({ username: userData.username, image: avatarUrl, name: userData.name }).eq("user_id", userData.id)

    if (error) {
      Alert.alert("Error Updating Profile", error.message);
    } else {
      Alert.alert("Profile Updated Successfully");
      global.refreshTabs?.()

      setIsEditing(false);
    }
  };

  const handleChooseImage = async () => {
    const options = {
      title: 'Choose Profile Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    let response = await ImagePicker.launchImageLibraryAsync(options);
    if (response) {
      if (response.canceled) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {user && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: imageUri || userData.avatar_url }} style={styles.profileImage} />
            {isEditing ? (
              <>
                <Text style={styles.usernameText}>Name:</Text>
                <TextInput placeholderTextColor="#999" style={styles.input} value={userData.name} onChangeText={(text) => setUserData({ ...userData, name: text })} placeholder="Name" />
                <Text style={styles.usernameText}>Username:</Text>
                <TextInput placeholderTextColor="#999" style={styles.input} value={userData.username} onChangeText={(text) => setUserData({ ...userData, username: text })} placeholder="Username" />
                <TouchableOpacity onPress={handleChooseImage} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Change Profile Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleUpdateProfile} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.nameText}>{userData.name || "No Name Found"}</Text>
                <Text style={styles.usernameText}>@{userData.username || "Unknown"}</Text>
                <Text style={styles.emailText}>{userData.email || "No Email Found"}</Text>
                <Text style={styles.joinDateText}>Joined: {new Date(userData.created_at).toDateString()}</Text>
                <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity 
              onPress={async () => {
                await supabase.auth.signOut()
                router.navigate("/(auth)/login")
              }} 
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
