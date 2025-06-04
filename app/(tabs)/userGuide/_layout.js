import { Slot, Stack, Tabs } from "expo-router";

export default function GuideLayout() {
  return (
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    );
}