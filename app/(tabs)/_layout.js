import { Tabs } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider, useTheme } from "@/components/themeContext";
import { getStyles } from "@/styles/styles";

export default function TabsLayout() {
  return (
    <ThemeProvider>
      <TabsWithTheme />
    </ThemeProvider>
  );
}

function TabsWithTheme() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: styles.tabBarStyle}}>
        <Tabs.Screen
          name="volleyball"
          options={{
            tabBarLabel: "Volleyball",
            title: "Volleyball",
            tabBarIcon: ({ color }) => (
              <FontAwesome5
                size={28}
                style={{ marginBottom: -3 }}
                name="volleyball-ball"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="hockey"
          options={{
            tabBarLabel: "Hockey",
            title: "Hockey",
            tabBarIcon: ({ color }) => (
              <FontAwesome5
                size={28}
                style={{ marginBottom: -3 }}
                name="hockey-puck"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="sports"
          options={{
            tabBarLabel: "Sports",
            title: "Sports",
            tabBarIcon: ({ color }) => (
              <FontAwesome5
                size={28}
                style={{ marginBottom: -3 }}
                name="medal"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="football"
          options={{
            tabBarLabel: "Football",
            title: "Football",
            tabBarIcon: ({ color }) => (
              <FontAwesome
                size={28}
                style={{ marginBottom: -3 }}
                name="soccer-ball-o"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="basketball"
          options={{
            tabBarLabel: "Basketball",
            title: "Basketball",
            tabBarIcon: ({ color }) => (
              <FontAwesome5
                size={28}
                style={{ marginBottom: -3 }}
                name="basketball-ball"
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="sportsDashboard"
          options={{
            href: null
          }}
        />
        <Tabs.Screen
          name="news"
          options={{
            href: null
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            href: null
          }}
        />
        <Tabs.Screen
          name="streams"
          options={{
            href: null
          }}
        />
      </Tabs>
  )
}