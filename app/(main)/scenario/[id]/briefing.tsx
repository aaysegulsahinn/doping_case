import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    BorderRadius,
    Colors,
    Spacing,
    Typography,
} from "../../../../constants/theme";
import { scenarios } from "../../../../data/dummyData";

export default function Briefing() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const scenario = scenarios.find((s) => s.id === id);

  if (!scenario) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: Colors.text }}>Scenario not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{ uri: scenario.imageUrl }}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.overlay}>
          <Text style={styles.label}>SCENARIO BRIEFING</Text>
          <Text style={styles.title}>{scenario.title.toUpperCase()}</Text>
          <Text style={styles.description}>{scenario.description}</Text>

          <TouchableOpacity
            style={styles.startButton}
            onPress={() =>
              router.push(
                `/(main)/scenario/${scenario.id}/video?decisionIndex=0` as any,
              )
            }
          >
            <Text style={styles.startButtonText}>Start Simulation</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.md,
  },
  background: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    justifyContent: "center",
  },
  backgroundImage: {
    borderRadius: BorderRadius.lg,
  },
  overlay: {
    backgroundColor: "rgba(2, 6, 23, 0.7)",
    padding: Spacing.lg,
    alignItems: "center",
  },
  label: {
    color: Colors.primary,
    fontSize: 13,
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  title: {
    ...Typography.displayLarge,
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  description: {
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: Spacing.lg,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: "rgba(0, 211, 243, 0.2)",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 999,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  startButtonText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 16,
  },
});
