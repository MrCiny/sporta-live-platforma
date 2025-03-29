import { View, Text } from "react-native";
import { Stack } from "expo-router";
import MainHeader from "../../../components/mainHeader";

export default function Hockey() {
    return (
        <>
            <MainHeader />
            <View>
                <Text>Welcome to the Hockey page</Text>
            </View>
        </>
    )
}