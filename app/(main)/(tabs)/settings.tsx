import { useRouter } from "expo-router";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Colors, Spacing } from "../../../constants/theme";
import { useAuth } from "../../../context/AuthContext";

export default function Settings() {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.replace("/(auth)/sign-in-up");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.email}>{user?.email}</Text>
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.lg,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "700",
    marginBottom: Spacing.sm,
  },
  email: { color: Colors.textMuted, marginBottom: Spacing.lg },
  button: {
    backgroundColor: Colors.accent,
    borderRadius: 999,
    padding: Spacing.md,
    alignItems: "center",
  },
  buttonText: { color: Colors.text, fontWeight: "700" },
});
