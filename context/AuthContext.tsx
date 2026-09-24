import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (fullName: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Dummy sign-in: backend yok, herhangi bir email/şifre ile
  // "başarılı" giriş simüle ediyoruz. Küçük bir gecikme (network
  // isteği hissi vermek için) ekliyoruz.
  const signIn = async (email: string, _password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setUser({
      id: "dummy-user-1",
      fullName: email.split("@")[0] || "User",
      email,
    });
  };

  const signUp = async (fullName: string, email: string, _password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    setUser({
      id: "dummy-user-1",
      fullName,
      email,
    });
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isSignedIn: !!user, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
