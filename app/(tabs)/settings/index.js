import { Text, View, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { supabase } from "../../../lib/supabase-client";
import { useEffect, useState } from "react";
import MainHeader from "../../../components/mainHeader";
import { useTheme } from "../../../components/themeContext";
import { getStyles } from "../../../styles/styles";

export default function Settings() {
  const [user, setUser] = useState(null);
  const { theme, toggleTheme } = useTheme();
              
    const styles = getStyles(theme);
  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUser(user);
      } else {
        Alert.alert("Error Accessing User");
      }
    });
  }, []);

  const doLogout = async () => {
    const {error} = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Error Signing Out User", error.message);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MainHeader />
      <ScrollView>
      <View style={{ padding: 16 }}>
        <Text>{JSON.stringify(user, null, 2)}</Text>
        <TouchableOpacity onPress={doLogout} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>LOGOUT</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}