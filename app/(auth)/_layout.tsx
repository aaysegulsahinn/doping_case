import { Stack } from "expo-router";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";

export default function AuthLayout() {
  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  }, []);

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
