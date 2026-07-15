import Link from "next/link";

export const metadata = {
  title: "Dashboard",
  description: "EduTrax dashboard — choose your workspace based on your role.",
};

const workspaces = [
  {
    href: "/dashboard/admin/overview",
    label: "Admin Overview",
    description: "Platform-wide stats, institution management, and user oversight.",
    roles: ["super_admin"],
  },
  {
    href: "/dashboard/admin/institutions",
    label: "Institutions",
    description: "Register, edit, and manage educational institutions.",
    roles: ["super_admin"],
  },
  {
    href: "/dashboard/admin/users",
    label: "User Management",
    description: "Manage roles, permissions, and account status.",
    roles: ["super_admin"],
  },
  {
    href: "/dashboard/auditor/workspace",
    label: "Auditor Workspace",
    description: "Your assigned audits, upcoming tasks, and submission queue.",
    roles: ["auditor"],
  },
  {
    href: "/dashboard/auditor/audit/new",
    label: "New Audit",
    description: "Start a fresh audit for an assigned building.",
    roles: ["auditor"],
  },
  {
    href: "/dashboard/auditor/reports",
    label: "Reports",
    description: "View and export completed audit reports.",
    roles: ["auditor"],
  },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-950">
      <div id="main-content" className="flex-1">
        <section className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Dashboard
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Choose Your Workspace
            </h1>
            <p className="mt-4 max-w-xl text-lg text-slate-600 dark:text-slate-400">
              Select a workspace below based on your role. This is the
              multi-role redirector — links are gated by authentication and
              role in production.
            </p>
          </div>
        </section>

        <section className="border-b border-slate-200 dark:border-slate-800">
          <div className="mx-auto max-w-5xl px-6 py-16">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-8">
              Available Workspaces
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              {workspaces.map((ws) => (
                <Link
                  key={ws.href}
                  href={ws.href}
                  className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-slate-500"
                >
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:underline">
                    {ws.label}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {ws.description}
                  </p>
                  <p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    Roles: {ws.roles.join(", ")}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
