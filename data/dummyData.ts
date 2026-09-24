import { DnaProfile, PersonalityType, Scenario } from "../types";

// ---- Kişilik Tipleri (DNA sonuç ekranı için) ----
export const personalityTypes: PersonalityType[] = [
  {
    id: "brave-visionary",
    name: "BRAVE VISIONARY",
    quote:
      "You see the big picture and walk towards it - no matter the cost. Ethics sometimes take a back seat, but few surpass you in the courage to take action.",
    avatarUrl:
      "https://api.dicebear.com/7.x/adventurer/png?seed=visionary&backgroundColor=1e293b",
  },
  {
    id: "cautious-strategist",
    name: "COLD-BLOODED STRATEGIST",
    quote:
      "You weigh every angle before acting. Calm under pressure, you rarely let emotion cloud your judgment.",
    avatarUrl:
      "https://api.dicebear.com/7.x/adventurer/png?seed=strategist&backgroundColor=1e293b",
  },
  {
    id: "empathetic-leader",
    name: "EMPATHETIC LEADER",
    quote:
      "People come first for you, even under crisis. Your compassion inspires loyalty, but can slow down hard decisions.",
    avatarUrl:
      "https://api.dicebear.com/7.x/adventurer/png?seed=leader&backgroundColor=1e293b",
  },
];

// ---- Senaryolar ----
export const scenarios: Scenario[] = [
  {
    id: "iraq-war",
    title: "Iraq War",
    durationLabel: "1:37 min",
    description:
      "2003. The Chemical Weapon Allegations Are On Your Desk. Your Decision Will Determine The Fate Of Millions.",
    imageUrl:
      "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=800",
    decisions: [
      {
        id: "decision-1",
        videoAsset: require("../assets/videos/video_intro.mp4"),
        options: [
          {
            id: "opt-1",
            label: "Wait for Signal from Moscow",
            outcome: "neutral",
            effect: { vision: 5, risk: -5 },
          },
          {
            id: "opt-2",
            label: "Signal US Ships with Sonar",
            outcome: "risky",
            effect: { courage: 10, risk: 15, ethics: -5 },
          },
          {
            id: "opt-3",
            label: "Deniz Karantinası: Küba'yı kuşatıp gizli pazarlık",
            outcome: "neutral",
            effect: { control: 10, empathy: 5 },
          },
        ],
      },
      {
        id: "decision-2",
        videoAsset: require("../assets/videos/video_decision_1.mp4"),
        options: [
          {
            id: "opt-4",
            label: "Zaman Baskısına Uyum: Belirlenen takvimde fırlat",
            outcome: "risky",
            effect: { risk: 20, courage: 10 },
          },
          {
            id: "opt-5",
            label: "Signal US Ships with Sonar",
            outcome: "neutral",
            effect: { vision: 10, control: 5 },
          },
        ],
      },
    ],
  },
  {
    id: "cuban-missile-crisis",
    title: "Cuban Missile Crisis (1962)",
    durationLabel: "1:25 min",
    description:
      "A World On The Brink Of Nuclear Annihilation. You Are In Kennedy's Seat.",
    imageUrl:
      "https://images.unsplash.com/photo-1508433957232-3107f5fd5995?w=800",
    decisions: [
      {
        id: "decision-1",
        videoAsset: require("../assets/videos/video_decision_2.mp4"),
        options: [
          {
            id: "opt-1",
            label: "Deniz Karantinası uygula",
            outcome: "neutral",
            effect: { control: 10, vision: 5 },
          },
          {
            id: "opt-2",
            label: "Anında hava saldırısı emri ver",
            outcome: "risky",
            effect: { courage: 15, risk: 20, empathy: -10 },
          },
        ],
      },
    ],
  },
];

// ---- Dummy DNA hesaplama fonksiyonu ----
// Gerçek bir backend olmadığı için, kullanıcının seçtiği kararların
// "effect" değerlerini toplayıp basit bir profil üretiyoruz.
export function calculateDnaProfile(
  selectedEffects: Partial<import("../types").PsychMatrix>[],
): DnaProfile {
  const base = {
    vision: 50,
    courage: 50,
    risk: 50,
    control: 50,
    empathy: 50,
    ethics: 50,
  };

  selectedEffects.forEach((effect) => {
    Object.entries(effect).forEach(([key, value]) => {
      const k = key as keyof typeof base;
      base[k] = Math.min(99, Math.max(1, base[k] + (value ?? 0)));
    });
  });

  // En yüksek "courage + risk" ise Brave Visionary, en yüksek "empathy" ise
  // Empathetic Leader, aksi halde Cold-Blooded Strategist (basit dummy mantık)
  let personality = personalityTypes[0];
  if (base.empathy > 65) {
    personality = personalityTypes[2];
  } else if (base.risk < 45 && base.control > 60) {
    personality = personalityTypes[1];
  }

  return {
    personality,
    matrix: base,
    patterns: [
      {
        id: "p1",
        text: "You are not afraid to take action under pressure. While others hesitate, you have already taken a step.",
      },
      {
        id: "p2",
        text: "You prioritize long-term impact over short-term costs, but this sometimes makes it difficult to see the people in front of you.",
      },
      {
        id: "p3",
        text: "When ethics conflict with interests, your tendency is clear: you choose the interest.",
      },
    ],
    blindSpot: {
      title: "BLIND SPOT – ETHICS",
      question: "How much will you pay to win?",
      description:
        "Your vision and courage are strong — but your ethics score is your lowest dimension. While reaching big goals, you often overlook how those around you feel and what they sacrifice.",
    },
  };
}
