import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Spacing, Typography } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";

export default function SignInEmail() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = isEmailValid && password.length > 0;

  const handleSignIn = async () => {
    setError("");

    // Dummy kontrol: case gereksinimi backend istemediği için basit bir
    // kural koyuyoruz - şifre en az 6 karakterse "doğru" kabul ediyoruz.
    if (password.length < 6) {
      setError("Your password is wrong. Please try again.");
      return;
    }

    setLoading(true);
    await signIn(email, password);
    setLoading(false);
    router.replace("/(main)/(tabs)/scenarios");
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.content}>
          <Image
            source={require("../../assets/images/dna-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to Fateful Moment</Text>
          <Text style={styles.subtitle}>Sign in with Email</Text>

          <TextInput
            style={[
              styles.input,
              email.length > 0 && isEmailValid && styles.inputValid,
              email.length > 0 && !isEmailValid && styles.inputError,
            ]}
            placeholder="Your email address"
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              setError("");
            }}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {email.length > 0 && !isEmailValid && (
            <Text style={styles.errorText}>
              Please enter a valid email address.
            </Text>
          )}

          <View style={styles.passwordRow}>
            <TextInput
              style={[
                styles.input,
                password.length > 0 && styles.inputValid,
                error ? styles.inputError : null,
              ]}
              placeholder="Your password"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setError("");
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((s) => !s)}
            >
              <Text>{showPassword ? "🙈" : "👁️"}</Text>
            </TouchableOpacity>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[
              styles.primaryButton,
              !canSubmit && styles.primaryButtonDisabled,
            ]}
            onPress={handleSignIn}
            disabled={!canSubmit || loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Signing in..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/(auth)/reset-password")}
          >
            <Text style={styles.linkText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/(auth)/create-account")}
        >
          <Text style={styles.footerText}>
            No account yet? <Text style={styles.linkTextInline}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
  backButtonText: {
    color: Colors.text,
    fontSize: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.heading1,
    color: Colors.text,
    textAlign: "center",
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    marginBottom: Spacing.lg,
  },
  input: {
    width: "100%",
    backgroundColor: Colors.secondary,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    color: Colors.text,
    marginBottom: Spacing.xs,
    fontSize: 15,
  },
  inputValid: {
    borderColor: Colors.primary,
  },
  inputError: {
    borderColor: Colors.accent,
  },
  errorText: {
    color: Colors.accent,
    fontSize: 12,
    alignSelf: "flex-start",
    marginBottom: Spacing.sm,
  },
  passwordRow: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
  },
  eyeButton: {
    position: "absolute",
    right: Spacing.md,
    top: 14,
  },
  primaryButton: {
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: Spacing.md,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  primaryButtonDisabled: {
    backgroundColor: "rgba(0, 211, 243, 0.25)",
  },
  primaryButtonText: {
    color: Colors.background,
    fontWeight: "700",
    fontSize: 16,
  },
  linkText: {
    color: Colors.primary,
    marginTop: Spacing.md,
  },
  linkTextInline: {
    color: Colors.primary,
    fontWeight: "600",
  },
  footerText: {
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
});
