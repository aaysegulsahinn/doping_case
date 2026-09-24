import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";

export default function Index() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href="/(main)/(tabs)/scenarios" />;
  }

  return <Redirect href="/(auth)/sign-in-up" />;
}
