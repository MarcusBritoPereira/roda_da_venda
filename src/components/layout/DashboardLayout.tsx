'use client'

import Link from "next/link";
import { LayoutDashboard, Target, Users, Settings, LogOut, Menu, Trophy } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  // Simulação de papel do usuário (em produção viria do Profile no Supabase)
  const userRole = "seller"; 

  const allItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/dashboard", roles: ["seller", "leader", "admin"] },
    { icon: <Target size={20} />, label: "Avaliação", href: "/evaluations/new", roles: ["seller", "leader", "admin"] },
    { icon: <Users size={20} />, label: "Time (Líder)", href: "/leader", roles: ["leader", "admin"] },
    { icon: <Trophy size={20} />, label: "Evolução (PDIs)", href: "/leader/pdi-tracking", roles: ["leader", "admin"] },
    { icon: <Settings size={20} />, label: "Sistema", href: "/admin", roles: ["admin"] },
  ];

  const menuItems = allItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="flex min-h-screen bg-vulp-void text-vulp-white">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r border-ui-border bg-ui-surface/30 backdrop-blur-xl">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-vulp-brand rounded-lg flex items-center justify-center font-black text-lg">
            V
          </div>
          <span className="font-bold text-xl tracking-tight">VULP</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-vulp-electric/20 text-vulp-lilac border border-vulp-electric/20 shadow-glow-lilac"
                    : "text-ui-muted hover:bg-ui-surface hover:text-vulp-white"
                }`}
              >
                {item.icon}
                <span className="font-semibold">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-ui-border">
          <div className="flex items-center gap-3 px-4 py-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-vulp-brand/20 border border-vulp-lilac/30 flex items-center justify-center font-bold text-vulp-lilac">
              MR
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold truncate">Marcus Rodrigo</span>
              <span className="text-[10px] text-ui-muted uppercase tracking-widest">Admin</span>
            </div>
          </div>
          <Button variant="ghost" className="w-full justify-start gap-3 text-ui-muted hover:text-status-dismiss">
            <LogOut size={20} />
            Sair
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header - Mobile & Search */}
        <header className="h-16 border-b border-ui-border flex items-center justify-between px-6 bg-ui-surface/10 md:bg-transparent">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-vulp-white">
              <Menu size={24} />
            </button>
            <h2 className="text-sm font-bold text-ui-muted uppercase tracking-[0.2em]">Visão Geral</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-ui-muted uppercase font-bold tracking-widest">Ciclo Atual</p>
              <p className="text-sm font-bold">Abril 2026</p>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
