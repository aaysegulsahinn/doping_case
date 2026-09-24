import { useEvent } from "expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useVideoPlayer, VideoView } from "expo-video";
import { useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { Colors } from "../../../../constants/theme";
import { scenarios } from "../../../../data/dummyData";

export default function VideoScreen() {
  const router = useRouter();
  const { id, decisionIndex } = useLocalSearchParams<{
    id: string;
    decisionIndex: string;
  }>();

  const scenario = scenarios.find((s) => s.id === id);
  const index = Number(decisionIndex ?? 0);
  const decision = scenario?.decisions[index];

  const player = useVideoPlayer(decision?.videoAsset, (p) => {
    p.play();
  });

  const { status } = useEvent(player, "statusChange", {
    status: player.status,
  });

  const goToDecision = () => {
    router.replace(
      `/(main)/scenario/${id}/decision?decisionIndex=${index}` as any,
    );
  };

  // Video bittiğinde otomatik geç; ayrıca 6 saniyelik güvenlik zaman aşımı
  useEffect(() => {
    if (status === "idle" && player.currentTime > 0) {
      goToDecision();
    }
  }, [status]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      goToDecision();
    }, 6000);
    return () => clearTimeout(timeout);
  }, []);

  if (!scenario || !decision) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ color: Colors.text }}>Video not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <VideoView
        player={player}
        style={styles.video}
        contentFit="cover"
        nativeControls={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
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
  video: {
    flex: 1,
    width: "100%",
  },
});
