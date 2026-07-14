"use client";

import Link from "next/link";
import {
  ArrowRight,
  ClipboardCheck,
  BarChart3,
  FileText,
  Building2,
  Users,
  ShieldCheck,
  Eye,
  CheckCircle2,
  Accessibility,
  TrendingUp,
  AlertTriangle,
  Clock,
  UserCheck,
} from "lucide-react";

/* ────────────────────────────────────────────
   Data
   ──────────────────────────────────────────── */
const campusMetrics = [
  {
    label: "Physical Accessibility",
    score: 78,
    detail: "Ramps, signage, elevators, restrooms",
    icon: Building2,
  },
  {
    label: "Digital Accessibility",
    score: 91,
    detail: "Screen reader, contrast, keyboard nav",
    icon: Eye,
  },
  {
    label: "Overall Compliance",
    score: 84,
    detail: "Combined campus-wide rating",
    icon: ShieldCheck,
  },
];

const features = [
  {
    icon: ClipboardCheck,
    title: "Smart Checklists",
    description:
      "Step-by-step audit forms built on WCAG 2.1 standards for physical and digital infrastructure.",
  },
  {
    icon: BarChart3,
    title: "Accessible Analytics",
    description:
      "Dashboards with colorblind-safe charts, pattern fills, and clear text fallbacks for every data point.",
  },
  {
    icon: FileText,
    title: "One-Click Reporting",
    description:
      "Generate PDF and Excel compliance reports with grade ratings and violation summaries.",
  },
];

const stats = [
  { value: "2,450+", label: "Buildings Audited" },
  { value: "84%", label: "Compliance Rate" },
  { value: "142", label: "Violations Tracked" },
  { value: "156", label: "Active Auditors" },
];

const recentAudits = [
  {
    building: "Science Hall B",
    auditor: "Maria Chen",
    score: 92,
    grade: "A",
    status: "Completed",
    date: "Jul 10",
  },
  {
    building: "Library Annex",
    auditor: "James Park",
    score: 74,
    grade: "C",
    status: "In Review",
    date: "Jul 9",
  },
  {
    building: "Student Union",
    auditor: "Aisha Johnson",
    score: 88,
    grade: "B",
    status: "Completed",
    date: "Jul 8",
  },
  {
    building: "Engineering Wing",
    actor: "David Kim",
    score: 95,
    grade: "A",
    status: "Completed",
    date: "Jul 7",
  },
];

const violations = [
  { type: "Missing ramp access", severity: "Critical", count: 3 },
  { type: "Low color contrast", severity: "High", count: 8 },
  { type: "Missing alt text", severity: "Medium", count: 12 },
  { type: "No keyboard navigation", severity: "High", count: 5 },
];

/* ────────────────────────────────────────────
   Score bar helper
   ──────────────────────────────────────────── */
function ScoreBar({ score }: { score: number }) {
  const tone =
    score >= 90
      ? "bg-emerald-600"
      : score >= 75
        ? "bg-blue-600"
        : score >= 60
          ? "bg-amber-600"
          : "bg-red-600";

  const label =
    score >= 90
      ? "Excellent"
      : score >= 75
        ? "Good"
        : score >= 60
          ? "Needs Work"
          : "Critical";

  return (
    <div className="w-full">
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
          {score}%
        </span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"
        role="progressbar"
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${score}% — ${label}`}
      >
        <div
          className={`h-full rounded-full ${tone} transition-all duration-700 ease-out`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Grade badge
   ──────────────────────────────────────────── */
function GradeBadge({ grade }: { grade: string }) {
  const tone =
    grade === "A"
      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      : grade === "B"
        ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
        : "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";

  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold ${tone}`}
    >
      {grade}
    </span>
  );
}

/* ────────────────────────────────────────────
   Severity badge
   ──────────────────────────────────────────── */
