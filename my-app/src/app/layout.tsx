import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AccessibilityProvider } from "@/hooks/useAccessibilitySettings";
import { SkipToContent } from "@/components/common/SkipToContent";
import { AccessibilityToolbar } from "@/components/common/AccessibilityToolbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "EduTrax - Disability Accessibility Audit System",
    template: "%s | EduTrax",
  },
  description:
    "A comprehensive disability accessibility audit information system for educational institutions. Track compliance, identify violations, and ensure universal access.",
  keywords: [
    "accessibility",
    "audit",
    "disability",
    "WCAG",
    "compliance",
    "education",
    "inclusive",
  ],
  authors: [{ name: "EduTrax Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AccessibilityProvider>
          <SkipToContent />
          <main id="main-content" className="flex-1 flex flex-col">
            {children}
          </main>
          <AccessibilityToolbar />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
