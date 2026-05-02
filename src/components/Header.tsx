import { Link } from "react-router-dom";
import { Search, Bell, Plus, Moon, Sun, Globe, Wallet, MessageCircle } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { LANGS } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import listZonaLogo from "@/assets/listzona-logo.png";
import { TopUpDialog } from "@/components/TopUpDialog";
import { Banner } from "@/components/Ads.tsx";

export function Header() {
  const { t, theme, toggleTheme, lang, setLang, balance } = useApp();

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <Banner variant={"top"} />
        <div className="container mx-auto flex h-16 items-center gap-3 px-4">
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <img src={listZonaLogo} alt="ListZona" className="h-10 w-auto object-contain sm:h-11" />
          </Link>

          <div className="ml-2 hidden flex-1 max-w-xl md:flex">
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder={t("home.search_placeholder")}
                className="h-10 w-full rounded-full border border-input bg-muted/40 pl-10 pr-4 text-sm outline-none ring-offset-background placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
              />
            </div>
          </div>

          <nav className="ml-auto flex items-center gap-1">
            <Link
              to="/listings"
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground lg:inline-block"
            >
              {t("nav.browse")}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="Language">
                  <Globe className="h-[18px] w-[18px]" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-40">
                {LANGS.map((l) => (
                  <DropdownMenuItem
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={lang === l.code ? "font-semibold text-primary" : ""}
                  >
                    <span className="mr-2">{l.flag}</span>
                    {l.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <TopUpDialog
              trigger={
                <button
                  className="hidden h-9 items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 text-sm font-semibold transition-all hover:border-primary/40 hover:shadow-soft sm:inline-flex"
                  aria-label={t("balance.label")}
                >
                  <Wallet className="h-4 w-4 text-primary" />
                  <span className="tabular-nums">${balance.toFixed(2)}</span>
                </button>
              }
            />

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={toggleTheme}
              aria-label="Theme"
            >
              {theme === "light" ? (
                <Moon className="h-[18px] w-[18px]" />
              ) : (
                <Sun className="h-[18px] w-[18px]" />
              )}
            </Button>

            <Link to="/messages">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label={t("nav.messages")}
              >
                <MessageCircle className="h-[18px] w-[18px]" />
              </Button>
            </Link>

            <Link to="/notifications">
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-full"
                aria-label={t("nav.notifications")}
              >
                <Bell className="h-[18px] w-[18px]" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary" />
              </Button>
            </Link>

            <Link to="/post" className="ml-1 hidden md:inline-flex">
              <Button className="rounded-full bg-gradient-primary shadow-glow hover:opacity-95">
                <Plus className="mr-1 h-4 w-4" /> {t("nav.post_ad")}
              </Button>
            </Link>

            <Link to="/dashboard" className="ml-1">
              <img
                src="https://i.pravatar.cc/100?img=15"
                alt="Profile"
                className="h-9 w-9 rounded-full border-2 border-border object-cover"
              />
            </Link>
          </nav>
        </div>

        {/* Mobile search row */}
        <div className="border-t border-border/40 px-4 py-2 md:hidden">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder={t("home.search_placeholder")}
              className="h-10 w-full rounded-full border border-input bg-muted/40 pl-10 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </div>
      </header>
    </>
  );
}
