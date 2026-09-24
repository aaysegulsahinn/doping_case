import { createContext, ReactNode, useContext, useState } from "react";
import { calculateDnaProfile } from "../data/dummyData";
import { DnaProfile, PsychMatrix } from "../types";

interface DnaSessionContextType {
  effects: Partial<PsychMatrix>[];
  lastOutcome: "neutral" | "risky" | null;
  addEffect: (
    effect: Partial<PsychMatrix>,
    outcome: "neutral" | "risky",
  ) => void;
  reset: () => void;
  getProfile: () => DnaProfile;
}

const DnaSessionContext = createContext<DnaSessionContextType | undefined>(
  undefined,
);

export function DnaSessionProvider({ children }: { children: ReactNode }) {
  const [effects, setEffects] = useState<Partial<PsychMatrix>[]>([]);
  const [lastOutcome, setLastOutcome] = useState<"neutral" | "risky" | null>(
    null,
  );

  const addEffect = (
    effect: Partial<PsychMatrix>,
    outcome: "neutral" | "risky",
  ) => {
    setEffects((prev) => [...prev, effect]);
    setLastOutcome(outcome);
  };

  const reset = () => {
    setEffects([]);
    setLastOutcome(null);
  };

  const getProfile = () => calculateDnaProfile(effects);

  return (
    <DnaSessionContext.Provider
      value={{ effects, lastOutcome, addEffect, reset, getProfile }}
    >
      {children}
    </DnaSessionContext.Provider>
  );
}

export function useDnaSession() {
  const context = useContext(DnaSessionContext);
  if (!context) {
    throw new Error("useDnaSession must be used within a DnaSessionProvider");
  }
  return context;
}
