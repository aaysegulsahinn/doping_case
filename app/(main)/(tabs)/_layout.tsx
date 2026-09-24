import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Colors } from "../../../constants/theme";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.secondary,
          borderTopColor: Colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="scenarios"
        options={{
          title: "SCENARIOS",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="compass" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="dna"
        options={{
          title: "DNA",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="line-chart" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "SETTINGS",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cog" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