function SeverityBadge({ severity }: { severity: string }) {
  const tone =
    severity === "Critical"
      ? "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      : severity === "High"
        ? "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
        : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";

  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${tone}`}
    >
      {severity}
    </span>
  );
}

/* ────────────────────────────────────────────
   Mock Dashboard Card (for hero right column)
   ──────────────────────────────────────────── */
function MockDashboard() {
  return (
    <div
      className="w-full rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 dark:border-slate-700 dark:bg-slate-900 dark:shadow-slate-900/50"
      aria-hidden="true"
    >
      {/* Dashboard header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">
          EduTrax Dashboard
        </span>
      </div>

      {/* Score row */}
      <div className="grid grid-cols-3 gap-px bg-slate-100 dark:bg-slate-800">
        <div className="bg-white px-4 py-4 text-center dark:bg-slate-900">
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            84%
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            Overall
          </p>
        </div>
        <div className="bg-white px-4 py-4 text-center dark:bg-slate-900">
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            78%
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            Physical
          </p>
        </div>
        <div className="bg-white px-4 py-4 text-center dark:bg-slate-900">
          <p className="text-2xl font-bold text-violet-600 dark:text-violet-400">
            91%
          </p>
          <p className="mt-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            Digital
          </p>
        </div>
      </div>

      {/* Mini audit table */}
      <div className="p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Recent Audits
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            This Week
          </span>
        </div>
        <div className="space-y-2">
          {recentAudits.map((a) => (
            <div
              key={a.building}
              className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800/60"
            >
              <div className="flex items-center gap-2.5">
                <GradeBadge grade={a.grade} />
                <div>
                  <p className="text-xs font-medium text-slate-900 dark:text-white">
                    {a.building}
                  </p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    {a.auditor} · {a.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                  {a.score}%
                </p>
                <p
                  className={`text-[10px] font-medium ${
                    a.status === "Completed"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {a.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Violations bar */}
      <div className="border-t border-slate-100 px-4 py-3 dark:border-slate-800">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
            Open Violations
          </span>
          <span className="text-xs font-bold text-red-600 dark:text-red-400">
            28
          </span>
        </div>
        <div className="mt-2 flex h-1.5 gap-0.5 overflow-hidden rounded-full">
          <div className="w-[10%] rounded-full bg-red-500" />
          <div className="w-[28%] rounded-full bg-orange-500" />
          <div className="w-[43%] rounded-full bg-amber-500" />
          <div className="w-[19%] rounded-full bg-slate-200 dark:bg-slate-700" />
        </div>
        <div className="mt-1.5 flex gap-3 text-[9px] text-slate-400 dark:text-slate-500">
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Critical
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-500" /> High
          </span>
          <span className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Medium
          </span>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────
   Page
   ──────────────────────────────────────────── */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      {/* ── Navigation ─────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
        <nav
          className="mx-auto flex h-14 max-w-[90rem] items-center justify-between px-8 lg:px-16"
          aria-label="Main navigation"
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white"
          >
            <Accessibility
              className="h-5 w-5 text-slate-900 dark:text-white"
              aria-hidden="true"
            />
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white">
              EduTrax
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href="/features"
              className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white"
            >
              Features
            </Link>
            <Link
              href="/metrics"
              className="rounded-md px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white"
            >
              Metrics
            </Link>
            <Link
              href="/login"
              className="ml-2 rounded-md border border-slate-900 bg-slate-900 px-4 py-1.5 text-sm font-medium text-white hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white"
            >
              Sign In
            </Link>
          </div>
        </nav>
      </header>

      <main id="main-content" className="flex-1">
        {/* ── Hero: 2-Column Split ──────────────── */}
        <section
          className="border-b border-slate-200 dark:border-slate-800"
          aria-labelledby="hero-heading"
        >
          <div className="mx-auto max-w-[90rem] grid items-center gap-12 px-8 py-16 sm:py-24 lg:grid-cols-[1fr_1.1fr] lg:px-16 lg:py-28">
            {/* Left: Value proposition */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Disability Accessibility Audit System
              </p>

              <h1
                id="hero-heading"
                className="max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-white"
              >
                Make every space
                <br />
                accessible to everyone.
              </h1>

              <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                Conduct thorough accessibility audits, track compliance in real
                time, and generate actionable reports — all from one clean
                dashboard.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white"
                >
                  Start Free Audit
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-transparent dark:text-white dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white"
                >
                  View Dashboard
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="h-4 w-4 text-emerald-500"
                    aria-hidden="true"
                  />
                  ADA Compliant
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="h-4 w-4 text-emerald-500"
                    aria-hidden="true"
                  />
                  WCAG 2.1 AA
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="h-4 w-4 text-emerald-500"
                    aria-hidden="true"
                  />
                  SOC 2
                </span>
              </div>
            </div>

            {/* Right: Mock dashboard */}
            <div className="hidden lg:block">
              <MockDashboard />
            </div>
          </div>
        </section>

        {/* ── Analytics Snapshot: Wide Bento Grid ── */}
        <section
          id="metrics"
          className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40"
          aria-labelledby="metrics-heading"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:px-12 lg:px-16">
            <div className="mb-10">
              <h2
                id="metrics-heading"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                Campus Accessibility Snapshot
              </h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Real-time compliance metrics across physical and digital
                infrastructure.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {/* Score cards */}
              {campusMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <m.icon
                      className="h-4 w-4 text-slate-400 dark:text-slate-500"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {m.label}
                    </span>
                  </div>
                  <ScoreBar score={m.score} />
                  <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
                    {m.detail}
                  </p>
                </div>
              ))}

              {/* Quick stats card */}
              <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <div className="mb-3 flex items-center gap-2">
                  <TrendingUp
                    className="h-4 w-4 text-slate-400 dark:text-slate-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Key Figures
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Total Audits
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      1,247
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      This Month
                    </span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      89
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Avg. Score
                    </span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      81%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Features + Violations: Side-by-Side ── */}
        <section
          id="features"
          className="border-b border-slate-200 dark:border-slate-800"
          aria-labelledby="features-heading"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:px-12 lg:grid lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:px-16 lg:py-24">
            {/* Left: Features */}
            <div>
              <h2
                id="features-heading"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                Built for Auditors, Designed for Everyone
              </h2>
              <p className="mt-1 mb-10 text-sm text-slate-500 dark:text-slate-400">
                Three core capabilities that make accessibility audits
                efficient and actionable.
              </p>

              <div className="space-y-4">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                      <f.icon
                        className="h-5 w-5 text-slate-900 dark:text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-bold text-slate-900 dark:text-white">
                        {f.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {f.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Open Violations */}
            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Open Violations
                </h2>
                <span className="inline-flex h-6 items-center rounded-full bg-red-50 px-2.5 text-xs font-bold text-red-700 dark:bg-red-900/30 dark:text-red-400">
                  28
                </span>
              </div>

              <div className="space-y-3">
                {violations.map((v) => (
                  <div
                    key={v.type}
                    className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle
                        className="h-4 w-4 text-amber-500 shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {v.type}
                        </p>
                        <SeverityBadge severity={v.severity} />
                      </div>
                    </div>
                    <span className="text-lg font-bold tabular-nums text-slate-900 dark:text-white">
                      {v.count}
                    </span>
                  </div>
                ))}
              </div>

              {/* Activity log */}
              <div className="mt-6 rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center gap-2 mb-3">
                  <Clock
                    className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500"
                    aria-hidden="true"
                  />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Recent Activity
                  </span>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <UserCheck
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-slate-900 dark:text-white">
                          Maria Chen
                        </span>{" "}
                        completed audit for Science Hall B
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-500"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-slate-900 dark:text-white">
                          New violation
                        </span>{" "}
                        flagged at Library Annex
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        5 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-500"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        <span className="font-medium text-slate-900 dark:text-white">
                          James Park
                        </span>{" "}
                        uploaded evidence for 3 items
                      </p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">
                        Yesterday
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats Row ─────────────────────────── */}
        <section
          className="border-b border-slate-200 dark:border-slate-800"
          aria-label="Platform statistics"
        >
          <div className="mx-auto max-w-[90rem] grid grid-cols-2 gap-8 px-8 py-14 sm:grid-cols-4 sm:px-12 lg:px-16">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────── */}
        <section aria-labelledby="cta-heading">
          <div className="mx-auto max-w-[90rem] px-8 py-20 sm:px-12 sm:py-28 lg:px-16">
            <h2
              id="cta-heading"
              className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl"
            >
              Ready to start auditing?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Join institutions building truly accessible educational
              environments. No credit card required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-start gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white"
              >
                Start Free Audit
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-transparent dark:text-white dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white"
              >
                View Dashboard
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────── */}
      <footer className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-[90rem] items-center justify-between px-8 py-6 sm:px-12 lg:px-16">
          <div className="flex items-center gap-1.5">
            <Accessibility
              className="h-4 w-4 text-slate-400 dark:text-slate-500"
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              EduTrax
            </span>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} EduTrax
          </p>
          <div className="flex gap-4 text-xs text-slate-400 dark:text-slate-500">
            <Link
              href="/privacy"
              className="hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white rounded"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white rounded"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
