import Link from "next/link";

export const metadata = {
  title: "Admin Overview",
  description: "Platform-wide statistics and institution management overview.",
};

export default function AdminOverviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <div id="main-content" className="flex-1">
        <section className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
            <div className="flex items-center gap-3 mb-2">
              <Link
                href="/dashboard"
                className="text-xs font-medium text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
              >
                Dashboard
              </Link>
              <span className="text-xs text-slate-300 dark:text-slate-600">/</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Admin
              </span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Admin Overview
            </h1>
            <p className="mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-400">
              Platform-wide statistics, institution health, and recent activity
              across all tenants.
            </p>
          </div>
        </section>

        <section className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total Institutions", value: "—" },
                { label: "Active Users", value: "—" },
                { label: "Audits This Month", value: "—" },
                { label: "Platform Uptime", value: "—" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900"
                >
                  <p className="text-xs font-medium text-slate-400 dark:text-slate-500">
                    {s.label}
                  </p>
                  <p className="mt-2 text-3xl font-extrabold text-slate-200 dark:text-slate-700">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Admin overview content will be implemented here.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
