export const THEME_MODES = {
  light: {
    label: "Light",
    description: "Standard light theme",
  },
  dark: {
    label: "Dark",
    description: "Dark theme for reduced eye strain",
  },
  monochrome: {
    label: "Monochrome",
    description: "Black and white for maximum contrast",
  },
  highContrastYellow: {
    label: "High Contrast Yellow",
    description: "Yellow on black for maximum visibility",
  },
} as const;

export type ThemeMode = keyof typeof THEME_MODES;

export const TEXT_SCALE_OPTIONS = [
  { value: 100, label: "100%" },
  { value: 125, label: "125%" },
  { value: 150, label: "150%" },
  { value: 175, label: "175%" },
  { value: 200, label: "200%" },
] as const;

export const ACCESSIBILITY_DEFAULTS = {
  themeMode: "light" as ThemeMode,
  textScale: 100,
  dyslexiaFont: false,
  textToSpeech: false,
  reduceMotion: false,
};

export const AUDIT_GRADES = {
  A: { label: "Fully Accessible", color: "emerald", minScore: 90 },
  B: { label: "Mostly Accessible", color: "green", minScore: 75 },
  C: { label: "Partially Accessible", color: "amber", minScore: 60 },
  D: { label: "Major Violations", color: "orange", minScore: 40 },
  F: { label: "Not Accessible", color: "red", minScore: 0 },
} as const;

export type AuditGrade = keyof typeof AUDIT_GRADES;
