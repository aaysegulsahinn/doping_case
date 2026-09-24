import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in-up" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="sign-in-email" />
      <Stack.Screen name="reset-password" />
      <Stack.Screen name="check-email" />
    </Stack>
  );
}
