import {
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Svg, { Line, Polygon, Text as SvgText } from "react-native-svg";
import { BorderRadius, Colors, Spacing } from "../../../constants/theme";
import { useDnaSession } from "../../../context/DnaSessionContext";
import { PsychMatrix } from "../../../types";

const AXES: { key: keyof PsychMatrix; label: string }[] = [
  { key: "vision", label: "Vision" },
  { key: "courage", label: "Courage" },
  { key: "risk", label: "Risk" },
  { key: "control", label: "Control" },
  { key: "empathy", label: "Empathy" },
  { key: "ethics", label: "Ethics" },
];

const SIZE = 260;
const CENTER = SIZE / 2;
const RADIUS = 90;

function getPoint(index: number, value: number) {
  const angle = (Math.PI * 2 * index) / AXES.length - Math.PI / 2;
  const r = (value / 100) * RADIUS;
  return {
    x: CENTER + r * Math.cos(angle),
    y: CENTER + r * Math.sin(angle),
  };
}

function RadarChart({ matrix }: { matrix: PsychMatrix }) {
  const points = AXES.map((axis, i) => getPoint(i, matrix[axis.key]));
  const polygonPoints = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <Svg width={SIZE} height={SIZE}>
      {/* Arka plan grid çizgileri (merkezden köşelere) */}
      {AXES.map((axis, i) => {
        const outer = getPoint(i, 100);
        return (
          <Line
            key={axis.key}
            x1={CENTER}
            y1={CENTER}
            x2={outer.x}
            y2={outer.y}
            stroke={Colors.border}
            strokeWidth={1}
          />
        );
      })}

      {/* Veri poligonu */}
      <Polygon
        points={polygonPoints}
        fill="rgba(0, 211, 243, 0.35)"
        stroke={Colors.primary}
        strokeWidth={2}
      />

      {/* Eksen etiketleri */}
      {AXES.map((axis, i) => {
        const labelPoint = getPoint(i, 122);
        return (
          <SvgText
            key={axis.key}
            x={labelPoint.x}
            y={labelPoint.y}
            fill={Colors.textMuted}
            fontSize="11"
            textAnchor="middle"
          >
            {axis.label}
          </SvgText>
        );
      })}
    </Svg>
  );
}

export default function Dna() {
  const { effects } = useDnaSession();

  // Henüz hiç senaryo tamamlanmadıysa boş durum göster
  if (effects.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Complete a scenario to see your Decision DNA here.
        </Text>
      </SafeAreaView>
    );
  }

  const { getProfile } = useDnaSession();
  const profile = getProfile();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.pageTitle}>Karar DNAsı</Text>

        <View style={styles.personalityCard}>
          <Image
            source={{ uri: profile.personality.avatarUrl }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.personalityName}>
              {profile.personality.name}
            </Text>
            <Text style={styles.personalityQuote}>
              "{profile.personality.quote}"
            </Text>
          </View>
        </View>

        <View style={styles.matrixCard}>
          <Text style={styles.sectionLabel}>⟡ PSYCHOLOGICAL MATRIX</Text>
          <View style={styles.matrixContent}>
            <RadarChart matrix={profile.matrix} />
            <View style={styles.statsGrid}>
              {AXES.map((axis) => (
                <View key={axis.key} style={styles.statBox}>
                  <Text style={styles.statLabel}>
                    {axis.label.toUpperCase()}
                  </Text>
                  <Text style={styles.statValue}>
                    {profile.matrix[axis.key]}
                  </Text>
                  <View style={styles.statBarTrack}>
                    <View
                      style={[
                        styles.statBarFill,
                        { width: `${profile.matrix[axis.key]}%` },
                      ]}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.patternCard}>
          <Text style={styles.sectionLabel}>⟡ PATTERN DETECTION</Text>
          {profile.patterns.map((p, i) => (
            <View key={p.id} style={styles.patternRow}>
              <Text style={styles.patternNumber}>
                {String(i + 1).padStart(2, "0")}
              </Text>
              <Text style={styles.patternText}>{p.text}</Text>
            </View>
          ))}
        </View>

        <View style={styles.blindSpotCard}>
          <Text style={styles.blindSpotTitle}>⚠ {profile.blindSpot.title}</Text>
          <Text style={styles.blindSpotQuestion}>
            {profile.blindSpot.question}
          </Text>
          <Text style={styles.blindSpotDescription}>
            {profile.blindSpot.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
  },
  emptyText: {
    color: Colors.textMuted,
    textAlign: "center",
  },
  scrollContent: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  pageTitle: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "800",
    fontStyle: "italic",
    marginBottom: Spacing.sm,
  },
  personalityCard: {
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    gap: Spacing.md,
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  personalityName: {
    color: Colors.text,
    fontWeight: "800",
    fontStyle: "italic",
    fontSize: 16,
    marginBottom: 4,
  },
  personalityQuote: {
    color: Colors.textMuted,
    fontSize: 12,
    lineHeight: 16,
  },
  matrixCard: {
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  sectionLabel: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  matrixContent: {
    alignItems: "center",
    gap: Spacing.md,
  },
  statsGrid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  statBox: {
    width: "47%",
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: 10,
  },
  statValue: {
    color: Colors.text,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
  },
  statBarTrack: {
    height: 3,
    backgroundColor: Colors.border,
    borderRadius: 2,
  },
  statBarFill: {
    height: "100%",
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  patternCard: {
    backgroundColor: Colors.secondary,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
  },
  patternRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  patternNumber: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 13,
  },
  patternText: {
    flex: 1,
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  blindSpotCard: {
    backgroundColor: "rgba(251, 44, 54, 0.08)",
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.accent,
    padding: Spacing.md,
  },
  blindSpotTitle: {
    color: Colors.accent,
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
  },
  blindSpotQuestion: {
    color: Colors.text,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: Spacing.xs,
  },
  blindSpotDescription: {
    color: Colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
});
