import { View, Text } from "react-native";
import { Stack } from "expo-router";
import MainHeader from "../../../components/mainHeader";

export default function Volleyball() {
    return (
        <>
            <MainHeader />
            <View>
                <Text>Welcome to the Volleyball page</Text>
            </View>
        </>
    )
}