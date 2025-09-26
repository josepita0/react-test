import { ReactNode, useState } from "react";
import { cn } from "../lib/cn";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../../auth/store/auth.store";
import { LogOut, ListOrdered, ChevronsLeft, ChevronsRight } from "lucide-react";
import { Button } from "../ui/button";

export function DashboardLayout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const logout = useAuthStore((s) => s.logout);
  const email = useAuthStore((s) => s.email);
  return (
    <div className="min-h-screen bg-gray-100 text-slate-900">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={cn(
            "hidden md:flex transition-all duration-200 p-2",
            collapsed ? "w-[4.5rem]" : "w-72"
          )}
        >
          <div className="flex h-full w-full flex-col rounded-2xl bg-slate-950 text-slate-100 shadow-lg ring-1 ring-slate-800">
            {/* Sidebar header / brand */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 rounded-t-2xl">
              <span
                className={cn(
                  "text-xs font-semibold tracking-widest",
                  collapsed && "sr-only"
                )}
              >
                Menú
              </span>
              <Button
                size="sm"
                className={cn(
                  "px-0 w-9 h-9 rounded-lg bg-indigo-700 hover:bg-indigo-600"
                )}
                title={collapsed ? "Expandir" : "Colapsar"}
                aria-label={collapsed ? "Expandir" : "Colapsar"}
                onClick={() => setCollapsed((v) => !v)}
              >
                {collapsed ? (
                  <ChevronsRight size={16} />
                ) : (
                  <ChevronsLeft size={16} />
                )}
              </Button>
            </div>

            {/* Navigation */}
            <nav className="p-3 space-y-1 text-sm">
              <NavItem
                to="/characters"
                label="Personajes"
                icon={<ListOrdered size={16} />}
                collapsed={collapsed}
              />
            </nav>

            <div className="mt-auto" />

            {/* User / Logout panel */}
            <div
              className={cn(
                "m-3 rounded-xl bg-slate-900/70 p-3 ring-1 ring-slate-800 shadow",
                collapsed &&
                  "m-2 p-1 bg-transparent ring-0 shadow-none flex justify-center"
              )}
            >
              <div
                className={cn("text-xs text-slate-300", collapsed && "hidden")}
              >
                {email ?? "Usuario"}
              </div>
              <Button
                size="sm"
                className={cn(
                  "mt-2 w-full bg-indigo-700 hover:bg-indigo-600",
                  collapsed &&
                    "mt-0 mx-auto w-9 h-9 px-0 justify-center rounded-lg"
                )}
                onClick={logout}
                title="Cerrar sesión"
                aria-label="Cerrar sesión"
              >
                <LogOut size={16} className={cn(!collapsed && "mr-2")} />
                {!collapsed && "Cerrar sesión"}
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Topbar */}
          <header className="sticky top-0 z-20 px-1 pt-2">
            <div className="relative rounded-xl bg-gradient-to-b from-slate-950 to-slate-900 text-white px-6 py-4 shadow-lg ring-1 ring-slate-800">
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-semibold tracking-widest">
                  {title ?? "Personajes"}
                </h1>
              </div>
              {/* bottom soft gradient separator */}
              <div className="pointer-events-none absolute inset-x-0 -bottom-px h-3 bg-gradient-to-b from-black/20 to-transparent rounded-b-2xl" />
            </div>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}

function NavItem({
  to,
  label,
  icon,
  collapsed,
}: {
  to: string;
  label: string;
  icon?: ReactNode;
  collapsed?: boolean;
}) {
  const { pathname } = useLocation();
  const active = pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-2 rounded-xl px-3 py-2 text-slate-200",
        active ? "bg-slate-800 ring-1 ring-slate-700" : "hover:bg-slate-800/60"
      )}
    >
      {icon}
      <span className={cn(collapsed && "sr-only")}>{label}</span>
    </Link>
  );
}
