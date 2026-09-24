import { useLocalSearchParams, useRouter } from "expo-router";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Spacing, Typography } from "../../constants/theme";

export default function CheckEmail() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Text style={{ fontSize: 32, color: Colors.primary }}>✓</Text>
        </View>
        <Text style={styles.title}>Check Your Email</Text>
        <Text style={styles.subtitle}>
          We've sent password reset instructions to{" "}
          <Text style={{ fontWeight: "700", color: Colors.text }}>{email}</Text>
        </Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.replace("/(auth)/sign-in-email")}
        >
          <Text style={styles.primaryButtonText}>Back to Sign in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.sm,
  },
  backButtonText: { color: Colors.text, fontSize: 20 },
  content: { flex: 1, alignItems: "center", justifyContent: "center" },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: "rgba(0, 211, 243, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  title: { ...Typography.heading1, color: Colors.text, textAlign: "center" },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: "rgba(0, 211, 243, 0.15)",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  primaryButtonText: { color: Colors.primary, fontWeight: "600", fontSize: 16 },
});
