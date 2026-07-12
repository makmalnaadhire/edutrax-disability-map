import { Accessibility } from "lucide-react";
import Link from "next/link";

const metrics = [
  { label: "Overall", value: "84%", color: "bg-emerald-400" },
  { label: "Physical", value: "78%", color: "bg-blue-400" },
  { label: "Digital", value: "91%", color: "bg-violet-400" },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Left panel — visual branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[45%] lg:flex-col lg:justify-between bg-slate-900 p-12 xl:p-16">
        {/* Top: Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
            <Accessibility className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <span className="text-lg font-bold text-white">EduTrax</span>
        </Link>

        {/* Middle: Decorative dashboard grid */}
        <div className="space-y-6">
          {/* Score row */}
          <div className="grid grid-cols-3 gap-3">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-xl border border-white/10 bg-white/5 p-5"
              >
                <p className={`text-3xl font-bold text-white tabular-nums`}>
                  {m.value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-400">
                  {m.label}
                </p>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full ${m.color}`}
                    style={{
                      width:
                        m.value === "84%"
                          ? "84%"
                          : m.value === "78%"
                            ? "78%"
                            : "91%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mini table */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold text-white">
                Recent Audits
              </span>
              <span className="text-[10px] text-slate-500">This Week</span>
            </div>
            <div className="space-y-3">
              {[
                {
                  building: "Science Hall B",
                  score: 92,
                  grade: "A",
                  status: "Completed",
                },
                {
                  building: "Library Annex",
                  score: 74,
                  grade: "C",
                  status: "In Review",
                },
                {
                  building: "Student Union",
                  score: 88,
                  grade: "B",
                  status: "Completed",
                },
              ].map((a) => (
                <div
                  key={a.building}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold ${
                        a.grade === "A"
                          ? "bg-emerald-400/20 text-emerald-300"
                          : a.grade === "B"
                            ? "bg-blue-400/20 text-blue-300"
                            : "bg-amber-400/20 text-amber-300"
                      }`}
                    >
                      {a.grade}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {a.building}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {a.status}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-white tabular-nums">
                    {a.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Quote */}
        <blockquote className="max-w-sm">
          <p className="text-sm leading-relaxed text-slate-400">
            &ldquo;Accessibility is not a feature. It is a social trend.&rdquo;
          </p>
          <cite className="mt-2 block text-xs font-medium text-slate-500 not-italic">
            — Eduardo Shiota
          </cite>
        </blockquote>
      </div>

      {/* Right panel — form container */}
      <div className="flex w-full flex-col justify-center px-6 py-12 sm:px-12 lg:w-[55%] lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
