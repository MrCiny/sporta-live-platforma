import { Header } from "react-native-elements";
import { Button, Icon, Avatar } from '@rneui/themed';
import { router } from "expo-router";
import { supabase } from "../lib/supabase-client";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

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
            leftComponent={settingsButton}
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

const styles = StyleSheet.create({
    headerContainer: {
        borderBottomWidth: 0, 
        paddingHorizontal: 10,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    iconButton: {
        padding: 5,
    },
    avatar: {
        borderWidth: 2,
        borderColor: "#fff",
    },
});