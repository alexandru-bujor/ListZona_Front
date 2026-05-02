import { Link } from "react-router-dom";
import {
  Briefcase,
  Home as HomeIcon,
  Truck,
  Wrench,
  Users,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES } from "@/lib/mock-data";
import { useApp } from "@/contexts/AppContext";

const ICONS: Record<string, LucideIcon> = {
  Briefcase,
  Home: HomeIcon,
  Truck,
  Wrench,
  Users,
  Tag,
};

export function CategoryGrid() {
  const { t } = useApp();
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 sm:gap-4">
      {CATEGORIES.map((cat) => {
        const Icon = ICONS[cat.icon];
        return (
          <Link
            key={cat.id}
            to="/listings"
            search={{ category: cat.id } as never}
            className="group flex flex-col items-center gap-2 rounded-2xl border border-border/60 bg-card p-4 text-center shadow-soft transition-all hover:-translate-y-1 hover:shadow-elevated"
          >
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} shadow-soft transition-transform group-hover:scale-110`}
            >
              <Icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-semibold sm:text-sm">{t(`cat.${cat.id}`)}</span>
          </Link>
        );
      })}
    </div>
  );
}
