"use client";

import Link from "next/link";
import {
  ClipboardCheck,
  BarChart3,
  FileText,
  Building2,
  Users,
  ShieldCheck,
  Eye,
  CheckCircle2,
  Accessibility,
  ArrowRight,
  Layers,
  Bell,
  Lock,
  Globe,
  Zap,
  Database,
} from "lucide-react";

const coreFeatures = [
  {
    icon: ClipboardCheck,
    title: "Smart Checklists",
    subtitle: "Audit with precision",
    description:
      "Step-by-step audit forms built on WCAG 2.1 standards for physical and digital infrastructure. Each checklist adapts to your institution's building types and compliance requirements.",
    benefits: [
      "Pre-built WCAG 2.1 AA and AAA templates",
      "Custom checklist creation for unique facilities",
      "Offline-first design for field audits",
      "Photo and document evidence attachments",
    ],
  },
  {
    icon: BarChart3,
    title: "Accessible Analytics",
    subtitle: "Data everyone can read",
    description:
      "Dashboards with colorblind-safe charts, pattern fills, and clear text fallbacks for every data point. Accessibility reporting that practices what it preaches.",
    benefits: [
      "Colorblind-safe palettes with pattern overlays",
      "Screen reader compatible data tables",
      "Real-time compliance trend tracking",
      "Exportable charts in SVG and PNG formats",
    ],
  },
  {
    icon: FileText,
    title: "One-Click Reporting",
    subtitle: "Actionable compliance docs",
    description:
      "Generate PDF and Excel compliance reports with grade ratings and violation summaries. Share findings with stakeholders in seconds, not hours.",
    benefits: [
      "Auto-generated compliance grade reports",
      "Violation breakdowns with severity ratings",
      "Institutional branding and custom templates",
      "Scheduled report delivery via email",
    ],
  },
];

const additionalFeatures = [
  {
    icon: Building2,
    title: "Building Management",
    description:
      "Register and organize all campus buildings with floor plans, accessibility profiles, and historical audit timelines.",
  },
  {
    icon: Users,
    title: "Multi-Role Access",
    description:
      "Role-based permissions for administrators, institutional auditors, and public viewers with granular data access controls.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance Tracking",
    description:
      "Monitor ADA, Section 508, and WCAG compliance status across your entire portfolio with automated deadline reminders.",
  },
  {
    icon: Layers,
    title: "Audit History",
    description:
      "Complete version-controlled audit history for every building. Compare scores across time periods and track improvement.",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Automated alerts for upcoming audit deadlines, overdue reviews, and critical violations that require immediate attention.",
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    description:
      "SOC 2 compliant infrastructure with encrypted data at rest and in transit. Role-based access controls and audit logging.",
  },
];

const workflowSteps = [
  {
    step: "01",
    title: "Register Buildings",
    description:
      "Add your campus buildings, define floor layouts, and set accessibility baselines for each facility.",
    icon: Building2,
  },
  {
    step: "02",
    title: "Conduct Audits",
    description:
      "Use smart checklists to evaluate physical and digital accessibility against WCAG and ADA standards.",
    icon: ClipboardCheck,
  },
  {
    step: "03",
    title: "Analyze Results",
    description:
      "Review compliance scores, identify violation patterns, and prioritize remediation efforts.",
    icon: BarChart3,
  },
  {
    step: "04",
    title: "Report & Improve",
    description:
      "Generate stakeholder reports, track improvements over time, and maintain continuous compliance.",
    icon: FileText,
  },
];

/* ────────────────────────────────────────────
   Page
   ──────────────────────────────────────────── */
