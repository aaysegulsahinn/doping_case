import { useRouter } from "expo-router";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Spacing, Typography } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";

export default function SignInUp() {
  const router = useRouter();
  const { signIn } = useAuth();

  // Apple/Google girişi dummy - backend olmadığı için direkt
  // sahte bir kullanıcıyla giriş yapıp ana ekrana yönlendiriyoruz.
  const handleSocialSignIn = async (provider: "apple" | "google") => {
    await signIn(`${provider}user@example.com`, "dummy");
    router.replace("/(main)/(tabs)/scenarios");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/images/dna-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome to Fateful Moment</Text>
        <Text style={styles.subtitle}>Sign in to continue your journey</Text>

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push("/(auth)/sign-in-email")}
        >
          <Text style={styles.primaryButtonText}>✉️ Continue with Email</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => handleSocialSignIn("apple")}
        >
          <Text style={styles.secondaryButtonText}> Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => handleSocialSignIn("google")}
        >
          <Text style={styles.secondaryButtonText}>G Continue with Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        By continuing you agree to the Terms of Use and Privacy Policy.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 160,
    height: 160,
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.heading1,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  primaryButton: {
    backgroundColor: "rgba(0, 211, 243, 0.15)",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    width: "100%",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  primaryButtonText: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 16,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    color: Colors.textMuted,
    marginHorizontal: Spacing.sm,
    fontSize: 12,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 999,
    paddingVertical: Spacing.md,
    width: "100%",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  secondaryButtonText: {
    color: Colors.text,
    fontWeight: "600",
    fontSize: 16,
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: "center",
  },
});
