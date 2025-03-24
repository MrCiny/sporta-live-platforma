import { View, Text } from "react-native";
import { Stack } from "expo-router";
import MainHeader from "../../../components/mainHeader";

export default function Home() {
    return (
        <>
            <MainHeader />
            <View>
                <Text>Welcome to the home page</Text>
            </View>
        </>
    )
}