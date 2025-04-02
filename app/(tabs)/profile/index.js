import { Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from "react-native";
import { supabase } from "../../../lib/supabase-client";
import { useEffect, useState } from "react";
import MainHeader from "../../../components/mainHeader";
import { useTheme } from "../../../components/themeContext";
import { getStyles } from "../../../styles/styles";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({ name: "", email: "", avatar_url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png", username: "", created_at: "" });

  const { theme } = useTheme();
  const styles = getStyles(theme);

  const doLogout = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error Signing Out User", error.message);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const hey = {
          ...userData,
          ...user.user_metadata,
          ...user
        }
        setUserData(hey);
      } else {
        Alert.alert("Error Accessing User");
      }
    }
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <MainHeader />
      {user && 
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.profileContainer}>
            {console.log(user)}
            <Image 
              source={{ uri: userData.avatar_url || "https://via.placeholder.com/100" }} 
              style={styles.profileImage} 
            />
            <Text style={styles.nameText}>{userData.name || "No Name Found"}</Text>
            <Text style={styles.usernameText}>@{userData.username || "Unknown"}</Text>
            <Text style={styles.emailText}>{userData.email || "No Email Found"}</Text>
            <Text style={styles.joinDateText}>Joined: {userData.created_at ? new Date(userData.created_at).toDateString() : "Unknown"}</Text>
            <TouchableOpacity onPress={doLogout} style={styles.buttonContainer}>
              <Text style={styles.buttonText}>LOGOUT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      }
    </SafeAreaView>
  );
}
