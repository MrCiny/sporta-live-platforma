import { View } from "react-native";
import { Stack } from "expo-router";
import { Text } from "react-native";

export default function Home() {
    return (
        <View>
            <Stack.Screen options={{ headerShown: true, title: "Home"}} />
            <Text>Welcome to the home page</Text>
        </View>
    )
}