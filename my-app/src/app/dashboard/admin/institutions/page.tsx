import Link from "next/link";

export const metadata = {
  title: "Institutions",
  description: "Manage registered educational institutions.",
};

export default function AdminInstitutionsPage() {
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
              <span className="text-xs text-slate-300 dark:text-slate-600">/</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
                Institutions
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  Institutions
                </h1>
                <p className="mt-3 max-w-xl text-sm text-slate-600 dark:text-slate-400">
                  Register and manage educational institutions on the platform.
                </p>
              </div>
              <button
                type="button"
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
              >
                + Add Institution
              </button>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-700">
              <p className="text-sm text-slate-400 dark:text-slate-500">
                Institution list and management UI will be implemented here.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
