import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
    ImageBackground,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BorderRadius, Colors, Spacing } from "../../../../constants/theme";
import { useDnaSession } from "../../../../context/DnaSessionContext";
import { scenarios } from "../../../../data/dummyData";

export default function Decision() {
  const router = useRouter();
  const { id, decisionIndex } = useLocalSearchParams<{
    id: string;
    decisionIndex: string;
  }>();
  const { addEffect } = useDnaSession();

  const scenario = scenarios.find((s) => s.id === id);
  const index = Number(decisionIndex ?? 0);
  const decision = scenario?.decisions[index];
  const totalDecisions = scenario?.decisions.length ?? 1;

  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!scenario || !decision) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: Colors.text }}>Decision not found</Text>
      </SafeAreaView>
    );
  }

  const selectedOption = decision.options.find((o) => o.id === selectedId);
  const isRisky = selectedOption?.outcome === "risky";

  const handleSelect = (optionId: string) => {
    if (selectedId) return; // zaten seçim yapıldıysa değiştirilemesin
    setSelectedId(optionId);

    const option = decision.options.find((o) => o.id === optionId)!;
    addEffect(option.effect, option.outcome);

    // Seçimden 1.5 sn sonra bir sonraki adıma geç
    setTimeout(() => {
      const nextIndex = index + 1;
      if (nextIndex < totalDecisions) {
        router.replace(
          `/(main)/scenario/${id}/video?decisionIndex=${nextIndex}` as any,
        );
      } else {
        // Senaryo bitti, DNA sonuç ekranına yönlendir
        router.replace("/(main)/(tabs)/dna" as any);
      }
    }, 1500);
  };

  return (
    <ImageBackground
      source={{ uri: scenario.imageUrl }}
      style={styles.background}
      blurRadius={8}
    >
      <SafeAreaView style={styles.overlay}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.optionsContainer}>
          {decision.options.map((option) => {
            const isSelected = option.id === selectedId;
            const isDimmed = selectedId !== null && !isSelected;

            return (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.optionCard,
                  isSelected && !isRisky && styles.optionSelectedNeutral,
                  isSelected && isRisky && styles.optionSelectedRisky,
                  isDimmed && styles.optionDimmed,
                ]}
                onPress={() => handleSelect(option.id)}
                disabled={selectedId !== null}
              >
                {isSelected && (
                  <View style={styles.choiceBadge}>
                    <Text style={styles.choiceBadgeText}>Your Choice</Text>
                  </View>
                )}
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${((index + (selectedId ? 1 : 0)) / totalDecisions) * 100}%`,
                backgroundColor: isRisky ? Colors.accent : Colors.primary,
              },
            ]}
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(2, 6, 23, 0.5)",
    justifyContent: "space-between",
    padding: Spacing.lg,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 20,
  },
  optionsContainer: {
    gap: Spacing.md,
  },
  optionCard: {
    backgroundColor: "rgba(15, 23, 42, 0.85)",
    borderWidth: 1.5,
    borderColor: "#fff",
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
  },
  optionSelectedNeutral: {
    borderColor: Colors.primary,
    backgroundColor: "rgba(0, 211, 243, 0.25)",
  },
  optionSelectedRisky: {
    borderColor: Colors.accent,
    backgroundColor: "rgba(251, 44, 54, 0.25)",
  },
  optionDimmed: {
    opacity: 0.35,
  },
  optionText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  choiceBadge: {
    position: "absolute",
    top: -14,
    right: Spacing.md,
    backgroundColor: "#FACC15",
    borderRadius: 999,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  choiceBadgeText: {
    color: "#000",
    fontSize: 11,
    fontWeight: "700",
  },
  progressBarTrack: {
    height: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 2,
  },
});
