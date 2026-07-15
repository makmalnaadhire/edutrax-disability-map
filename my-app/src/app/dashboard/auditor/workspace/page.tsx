import Link from "next/link";

export const metadata = {
  title: "Auditor Workspace",
  description: "Your assigned audits, tasks, and submission queue.",
};

export default function AuditorWorkspacePage() {
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
                Auditor
              </span>
              <span className="text-xs text-slate-300 dark:text-slate-600">/</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Workspace
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Auditor Workspace
                </h1>
                <p className="mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-400">
                  View your assigned audits, track progress, and manage your
                  submission queue.
                </p>
              </div>
              <Link
                href="/dashboard/auditor/audit/new"
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                + New Audit
              </Link>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-4 sm:grid-cols-3 mb-12">
              {[
                { label: "Assigned", value: "—" },
                { label: "In Progress", value: "—" },
                { label: "Completed", value: "—" },
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

            <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Auditor workspace with assigned audit list and status cards will
                be implemented here.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
