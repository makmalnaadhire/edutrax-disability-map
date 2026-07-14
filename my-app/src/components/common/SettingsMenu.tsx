"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LANGUAGE_OPTIONS,
  useLanguage,
  type Language,
} from "@/context/LanguageContext";

export function SettingsMenu() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        close();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, close]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      setLanguage(lang);
      close();
    },
    [setLanguage, close]
  );

  return (
    <div className="relative" ref={menuRef}>
      {/* Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={toggle}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Settings"
        className={cn(
          "inline-flex items-center justify-center rounded-lg p-2",
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          "focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2",
          "transition-colors"
        )}
      >
        <Globe className="h-5 w-5" aria-hidden="true" />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          aria-label="Settings menu"
          className={cn(
            "absolute right-0 top-full z-50 mt-2 w-72",
            "rounded-xl border border-slate-200 bg-white shadow-lg",
            "py-1"
          )}
        >
          {/* Language Section */}
          <div className="px-4 py-3">
            <h3 className="text-sm font-semibold text-slate-950">
              Pengaturan Bahasa
            </h3>
            <p className="mt-0.5 text-xs text-slate-500">
              Choose your preferred language for the interface.
            </p>
          </div>

          <div className="px-3 pb-3" role="radiogroup" aria-label="Language selection">
            {LANGUAGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={language === option.value}
                onClick={() => handleLanguageChange(option.value)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5",
                  "text-sm font-medium transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-slate-900",
                  language === option.value
                    ? "bg-slate-900 text-white"
                    : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <span>{option.label}</span>
                {language === option.value && (
                  <span
                    className={cn(
                      "inline-flex h-5 w-5 items-center justify-center rounded-full",
                      language === option.value ? "bg-white/20" : ""
                    )}
                    aria-hidden="true"
                  >
                    <svg
                      className="h-3 w-3"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="2 6 5 9 10 3" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
