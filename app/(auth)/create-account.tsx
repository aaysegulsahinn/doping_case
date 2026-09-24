import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Spacing, Typography } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";

export default function CreateAccount() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [nameError, setNameError] = useState("");
  const [loading, setLoading] = useState(false);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasDigit = /\d/.test(password);
  const isPasswordValid =
    hasMinLength && hasUppercase && hasLowercase && hasDigit;

  const isNameValid = fullName.trim().length >= 3;
  const canSubmit = isNameValid && isEmailValid && isPasswordValid;

  const handleSignUp = async () => {
    if (!isNameValid) {
      setNameError("Enter at least 3 characters.");
      return;
    }
    setLoading(true);
    await signUp(fullName, email, password);
    setLoading(false);
    router.replace("/(main)/(tabs)/scenarios");
  };

  const RuleRow = ({ met, label }: { met: boolean; label: string }) => (
    <View style={styles.ruleRow}>
      <Text style={{ color: met ? Colors.primary : Colors.textMuted }}>
        {met ? "✓" : "○"}
      </Text>
      <Text style={[styles.ruleText, met && { color: Colors.primary }]}>
        {label}
      </Text>
    </View>
  );

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

        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Image
            source={require("../../assets/images/dna-logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Create your Fateful Moment Account</Text>

          <TextInput
            style={[
              styles.input,
              fullName.length > 0 && isNameValid && styles.inputValid,
              nameError ? styles.inputError : null,
            ]}
            placeholder="Full Name"
            placeholderTextColor={Colors.textMuted}
            value={fullName}
            onChangeText={(t) => {
              setFullName(t);
              setNameError("");
            }}
          />
          {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

          <TextInput
            style={[
              styles.input,
              email.length > 0 && isEmailValid && styles.inputValid,
              email.length > 0 && !isEmailValid && styles.inputError,
            ]}
            placeholder="Your email address"
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={setEmail}
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
                password.length > 0 && isPasswordValid && styles.inputValid,
              ]}
              placeholder="Your password"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword((s) => !s)}
            >
              <Text>{showPassword ? "🙈" : "👁️"}</Text>
            </TouchableOpacity>
          </View>

          {password.length > 0 && (
            <View style={styles.rulesBox}>
              <RuleRow
                met={hasMinLength}
                label="Must be at least 8 characters long"
              />
              <RuleRow
                met={hasUppercase}
                label="Must contain at least 1 uppercase letter"
              />
              <RuleRow
                met={hasLowercase}
                label="Must contain at least 1 lowercase letter"
              />
              <RuleRow met={hasDigit} label="Must contain at least 1 digit" />
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.primaryButton,
              !canSubmit && styles.primaryButtonDisabled,
            ]}
            onPress={handleSignUp}
            disabled={!canSubmit || loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Creating account..." : "Sign up"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace("/(auth)/sign-in-email")}
          >
            <Text style={styles.footerText}>
              Already have an account?{" "}
              <Text style={styles.linkTextInline}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
    alignItems: "center",
    paddingVertical: Spacing.lg,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.heading1,
    color: Colors.text,
    textAlign: "center",
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
    marginBottom: Spacing.sm,
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
    justifyContent: "center",
  },
  eyeButton: {
    position: "absolute",
    right: Spacing.md,
    top: 14,
  },
  rulesBox: {
    width: "100%",
    marginBottom: Spacing.sm,
  },
  ruleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  ruleText: {
    color: Colors.textMuted,
    fontSize: 12,
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
  footerText: {
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.lg,
  },
  linkTextInline: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
