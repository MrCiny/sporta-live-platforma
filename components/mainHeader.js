import { Header } from "react-native-elements";
import { Button, Icon } from '@rneui/themed';
import { router } from "expo-router";

export default function MainHeader() {
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
            centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
        />
    );
}