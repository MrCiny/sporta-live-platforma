import { Header } from "react-native-elements";
import { Button, Icon, Avatar } from '@rneui/themed';
import { router } from "expo-router";
import { supabase } from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { getStyles } from "@/styles/styles";
import { useTheme } from "./themeContext";

export default function MainHeader() {
    const { theme, toggleTheme } = useTheme();
    const styles = getStyles(theme);
    const [pic, setPic] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
      useEffect(() => {
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
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (user.user_metadata.avatar_url) {
            let avatar_url = user.user_metadata.avatar_url
            getPicture(avatar_url)
          }
        });
      }, []);

    const redirectSettings = () => {
        router.replace("/(tabs)/settings");
    }
    
    const settingsButton = () => {
        return (
            <Button 
                onPress={redirectSettings}
                type="clear"
                buttonStyle={styles.iconButton}
            >
                <Icon type="antdesign" name="setting" color="white"/>
            </Button>
        )
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
                <Avatar
                    size={40}
                    rounded
                    source={{ uri: pic }}
                    onPress={() => router.replace("/(tabs)/profile")}
                    containerStyle={styles.avatar}
                />
            }   
        />
    );
}
