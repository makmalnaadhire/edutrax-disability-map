"use client";

import Link from "next/link";
import {
  Accessibility,
  ArrowRight,
  Building2,
  Eye,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  Clock,
  UserCheck,
  CheckCircle2,
  BarChart3,
  FileText,
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
    color: "blue",
  },
  {
    label: "Digital Accessibility",
    score: 91,
    detail: "Screen reader, contrast, keyboard nav",
    icon: Eye,
    color: "violet",
  },
  {
    label: "Overall Compliance",
    score: 84,
    detail: "Combined campus-wide rating",
    icon: ShieldCheck,
    color: "emerald",
  },
];

const recentAudits = [
  {
    building: "Science Hall B",
    auditor: "Maria Chen",
    score: 92,
    grade: "A",
    status: "Completed",
    date: "Jul 10, 2026",
    category: "Physical",
  },
  {
    building: "Library Annex",
    auditor: "James Park",
    score: 74,
    grade: "C",
    status: "In Review",
    date: "Jul 9, 2026",
    category: "Digital",
  },
  {
    building: "Student Union",
    auditor: "Aisha Johnson",
    score: 88,
    grade: "B",
    status: "Completed",
    date: "Jul 8, 2026",
    category: "Physical",
  },
  {
    building: "Engineering Wing",
    auditor: "David Kim",
    score: 95,
    grade: "A",
    status: "Completed",
    date: "Jul 7, 2026",
    category: "Physical",
  },
  {
    building: "Admin Building",
    auditor: "Sarah Lee",
    score: 67,
    grade: "C",
    status: "Completed",
    date: "Jul 5, 2026",
    category: "Digital",
  },
  {
    building: "Arts Center",
    auditor: "Carlos Ruiz",
    score: 82,
    grade: "B",
    status: "Completed",
    date: "Jul 3, 2026",
    category: "Physical",
  },
];

const violations = [
  { type: "Missing ramp access", severity: "Critical", count: 3, trend: "+1" },
  { type: "Low color contrast", severity: "High", count: 8, trend: "+3" },
  { type: "Missing alt text", severity: "Medium", count: 12, trend: "-2" },
  { type: "No keyboard navigation", severity: "High", count: 5, trend: "0" },
  { type: "Missing form labels", severity: "Medium", count: 7, trend: "-1" },
  { type: "Inadequate focus indicators", severity: "Low", count: 4, trend: "+1" },
];

const monthlyTrends = [
  { month: "Feb", score: 76, audits: 34 },
  { month: "Mar", score: 79, audits: 41 },
  { month: "Apr", score: 81, audits: 38 },
  { month: "May", score: 80, audits: 45 },
  { month: "Jun", score: 83, audits: 52 },
  { month: "Jul", score: 84, audits: 32 },
];

/* ────────────────────────────────────────────
   Score bar helper
   ──────────────────────────────────────────── */
