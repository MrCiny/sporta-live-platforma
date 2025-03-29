import { View, Text } from "react-native";
import { Stack } from "expo-router";
import MainHeader from "../../../components/mainHeader";

export default function Football() {
    return (
        <>
            <MainHeader />
            <View>
                <Text>Welcome to the Football page</Text>
            </View>
        </>
    )
}