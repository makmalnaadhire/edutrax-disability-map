"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ACCESSIBILITY_DEFAULTS, type ThemeMode } from "@/lib/constants";

export type { ThemeMode };

interface AccessibilityState {
  theme: ThemeMode;
  textSize: number;
  dyslexiaFont: boolean;
  reduceMotion: boolean;
  textToSpeech: boolean;
}

interface AccessibilityContextValue extends AccessibilityState {
  setTheme: (theme: ThemeMode) => void;
  increaseTextSize: () => void;
  decreaseTextSize: () => void;
  toggleDyslexiaFont: () => void;
  toggleReduceMotion: () => void;
  toggleTextToSpeech: () => void;
  resetToDefaults: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | undefined>(
  undefined
);

const STORAGE_KEY = "edutrax-accessibility";

const THEME_CLASS_MAP: Record<ThemeMode, string> = {
  light: "",
  dark: "dark",
  monochrome: "monochrome",
  highContrastYellow: "hc-yellow",
};

const TEXT_SIZE_STEP = 10;
const TEXT_SIZE_MIN = 100;
const TEXT_SIZE_MAX = 200;

function loadState(): AccessibilityState {
  if (typeof window === "undefined") {
    return {
      theme: ACCESSIBILITY_DEFAULTS.themeMode,
      textSize: ACCESSIBILITY_DEFAULTS.textScale,
      dyslexiaFont: ACCESSIBILITY_DEFAULTS.dyslexiaFont,
      reduceMotion: ACCESSIBILITY_DEFAULTS.reduceMotion,
      textToSpeech: ACCESSIBILITY_DEFAULTS.textToSpeech,
    };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        theme: parsed.themeMode ?? ACCESSIBILITY_DEFAULTS.themeMode,
        textSize: parsed.textScale ?? ACCESSIBILITY_DEFAULTS.textScale,
        dyslexiaFont: parsed.dyslexiaFont ?? ACCESSIBILITY_DEFAULTS.dyslexiaFont,
        reduceMotion: parsed.reduceMotion ?? ACCESSIBILITY_DEFAULTS.reduceMotion,
        textToSpeech: parsed.textToSpeech ?? ACCESSIBILITY_DEFAULTS.textToSpeech,
      };
    }
  } catch {
    // ignore
  }
  return {
    theme: ACCESSIBILITY_DEFAULTS.themeMode,
    textSize: ACCESSIBILITY_DEFAULTS.textScale,
    dyslexiaFont: ACCESSIBILITY_DEFAULTS.dyslexiaFont,
    reduceMotion: ACCESSIBILITY_DEFAULTS.reduceMotion,
    textToSpeech: ACCESSIBILITY_DEFAULTS.textToSpeech,
  };
}

function persistState(state: AccessibilityState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        themeMode: state.theme,
        textScale: state.textSize,
        dyslexiaFont: state.dyslexiaFont,
        reduceMotion: state.reduceMotion,
        textToSpeech: state.textToSpeech,
      })
    );
  } catch {
    // ignore
  }
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(loadState);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage after mount
  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    if (!mounted) return;
    persistState(state);
  }, [state, mounted]);

  // ── DOM Side-Effect: Theme classes ──────────
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove("dark", "monochrome", "hc-yellow");
    const cls = THEME_CLASS_MAP[state.theme];
    if (cls) root.classList.add(cls);
  }, [state.theme, mounted]);

  // ── DOM Side-Effect: Text size ──────────────
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.fontSize = `${state.textSize}%`;
  }, [state.textSize, mounted]);

  // ── DOM Side-Effect: Dyslexia font ──────────
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle(
      "font-dyslexic",
      state.dyslexiaFont
    );
  }, [state.dyslexiaFont, mounted]);

  // ── DOM Side-Effect: Reduce motion ──────────
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle(
      "reduce-motion",
      state.reduceMotion
    );
  }, [state.reduceMotion, mounted]);

  // ── Actions ─────────────────────────────────
  const setTheme = useCallback((theme: ThemeMode) => {
    setState((prev) => ({ ...prev, theme }));
  }, []);

  const increaseTextSize = useCallback(() => {
    setState((prev) => ({
      ...prev,
      textSize: Math.min(TEXT_SIZE_MAX, prev.textSize + TEXT_SIZE_STEP),
    }));
  }, []);

  const decreaseTextSize = useCallback(() => {
    setState((prev) => ({
      ...prev,
      textSize: Math.max(TEXT_SIZE_MIN, prev.textSize - TEXT_SIZE_STEP),
    }));
  }, []);

  const toggleDyslexiaFont = useCallback(() => {
    setState((prev) => ({ ...prev, dyslexiaFont: !prev.dyslexiaFont }));
  }, []);

  const toggleReduceMotion = useCallback(() => {
    setState((prev) => ({ ...prev, reduceMotion: !prev.reduceMotion }));
  }, []);

  const toggleTextToSpeech = useCallback(() => {
    setState((prev) => ({ ...prev, textToSpeech: !prev.textToSpeech }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setState({
      theme: ACCESSIBILITY_DEFAULTS.themeMode,
      textSize: ACCESSIBILITY_DEFAULTS.textScale,
      dyslexiaFont: ACCESSIBILITY_DEFAULTS.dyslexiaFont,
      reduceMotion: ACCESSIBILITY_DEFAULTS.reduceMotion,
      textToSpeech: ACCESSIBILITY_DEFAULTS.textToSpeech,
    });
  }, []);

  const value = useMemo<AccessibilityContextValue>(
    () => ({
      theme: state.theme,
      textSize: state.textSize,
      dyslexiaFont: state.dyslexiaFont,
      reduceMotion: state.reduceMotion,
      textToSpeech: state.textToSpeech,
      setTheme,
      increaseTextSize,
      decreaseTextSize,
      toggleDyslexiaFont,
      toggleReduceMotion,
      toggleTextToSpeech,
      resetToDefaults,
    }),
    [
      state.theme,
      state.textSize,
      state.dyslexiaFont,
      state.reduceMotion,
      state.textToSpeech,
      setTheme,
      increaseTextSize,
      decreaseTextSize,
      toggleDyslexiaFont,
      toggleReduceMotion,
      toggleTextToSpeech,
      resetToDefaults,
    ]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility(): AccessibilityContextValue {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return ctx;
}
