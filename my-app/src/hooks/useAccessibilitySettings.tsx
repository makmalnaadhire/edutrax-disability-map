"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { AccessibilitySettings } from "@/types";
import { ACCESSIBILITY_DEFAULTS } from "@/lib/constants";

interface AccessibilityContextValue extends AccessibilitySettings {
  setThemeMode: (mode: AccessibilitySettings["themeMode"]) => void;
  setTextScale: (scale: number) => void;
  toggleDyslexiaFont: () => void;
  toggleTextToSpeech: () => void;
  toggleReduceMotion: () => void;
  resetSettings: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextValue | undefined
>(undefined);

const STORAGE_KEY = "edutrax-accessibility";

function loadSettings(): AccessibilitySettings {
  if (typeof window === "undefined") return ACCESSIBILITY_DEFAULTS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return { ...ACCESSIBILITY_DEFAULTS, ...JSON.parse(stored) };
    }
  } catch {
    // ignore parse errors
  }
  return ACCESSIBILITY_DEFAULTS;
}

function saveSettings(settings: AccessibilitySettings) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore storage errors
  }
}

export function AccessibilityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [settings, setSettings] = useState<AccessibilitySettings>(
    ACCESSIBILITY_DEFAULTS
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSettings(loadSettings());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    saveSettings(settings);
  }, [settings, mounted]);

  // Apply theme mode to document
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove(
      "theme-light",
      "theme-dark",
      "theme-monochrome",
      "theme-high-contrast-yellow"
    );
    root.classList.add(`theme-${settings.themeMode}`);
  }, [settings.themeMode, mounted]);

  // Apply text scale
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.style.setProperty(
      "--text-scale",
      `${settings.textScale / 100}`
    );
  }, [settings.textScale, mounted]);

  // Apply dyslexia font
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle(
      "dyslexia-font",
      settings.dyslexiaFont
    );
  }, [settings.dyslexiaFont, mounted]);

  // Apply reduce motion
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle(
      "reduce-motion",
      settings.reduceMotion
    );
  }, [settings.reduceMotion, mounted]);

  const setThemeMode = useCallback(
    (mode: AccessibilitySettings["themeMode"]) => {
      setSettings((prev) => ({ ...prev, themeMode: mode }));
    },
    []
  );

  const setTextScale = useCallback((scale: number) => {
    setSettings((prev) => ({ ...prev, textScale: scale }));
  }, []);

  const toggleDyslexiaFont = useCallback(() => {
    setSettings((prev) => ({ ...prev, dyslexiaFont: !prev.dyslexiaFont }));
  }, []);

  const toggleTextToSpeech = useCallback(() => {
    setSettings((prev) => ({ ...prev, textToSpeech: !prev.textToSpeech }));
  }, []);

  const toggleReduceMotion = useCallback(() => {
    setSettings((prev) => ({ ...prev, reduceMotion: !prev.reduceMotion }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(ACCESSIBILITY_DEFAULTS);
  }, []);

  const value: AccessibilityContextValue = useMemo(
    () => ({
      themeMode: settings.themeMode,
      textScale: settings.textScale,
      dyslexiaFont: settings.dyslexiaFont,
      textToSpeech: settings.textToSpeech,
      reduceMotion: settings.reduceMotion,
      setThemeMode,
      setTextScale,
      toggleDyslexiaFont,
      toggleTextToSpeech,
      toggleReduceMotion,
      resetSettings,
    }),
    [
      settings.themeMode,
      settings.textScale,
      settings.dyslexiaFont,
      settings.textToSpeech,
      settings.reduceMotion,
      setThemeMode,
      setTextScale,
      toggleDyslexiaFont,
      toggleTextToSpeech,
      toggleReduceMotion,
      resetSettings,
    ]
  );

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
}