function ScoreBar({ score, size = "default" }: { score: number; size?: "default" | "large" }) {
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

  const height = size === "large" ? "h-3" : "h-2";

  return (
    <div className="w-full">
      <div className="mb-1 flex items-baseline justify-between">
        <span
          className={`font-bold tabular-nums text-slate-900 dark:text-white ${
            size === "large" ? "text-3xl" : "text-2xl"
          }`}
        >
          {score}%
        </span>
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {label}
        </span>
      </div>
      <div
        className={`${height} w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800`}
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
        : severity === "Medium"
          ? "bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
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
   Trend sparkline (simple bar chart)
   ──────────────────────────────────────────── */
function TrendChart() {
  const maxScore = Math.max(...monthlyTrends.map((m) => m.score));
  return (
    <div className="flex items-end gap-2 h-32">
      {monthlyTrends.map((m) => (
        <div key={m.month} className="flex flex-col items-center flex-1 gap-1">
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
            {m.score}%
          </span>
          <div
            className="w-full rounded-t bg-blue-500 dark:bg-blue-400 transition-all duration-500"
            style={{ height: `${(m.score / 100) * 100}%` }}
            role="img"
            aria-label={`${m.month}: ${m.score}%`}
          />
          <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
            {m.month}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────
   Page
   ──────────────────────────────────────────── */
export default function MetricsPage() {
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
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white"
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
        {/* ── Hero ──────────────────────────────── */}
        <section
          className="border-b border-slate-200 dark:border-slate-800"
          aria-labelledby="metrics-hero"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:py-24 lg:px-16 lg:py-32">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Institutional Dashboard
            </p>
            <h1
              id="metrics-hero"
              className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-white"
            >
              Campus Accessibility
              <br />
              at a Glance
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Real-time compliance metrics across physical and digital
              infrastructure. Track progress, identify gaps, and ensure every
              space meets accessibility standards.
            </p>
          </div>
        </section>

        {/* ── Score Cards: Full Width ────────── */}
        <section
          className="border-b border-slate-200 dark:border-slate-800"
          aria-labelledby="score-cards-heading"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:px-12 lg:px-16 lg:py-24">
            <h2
              id="score-cards-heading"
              className="text-lg font-bold text-slate-900 dark:text-white"
            >
              Compliance Scores
            </h2>
            <p className="mt-1 mb-10 text-sm text-slate-500 dark:text-slate-400">
              Overall ratings across campus infrastructure categories.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {campusMetrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                      <m.icon
                        className="h-5 w-5 text-slate-900 dark:text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {m.label}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {m.detail}
                      </p>
                    </div>
                  </div>
                  <ScoreBar score={m.score} size="large" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trend + Key Figures: Side by Side ─ */}
        <section
          className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40"
          aria-labelledby="trend-heading"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:px-12 lg:grid lg:grid-cols-[1.5fr_1fr] lg:gap-8 lg:px-16 lg:py-24">
            {/* Left: Trend chart */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
              <div className="mb-6 flex items-center justify-between">
                <h2
                  id="trend-heading"
                  className="text-sm font-bold text-slate-900 dark:text-white"
                >
                  Compliance Trend
                </h2>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  Last 6 months
                </span>
              </div>
              <TrendChart />
            </div>

            {/* Right: Key figures */}
            <div className="mt-6 grid grid-cols-2 gap-4 lg:mt-0">
              {[
                { label: "Total Audits", value: "1,247", icon: BarChart3 },
                { label: "This Month", value: "89", icon: Clock },
                { label: "Avg. Score", value: "81%", icon: TrendingUp, accent: true },
                { label: "Active Auditors", value: "156", icon: UserCheck },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
                >
                  <item.icon
                    className="h-4 w-4 text-slate-400 dark:text-slate-500"
                    aria-hidden="true"
                  />
                  <p
                    className={`mt-3 text-2xl font-bold tabular-nums ${
                      item.accent
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-900 dark:text-white"
                    }`}
                  >
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Audit History Table ─────────────── */}
        <section
          className="border-b border-slate-200 dark:border-slate-800"
          aria-labelledby="audit-history-heading"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:px-12 lg:px-16 lg:py-24">
            <h2
              id="audit-history-heading"
              className="text-lg font-bold text-slate-900 dark:text-white"
            >
              Recent Audit Evaluations
            </h2>
            <p className="mt-1 mb-10 text-sm text-slate-500 dark:text-slate-400">
              Historical audit records across campus buildings.
            </p>

            {/* Desktop table */}
            <div className="hidden lg:block rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 overflow-hidden">
              <table className="w-full" role="table">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Building
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Auditor
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Category
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Grade
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Score
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Status
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {recentAudits.map((a) => (
                    <tr
                      key={a.building + a.date}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {a.building}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {a.auditor}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {a.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <GradeBadge grade={a.grade} />
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                          {a.score}%
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`text-xs font-medium ${
                            a.status === "Completed"
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-amber-600 dark:text-amber-400"
                          }`}
                        >
                          {a.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {a.date}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 lg:hidden">
              {recentAudits.map((a) => (
                <div
                  key={a.building + a.date}
                  className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GradeBadge grade={a.grade} />
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {a.building}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
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
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Violations + Activity: Side by Side ─ */}
        <section
          className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40"
          aria-labelledby="violations-heading"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:px-12 lg:grid lg:grid-cols-[1.2fr_1fr] lg:gap-8 lg:px-16 lg:py-24">
            {/* Left: Violations */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2
                  id="violations-heading"
                  className="text-lg font-bold text-slate-900 dark:text-white"
                >
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
                        <div className="mt-1 flex items-center gap-2">
                          <SeverityBadge severity={v.severity} />
                          <span
                            className={`text-[10px] font-medium ${
                              v.trend.startsWith("+")
                                ? "text-red-500"
                                : v.trend.startsWith("-")
                                  ? "text-emerald-500"
                                  : "text-slate-400"
                            }`}
                          >
                            {v.trend !== "0" ? `${v.trend} this month` : "No change"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="text-lg font-bold tabular-nums text-slate-900 dark:text-white">
                      {v.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Activity log */}
            <div className="mt-8 lg:mt-0">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Recent Activity
              </h2>

              <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <div className="space-y-4">
                  {[
                    {
                      icon: CheckCircle2,
                      color: "text-emerald-500",
                      user: "Maria Chen",
                      action: "completed audit for Science Hall B",
                      time: "2 hours ago",
                      detail: "Score: 92% — Grade A",
                    },
                    {
                      icon: AlertTriangle,
                      color: "text-amber-500",
                      user: "System",
                      action: "flagged new violation at Library Annex",
                      time: "5 hours ago",
                      detail: "Low color contrast detected",
                    },
                    {
                      icon: UserCheck,
                      color: "text-blue-500",
                      user: "James Park",
                      action: "uploaded evidence for 3 items",
                      time: "Yesterday",
                      detail: "Student Union audit",
                    },
                    {
                      icon: FileText,
                      color: "text-violet-500",
                      user: "Aisha Johnson",
                      action: "generated compliance report",
                      time: "2 days ago",
                      detail: "Q2 2026 Summary",
                    },
                    {
                      icon: Clock,
                      color: "text-slate-400",
                      user: "System",
                      action: "scheduled audit reminder",
                      time: "3 days ago",
                      detail: "Engineering Wing — due Jul 20",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800">
                        <item.icon
                          className={`h-3.5 w-3.5 ${item.color}`}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          <span className="font-medium text-slate-900 dark:text-white">
                            {item.user}
                          </span>{" "}
                          {item.action}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-400 dark:text-slate-500">
                          {item.detail}
                        </p>
                      </div>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 whitespace-nowrap">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────── */}
        <section aria-labelledby="metrics-cta">
          <div className="mx-auto max-w-[90rem] px-8 py-20 sm:px-12 sm:py-28 lg:px-16">
            <h2
              id="metrics-cta"
              className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl"
            >
              Start tracking your compliance today.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Get a complete view of your institution&apos;s accessibility
              status with real-time dashboards and automated reporting.
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
                href="/features"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:bg-transparent dark:text-white dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white"
              >
                Explore Features
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
