import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="scenario/[id]/briefing" />
      <Stack.Screen name="scenario/[id]/video" />
      <Stack.Screen name="scenario/[id]/decision" />
    </Stack>
  );
}
