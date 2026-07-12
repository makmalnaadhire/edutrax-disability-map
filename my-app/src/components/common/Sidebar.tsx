"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardCheck,
  Building2,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Users,
  Shield,
  Accessibility,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  role?: "super_admin" | "institutional_auditor" | "public_viewer";
}

const navItems = {
  super_admin: [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/audits", label: "All Audits", icon: ClipboardCheck },
    { href: "/admin/buildings", label: "Buildings", icon: Building2 },
    { href: "/admin/users", label: "Users", icon: Users },
    { href: "/admin/reports", label: "Reports", icon: BarChart3 },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ],
  institutional_auditor: [
    { href: "/auditor", label: "Dashboard", icon: LayoutDashboard },
    { href: "/auditor/new-audit", label: "New Audit", icon: ClipboardCheck },
    { href: "/auditor/my-audits", label: "My Audits", icon: ClipboardCheck },
    { href: "/auditor/buildings", label: "Buildings", icon: Building2 },
    { href: "/auditor/reports", label: "Reports", icon: BarChart3 },
  ],
  public_viewer: [
    { href: "/viewer", label: "Dashboard", icon: LayoutDashboard },
    { href: "/viewer/buildings", label: "Buildings", icon: Building2 },
    { href: "/viewer/reports", label: "Reports", icon: BarChart3 },
  ],
};

export function Sidebar({ role = "institutional_auditor" }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const items = navItems[role] || navItems.institutional_auditor;

  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-sidebar text-sidebar-foreground",
        "border-r border-border transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      aria-label="Sidebar navigation"
    >
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Accessibility className="h-6 w-6 text-primary" aria-hidden="true" />
            <span className="font-bold">EduTrax</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="rounded-md p-1.5 hover:bg-sidebar-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          ) : (
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2" role="list">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2",
                    "text-sm font-medium transition-colors",
                    "focus:outline-none focus:ring-2 focus:ring-primary",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground"
                  )}
                  aria-current={isActive ? "page" : undefined}
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-2">
        <Link
          href="/login"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2",
            "text-sm font-medium text-sidebar-foreground/70",
            "hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground",
            "focus:outline-none focus:ring-2 focus:ring-primary"
          )}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
          {!collapsed && <span>Sign Out</span>}
        </Link>
      </div>
    </aside>
  );
}