export default function FeaturesPage() {
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
              className="rounded-md px-3 py-1.5 text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-white"
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
        {/* ── Hero ──────────────────────────────── */}
        <section
          className="border-b border-slate-200 dark:border-slate-800"
          aria-labelledby="features-hero"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:py-24 lg:px-16 lg:py-32">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Platform Capabilities
            </p>
            <h1
              id="features-hero"
              className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl dark:text-white"
            >
              Everything you need to audit,
              <br />
              track, and improve accessibility.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              EduTrax combines smart checklists, accessible analytics, and
              one-click reporting into a single platform built for educational
              institutions committed to universal access.
            </p>
          </div>
        </section>

        {/* ── Core Features: Expanded Cards ─── */}
        <section
          className="border-b border-slate-200 dark:border-slate-800"
          aria-labelledby="core-features-heading"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:px-12 lg:px-16 lg:py-24">
            <h2
              id="core-features-heading"
              className="text-lg font-bold text-slate-900 dark:text-white"
            >
              Core Capabilities
            </h2>
            <p className="mt-1 mb-12 text-sm text-slate-500 dark:text-slate-400">
              Three pillars that make accessibility audits efficient and
              actionable.
            </p>

            <div className="space-y-6">
              {coreFeatures.map((f) => (
                <div
                  key={f.title}
                  className="grid gap-6 rounded-xl border border-slate-200 bg-white p-6 sm:grid-cols-[1fr_1.5fr] lg:gap-12 dark:border-slate-700 dark:bg-slate-900"
                >
                  {/* Left: Icon + Title */}
                  <div>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                      <f.icon
                        className="h-6 w-6 text-slate-900 dark:text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                      {f.subtitle}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {f.description}
                    </p>
                  </div>

                  {/* Right: Benefits list */}
                  <div className="flex flex-col justify-center">
                    <ul className="space-y-3" role="list">
                      {f.benefits.map((b) => (
                        <li key={b} className="flex items-start gap-3">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                            aria-hidden="true"
                          />
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {b}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How It Works: Workflow Steps ──── */}
        <section
          className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40"
          aria-labelledby="workflow-heading"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:px-12 lg:px-16 lg:py-24">
            <h2
              id="workflow-heading"
              className="text-lg font-bold text-slate-900 dark:text-white"
            >
              How It Works
            </h2>
            <p className="mt-1 mb-12 text-sm text-slate-500 dark:text-slate-400">
              From building registration to compliance reporting in four steps.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {workflowSteps.map((s) => (
                <div
                  key={s.step}
                  className="relative rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
                >
                  <span className="text-3xl font-extrabold text-slate-100 dark:text-slate-800">
                    {s.step}
                  </span>
                  <div className="mt-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <s.icon
                      className="h-5 w-5 text-slate-900 dark:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {s.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Additional Features Grid ──────── */}
        <section
          className="border-b border-slate-200 dark:border-slate-800"
          aria-labelledby="additional-heading"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:px-12 lg:px-16 lg:py-24">
            <h2
              id="additional-heading"
              className="text-lg font-bold text-slate-900 dark:text-white"
            >
              Built for Scale
            </h2>
            <p className="mt-1 mb-12 text-sm text-slate-500 dark:text-slate-400">
              Additional capabilities that grow with your institution.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {additionalFeatures.map((f) => (
                <div
                  key={f.title}
                  className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                    <f.icon
                      className="h-5 w-5 text-slate-900 dark:text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Integration Highlights ─────────── */}
        <section
          className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40"
          aria-labelledby="integration-heading"
        >
          <div className="mx-auto max-w-[90rem] px-8 py-16 sm:px-12 lg:grid lg:grid-cols-2 lg:gap-16 lg:px-16 lg:py-24">
            <div>
              <h2
                id="integration-heading"
                className="text-lg font-bold text-slate-900 dark:text-white"
              >
                Integration & Security
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                EduTrax integrates with your existing institutional systems and
                meets enterprise security standards. SSO support, API access, and
                compliance with SOC 2 Type II ensure your data stays protected.
              </p>
              <div className="mt-8 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="h-4 w-4 text-emerald-500"
                    aria-hidden="true"
                  />
                  SOC 2 Type II
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="h-4 w-4 text-emerald-500"
                    aria-hidden="true"
                  />
                  SSO / SAML
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2
                    className="h-4 w-4 text-emerald-500"
                    aria-hidden="true"
                  />
                  REST API
                </span>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 lg:mt-0">
              {[
                { icon: Globe, label: "Multi-language", detail: "EN & ID" },
                { icon: Zap, label: "Real-time Sync", detail: "< 200ms" },
                { icon: Database, label: "Data Export", detail: "PDF, Excel, CSV" },
                { icon: Lock, label: "Encryption", detail: "AES-256 at rest" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
                >
                  <item.icon
                    className="h-5 w-5 text-slate-400 dark:text-slate-500"
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                    {item.label}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────── */}
        <section aria-labelledby="features-cta">
          <div className="mx-auto max-w-[90rem] px-8 py-20 sm:px-12 sm:py-28 lg:px-16">
            <h2
              id="features-cta"
              className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl"
            >
              Ready to see it in action?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              Start your first accessibility audit in minutes. No credit card
              required.
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
