import { View, Text } from "react-native";
import { Stack } from "expo-router";
import MainHeader from "../../../components/mainHeader";

export default function Basketball() {
    return (
        <>
            <MainHeader />
            <View>
                <Text>Welcome to the Basketball page</Text>
            </View>
        </>
    )
}