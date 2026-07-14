"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Language = "en" | "id";

interface LanguageOption {
  value: Language;
  label: string;
  nativeLabel: string;
}

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  { value: "en", label: "English", nativeLabel: "English" },
  { value: "id", label: "Bahasa Indonesia", nativeLabel: "Bahasa Indonesia" },
] as const;

const STORAGE_KEY = "edutrax-language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "id") return stored;
  } catch {
    // localStorage unavailable (SSR or private browsing)
  }
  return "en";
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Settings
    "settings.title": "Settings",
    "settings.language": "Language Settings",
    "settings.languageDescription": "Choose your preferred language for the interface.",
    // Sidebar
    "nav.dashboard": "Dashboard",
    "nav.allAudits": "All Audits",
    "nav.newAudit": "New Audit",
    "nav.myAudits": "My Audits",
    "nav.buildings": "Buildings",
    "nav.users": "Users",
    "nav.reports": "Reports",
    "nav.settings": "Settings",
    "nav.signOut": "Sign Out",
    // Auth
    "auth.signIn": "Sign In",
    "auth.signUp": "Sign up",
    "auth.welcomeBack": "Welcome back",
    "auth.signInSubtitle": "Sign in to manage your accessibility audits.",
    "auth.email": "Email Address",
    "auth.password": "Password",
    "auth.forgotPassword": "Forgot password?",
    "auth.rememberMe": "Remember me for 30 days",
    "auth.noAccount": "Don't have an account?",
    "auth.or": "or",
  },
  id: {
    // Settings
    "settings.title": "Pengaturan",
    "settings.language": "Pengaturan Bahasa",
    "settings.languageDescription": "Pilih bahasa yang Anda inginkan untuk antarmuka.",
    // Sidebar
    "nav.dashboard": "Dasbor",
    "nav.allAudits": "Semua Audit",
    "nav.newAudit": "Audit Baru",
    "nav.myAudits": "Audit Saya",
    "nav.buildings": "Gedung",
    "nav.users": "Pengguna",
    "nav.reports": "Laporan",
    "nav.settings": "Pengaturan",
    "nav.signOut": "Keluar",
    // Auth
    "auth.signIn": "Masuk",
    "auth.signUp": "Daftar",
    "auth.welcomeBack": "Selamat datang kembali",
    "auth.signInSubtitle": "Masuk untuk mengelola audit aksesibilitas Anda.",
    "auth.email": "Alamat Email",
    "auth.password": "Kata Sandi",
    "auth.forgotPassword": "Lupa kata sandi?",
    "auth.rememberMe": "Ingat saya selama 30 hari",
    "auth.noAccount": "Belum punya akun?",
    "auth.or": "atau",
  },
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // ignore
    }
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] ?? key;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
