import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Colors, Spacing, Typography } from "../../constants/theme";

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSend = () => {
    router.push({ pathname: "/(auth)/check-email", params: { email } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Image
          source={require("../../assets/images/dna-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Reset your password</Text>
        <Text style={styles.subtitle}>
          Enter your email to receive a reset link
        </Text>

        <TextInput
          style={[
            styles.input,
            email.length > 0 && isEmailValid && styles.inputValid,
          ]}
          placeholder="Your email address"
          placeholderTextColor={Colors.textMuted}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TouchableOpacity
          style={[
            styles.primaryButton,
            !isEmailValid && styles.primaryButtonDisabled,
          ]}
          onPress={handleSend}
          disabled={!isEmailValid}
        >
          <Text style={styles.primaryButtonText}>Send Reset Link</Text>
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
  logo: { width: 90, height: 90, marginBottom: Spacing.md },
  title: { ...Typography.heading1, color: Colors.text, textAlign: "center" },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
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
    marginBottom: Spacing.md,
    fontSize: 15,
  },
  inputValid: { borderColor: Colors.primary },
  primaryButton: {
    width: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 999,
    paddingVertical: Spacing.md,
    alignItems: "center",
  },
  primaryButtonDisabled: { backgroundColor: "rgba(0, 211, 243, 0.25)" },
  primaryButtonText: {
    color: Colors.background,
    fontWeight: "700",
    fontSize: 16,
  },
});
