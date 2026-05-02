import { Link, useLocation } from "react-router-dom";
import { Home, Search, Plus, MessageCircle, User } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const { t } = useApp();
  const { pathname } = useLocation();

  const items: { to: string; icon: typeof Home; label: string; primary?: boolean }[] = [
    { to: "/", icon: Home, label: t("nav.home") },
    { to: "/listings", icon: Search, label: t("nav.search") },
    { to: "/post", icon: Plus, label: t("nav.post_ad"), primary: true },
    { to: "/dashboard", icon: MessageCircle, label: t("nav.messages") },
    { to: "/dashboard", icon: User, label: t("nav.profile") },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-5 px-2 pb-[calc(env(safe-area-inset-bottom))] pt-2">
        {items.map((item, i) => {
          const Icon = item.icon;
          const active = pathname === item.to;
          if (item.primary) {
            return (
              <Link key={i} to={item.to} className="flex items-center justify-center">
                <span className="-mt-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </span>
              </Link>
            );
          }
          return (
            <Link
              key={i}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 text-[10px] font-medium transition-colors",
                active ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
