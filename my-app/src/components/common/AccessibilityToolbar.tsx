"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Accessibility,
  Sun,
  Moon,
  Contrast,
  Eye,
  Type,
  Volume2,
  VolumeX,
  RotateCcw,
  X,
  Minus,
  Plus,
  Languages,
} from "lucide-react";
import { useAccessibility } from "@/hooks/useAccessibilitySettings";
import { THEME_MODES, type ThemeMode } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function AccessibilityToolbar() {
  const {
    themeMode,
    textScale,
    dyslexiaFont,
    textToSpeech,
    reduceMotion,
    setThemeMode,
    setTextScale,
    toggleDyslexiaFont,
    toggleTextToSpeech,
    toggleReduceMotion,
    resetSettings,
  } = useAccessibility();

  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    setActivePanel(null);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setActivePanel(null);
    triggerRef.current?.focus();
  }, []);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const panel = panelRef.current;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    panel.addEventListener("keydown", handleKeyDown);
    first.focus();
    return () => panel.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  const themeIcons: Record<ThemeMode, React.ReactNode> = {
    light: <Sun className="h-4 w-4" aria-hidden="true" />,
    dark: <Moon className="h-4 w-4" aria-hidden="true" />,
    monochrome: <Contrast className="h-4 w-4" aria-hidden="true" />,
    highContrastYellow: <Eye className="h-4 w-4" aria-hidden="true" />,
  };

  const themeColors: Record<ThemeMode, string> = {
    light: "bg-white text-gray-900 border-gray-200",
    dark: "bg-gray-900 text-white border-gray-700",
    monochrome: "bg-black text-white border-white",
    highContrastYellow: "bg-black text-yellow-400 border-yellow-400",
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        ref={triggerRef}
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
        aria-label="Accessibility settings"
        className={cn(
          "fixed bottom-6 right-6 z-50",
          "flex h-14 w-14 items-center justify-center rounded-full",
          "bg-blue-600 text-white shadow-lg",
          "transition-all duration-200",
          "hover:bg-blue-700 hover:shadow-xl",
          "focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2",
          isOpen && "bg-blue-700"
        )}
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Accessibility className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          id="accessibility-panel"
          role="dialog"
          aria-label="Accessibility settings panel"
          aria-modal="true"
          className={cn(
            "fixed bottom-24 right-6 z-50 w-80",
            "rounded-xl border bg-white shadow-2xl",
            "border-gray-200",
            "overflow-hidden"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
            <h2 className="text-sm font-semibold text-gray-900">
              Accessibility Settings
            </h2>
            <button
              onClick={handleClose}
              aria-label="Close accessibility settings"
              className="rounded-md p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Theme selector */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Theme
            </p>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(THEME_MODES) as ThemeMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setThemeMode(mode)}
                  aria-pressed={themeMode === mode}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium",
                    "border transition-all",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500",
                    themeMode === mode
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                  )}
                >
                  {themeIcons[mode]}
                  <span>{THEME_MODES[mode].label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Text scale */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              Text Size
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setTextScale(Math.max(100, textScale - 25))}
                disabled={textScale <= 100}
                aria-label="Decrease text size"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md border",
                  "border-gray-200 text-gray-700",
                  "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              >
                <Minus className="h-4 w-4" aria-hidden="true" />
              </button>
              <div className="flex-1 text-center">
                <span className="text-sm font-semibold text-gray-900">
                  {textScale}%
                </span>
              </div>
              <button
                onClick={() => setTextScale(Math.min(200, textScale + 25))}
                disabled={textScale >= 200}
                aria-label="Increase text size"
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md border",
                  "border-gray-200 text-gray-700",
                  "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
                  "disabled:cursor-not-allowed disabled:opacity-50"
                )}
              >
                <Plus className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Toggle options */}
          <div className="px-4 py-3 space-y-2">
            <ToggleOption
              icon={<Languages className="h-4 w-4" aria-hidden="true" />}
              label="Dyslexia-friendly font"
              checked={dyslexiaFont}
              onChange={toggleDyslexiaFont}
            />
            <ToggleOption
              icon={<Type className="h-4 w-4" aria-hidden="true" />}
              label="Reduce motion"
              checked={reduceMotion}
              onChange={toggleReduceMotion}
            />
            <ToggleOption
              icon={
                textToSpeech ? (
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <VolumeX className="h-4 w-4" aria-hidden="true" />
                )
              }
              label="Text-to-Speech"
              checked={textToSpeech}
              onChange={toggleTextToSpeech}
            />
          </div>

          {/* Reset */}
          <div className="border-t border-gray-100 px-4 py-3">
            <button
              onClick={resetSettings}
              className={cn(
                "flex w-full items-center justify-center gap-2 rounded-lg",
                "border border-gray-200 px-3 py-2",
                "text-xs font-medium text-gray-700",
                "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              )}
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Reset to Defaults
            </button>
          </div>
        </div>
      )}

      {/* Live region for screen readers */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {isOpen
          ? "Accessibility settings panel opened"
          : "Accessibility settings panel closed"}
      </div>
    </>
  );
}

function ToggleOption({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2",
        "cursor-pointer transition-colors",
        "hover:bg-gray-50"
      )}
    >
      <span className="text-gray-500">{icon}</span>
      <span className="flex-1 text-sm text-gray-700">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full",
          "border-2 border-transparent transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          checked ? "bg-blue-600" : "bg-gray-200"
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full",
            "bg-white shadow ring-0 transition-transform",
            checked ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    </label>
  );
}
