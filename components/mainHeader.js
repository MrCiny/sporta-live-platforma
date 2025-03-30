import { Header } from "react-native-elements";
import { Button, Icon, Avatar } from '@rneui/themed';
import { router } from "expo-router";
import { supabase } from "../lib/supabase-client";
import { useEffect, useState } from "react";

export default function MainHeader() {
    const [pic, setPic] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png");
      useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
          if (user.user_metadata.avatar_url) {
            setPic(user.user_metadata.avatar_url);
          }
        });
      }, []);

    const redirectSettings = () => {
        router.replace("/(tabs)/settings");
    }

    const settingsButton = () => {
        return (
            <Button onPress={redirectSettings}>
                <Icon type="antdesign" name="setting" color="white"/>
            </Button>
        )
    }

    return (
        <Header
            leftComponent={settingsButton}
            centerComponent={{ text: 'SportsLife LV', style: { color: '#fff', fontSize: 30 } }}
            rightComponent={
                <Avatar
                    size={40}
                    rounded
                    source={{ uri: pic }}
                />
            }   
        />
    );
}