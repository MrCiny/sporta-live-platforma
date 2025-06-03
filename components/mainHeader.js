import { Header } from "react-native-elements";
import { Button, Icon, Avatar, Text } from '@rneui/themed';
import { router } from "expo-router";
import { supabase } from "@/lib/supabase-client";
import React, { useEffect, useRef, useState } from "react";
import { getStyles } from "@/styles/styles";
import { useTheme } from "./themeContext";
import { View } from "react-native";
export default function MainHeader() {
    const { theme, toggleTheme } = useTheme();
    const styles = getStyles(theme);
    const [pic, setPic] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
    const [role, setRole] = useState("User")  
    useEffect(() => {        
      checkAccess()
    }, []);

    const checkAccess = async () => {
      const { data: { user } } = await supabase.auth.getUser();
  
      if (!user) {
        router.navigate("/(auth)/login");
        return;
      }
      supabase.auth.getUser().then(async ({ data: { user } }) => {
        const { data, error } = await supabase
          .from("Users")
          .select("role,image")
          .eq("user_id", user.id)
          .single();

        if (!error) {
          setPic(data.image)
          setRole(data.role)
          getPicture(data.image)
        }
      });
    }

    async function getPicture(avatar_url) {
      const isValidUrl = (url) => {
          try {
            new URL(url);
            return true;
          } catch (_) {
            return false;
          }
        };

        if (!isValidUrl(avatar_url)) {
          const { data, error } = await supabase
              .storage
              .from("avatars")
              .getPublicUrl(avatar_url);

          if (!error) {
            avatar_url = data.publicUrl;
          }
        }
      setPic(avatar_url)
    }

    const redirectSportDash = () => {
        router.navigate("/(tabs)/sportsDashboard");
    }

    const redirectNewsDash = () => {
      router.navigate("/(tabs)/newsDashboard");
    }

    return (
        <Header
            containerStyle={styles.headerContainer}
            leftComponent={
                <Button 
                    onPress={toggleTheme} 
                    type="clear" 
                    icon={<Icon type="feather" name={theme === "dark" ? "sun" : "moon"} color="#fff" />}
                />
            }
            centerComponent={{ text: 'SportsLife LV', style: { color: '#fff', fontSize: 24, fontWeight: "bold", textAlign: "center" } }}
            rightComponent={
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                {role === "Admin" && (
                  <Button 
                    onPress={redirectSportDash} 
                    type="clear" 
                    icon={<Icon type="master" name="scoreboard" color="#fff" />}
                  />
                )}
                {(role === "Admin" || role === "Author") && (
                  <Button 
                    onPress={redirectNewsDash} 
                    type="clear" 
                    icon={<Icon type="master" name="article" color="#fff" />}
                  /> 
                )}   
                <Avatar
                    size={40}
                    rounded
                    source={{ uri: pic }}
                    onPress={() => router.navigate("/(tabs)/profile")}
                    containerStyle={styles.avatar}
                />
              </View>
            }   
        />
    );
}
