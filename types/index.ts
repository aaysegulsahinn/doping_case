// ---- Auth ----
export interface User {
  id: string;
  fullName: string;
  email: string;
}

// ---- Scenario (Senaryo) ----
export interface Scenario {
  id: string;
  title: string;
  durationLabel: string; // "1:37 min" gibi
  description: string;
  imageUrl: string; // arka plan görseli (local asset veya url)
  decisions: Decision[];
}

// ---- Decision (Karar adımı) ----
export interface Decision {
  id: string;
  videoAsset: any; // require() ile local video dosyası
  options: DecisionOption[];
}

export interface DecisionOption {
  id: string;
  label: string;
  // Bu seçenek seçilince hangi "ruh hali" tetiklenir (arka plan/progress bar rengi için)
  outcome: "neutral" | "risky";
  // DNA skorlarına etkisi (basitleştirilmiş dummy mantık)
  effect: Partial<PsychMatrix>;
}

// ---- DNA / Kişilik Analizi ----
export interface PsychMatrix {
  vision: number;
  courage: number;
  risk: number;
  control: number;
  empathy: number;
  ethics: number;
}

export interface PersonalityType {
  id: string;
  name: string; // "BRAVE VISIONARY" gibi
  quote: string;
  avatarUrl: string;
}

export interface PatternDetectionItem {
  id: string;
  text: string;
}

export interface BlindSpot {
  title: string;
  question: string;
  description: string;
}

export interface DnaProfile {
  personality: PersonalityType;
  matrix: PsychMatrix;
  patterns: PatternDetectionItem[];
  blindSpot: BlindSpot;
}
