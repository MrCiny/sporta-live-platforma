import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import { supabase } from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import MainHeader from "@/components/mainHeader";
import { useTheme } from "@/components/themeContext";
import { getStyles } from "@/styles/styles";
import * as ImagePicker from 'expo-image-picker';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({ name: "", email: "", avatar_url: "", username: "", created_at: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const { theme } = useTheme();
  const styles = getStyles(theme);

  useEffect(() => {
    async function fetchUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const isValidUrl = (url) => {
          try {
            new URL(url);
            return true;
          } catch (_) {
            return false;
          }
        };
        let avatar_url = user.user_metadata?.avatar_url

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
          name: user.user_metadata?.name || "",
          email: user.email || "",
          avatar_url: avatar_url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          username: user.user_metadata?.username || "",
          created_at: user.created_at,
          id: user.id
        });
      } else {
        Alert.alert("Error Accessing User");
      }
    }
    fetchUser();
  }, []);
  
  const handleUpdateProfile = async () => {
    let avatarUrl = userData.avatar_url;
    if (imageUri) {
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`${Date.now()}`, { uri: imageUri }, { contentType: 'image/png' });

      if (error) {
        Alert.alert("Error uploading image", error.message);
        return;
      }

      avatarUrl = data?.path;
    }

    const { error } = await supabase.auth.updateUser({
      data: {
        name: userData.name,
        username: userData.username,
        avatar_url: avatarUrl,
      },
    });
    
    await supabase.from("Users").update({ username: userData.username, image: avatarUrl }).eq("user_id", userData.id)

    if (error) {
      Alert.alert("Error Updating Profile", error.message);
    } else {

      Alert.alert("Profile Updated Successfully");
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
      <MainHeader />
      {user && (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.profileContainer}>
            <Image source={{ uri: imageUri || userData.avatar_url }} style={styles.profileImage} />
            {isEditing ? (
              <>
                <TextInput style={styles.input} value={userData.name} onChangeText={(text) => setUserData({ ...userData, name: text })} placeholder="Name" />
                <TextInput style={styles.input} value={userData.username} onChangeText={(text) => setUserData({ ...userData, username: text })} placeholder="Username" />
                <TouchableOpacity onPress={handleChooseImage} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>CHANGE PROFILE PHOTO</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleUpdateProfile} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>SAVE</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.nameText}>{userData.name || "No Name Found"}</Text>
                <Text style={styles.usernameText}>@{userData.username || "Unknown"}</Text>
                <Text style={styles.emailText}>{userData.email || "No Email Found"}</Text>
                <Text style={styles.joinDateText}>Joined: {new Date(userData.created_at).toDateString()}</Text>
                <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>EDIT</Text>
                </TouchableOpacity>
              </>
            )}
            <TouchableOpacity onPress={async () => await supabase.auth.signOut()} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
