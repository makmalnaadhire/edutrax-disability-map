export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export type UserRole = "super_admin" | "institutional_auditor" | "public_viewer";

export interface AccessibilitySettings {
  themeMode: "light" | "dark" | "monochrome" | "highContrastYellow";
  textScale: number;
  dyslexiaFont: boolean;
  textToSpeech: boolean;
  reduceMotion: boolean;
}

export interface AuditChecklistItem {
  id: string;
  category: AuditCategory;
  subcategory: string;
  question: string;
  description: string;
  weight: number;
  status: "pass" | "fail" | "na" | "pending";
  evidence: AuditEvidence[];
  notes: string;
}

export type AuditCategory =
  | "physical_infrastructure"
  | "digital_infrastructure"
  | "communication"
  | "policy_procedures";

export interface AuditEvidence {
  id: string;
  type: "photo" | "document" | "video";
  url: string;
  filename: string;
  uploadedAt: string;
}

export interface Audit {
  id: string;
  buildingId: string;
  buildingName: string;
  auditorId: string;
  auditorName: string;
  status: "draft" | "in_progress" | "completed" | "review";
  score: number;
  grade: "A" | "B" | "C" | "D" | "F";
  checklistItems: AuditChecklistItem[];
  createdAt: string;
  completedAt: string | null;
}

export interface Building {
  id: string;
  name: string;
  address: string;
  type: string;
  totalFloors: number;
  lastAuditDate: string | null;
  accessibilityScore: number | null;
}
