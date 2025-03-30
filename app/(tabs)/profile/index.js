import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image } from "react-native";
import { supabase } from "../../../lib/supabase-client";
import { useEffect, useState } from "react";
import MainHeader from "../../../components/mainHeader";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({ name: "", email: "", avatar_url: "", username: "", created_at: "" });

  useEffect(() => {
    async function fetchUser() {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        const { data, error: profileError } = await supabase
          .from("profiles")
          .select("name, email, avatar_url, username, created_at")
          .eq("id", user.id)
          .single();
        if (data) {
          setUserData(data);
        }
      } else {
        Alert.alert("Error Accessing User");
      }
    }
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F5F7FA" }}>
      <MainHeader />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image 
            source={{ uri: userData.avatar_url || "https://via.placeholder.com/100" }} 
            style={styles.profileImage} 
          />
          <Text style={styles.nameText}>{userData.name || "No Name Found"}</Text>
          <Text style={styles.usernameText}>@{userData.username || "Unknown"}</Text>
          <Text style={styles.emailText}>{userData.email || "No Email Found"}</Text>
          <Text style={styles.joinDateText}>Joined: {userData.created_at ? new Date(userData.created_at).toDateString() : "Unknown"}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  profileContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    width: "90%",
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#000968",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#666",
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
  },
  joinDateText: {
    fontSize: 14,
    color: "#777",
    fontStyle: "italic",
  },
});
