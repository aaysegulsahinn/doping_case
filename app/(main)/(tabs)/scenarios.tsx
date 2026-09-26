import { useRouter } from "expo-router";
import {
    FlatList,
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
} from "../../../constants/theme";
import { scenarios } from "../../../data/dummyData";
import { Scenario } from "../../../types";

export default function Scenarios() {
  const router = useRouter();

  const renderCard = ({ item }: { item: Scenario }) => (
    <ImageBackground
      source={{ uri: item.imageUrl }}
      style={styles.card}
      imageStyle={styles.cardImage}
    >
      <View style={styles.cardOverlay}>
        <Text style={styles.duration}>⏱ {item.durationLabel}</Text>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() =>
            router.push(`/(main)/scenario/${item.id}/briefing` as any)
          }
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Scenarios</Text>
        <Text style={styles.subtitle}>
          Choose a scenario and ask yourself, "If you were in that situation,
          what would you do?"
        </Text>
        <Text style={styles.count}>{scenarios.length} Scenarios</Text>
      </View>

      <FlatList
        data={scenarios}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const CARD_WIDTH = 260;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.displayLarge,
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    color: Colors.primary,
    fontSize: 13,
    marginBottom: Spacing.sm,
  },
  count: {
    color: Colors.textMuted,
    fontSize: 13,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  card: {
    width: CARD_WIDTH,
    height: 220,
    marginRight: Spacing.md,
    borderRadius: BorderRadius.lg,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  cardImage: {
    borderRadius: BorderRadius.lg,
  },
  cardOverlay: {
    backgroundColor: "rgba(2, 6, 23, 0.75)",
    padding: Spacing.md,
  },
  duration: {
    color: Colors.primary,
    fontSize: 12,
    marginBottom: Spacing.xs,
  },
  cardTitle: {
    color: Colors.text,
    fontWeight: "700",
    fontSize: 17,
    fontStyle: "italic",
    marginBottom: Spacing.xs,
  },
  cardDescription: {
    color: Colors.textMuted,
    fontSize: 13,
    marginBottom: Spacing.md,
  },
  startButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(0, 211, 243, 0.2)",
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 999,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  startButtonText: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
