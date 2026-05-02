import { Link, useSearchParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { LayoutGrid, List as ListIcon, SlidersHorizontal, ChevronDown } from "lucide-react";
import { LISTINGS, CATEGORIES, type Category } from "@/lib/mock-data";
import { ListingCard } from "@/components/ListingCard";
import { Footer } from "@/components/Footer";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Banner } from "@/components/Ads.tsx";

type Search = { category?: Category };

export default function ListingsPage() {
  const { t } = useApp();
  const [searchParams] = useSearchParams();
  const searchCategory = searchParams.get("category") as Category | null;

  const [view, setView] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState<Category | "all">(searchCategory ?? "all");
  const [price, setPrice] = useState<[number, number]>([0, 50000]);
  const [sort, setSort] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = LISTINGS.filter((l) => {
    if (category !== "all" && l.category !== category) return false;
    const p = l.price ?? 0;
    if (p < price[0] || p > price[1]) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "price_low") return (a.price ?? 0) - (b.price ?? 0);
    return 0;
  });

  return (
    <>
      <div className="border-b border-border/60 bg-gradient-soft">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
                <span>/</span>
                <span className="text-foreground">
                  {category === "all" ? "All listings" : t(`cat.${category}`)}
                </span>
              </div>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                {category === "all" ? "All listings" : t(`cat.${category}`)}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">{filtered.length} results</p>
            </div>

            <Banner
              variant="inline"
              intent="promo"
              className="hidden md:flex flex-1 shrink-0 self-center"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto grid gap-6 px-4 py-6 lg:grid-cols-[260px_1fr]">
        {/* SIDEBAR FILTERS */}
        <aside className={cn("space-y-6 lg:block", showFilters ? "block" : "hidden lg:block")}>
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wide">{t("filters.title")}</h3>
              <button
                onClick={() => {
                  setCategory("all");
                  setPrice([0, 50000]);
                }}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {t("filters.clear")}
              </button>
            </div>

            <div className="mt-5">
              <div className="mb-2 text-xs font-semibold text-muted-foreground">
                {t("filters.category")}
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => setCategory("all")}
                  className={cn(
                    "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                    category === "all"
                      ? "bg-primary/10 font-semibold text-primary"
                      : "hover:bg-accent",
                  )}
                >
                  All categories
                </button>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={cn(
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition-colors",
                      category === c.id
                        ? "bg-primary/10 font-semibold text-primary"
                        : "hover:bg-accent",
                    )}
                  >
                    {t(`cat.${c.id}`)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-3 text-xs font-semibold text-muted-foreground">
                {t("filters.price")}
              </div>
              <Slider
                value={price}
                onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])}
                min={0}
                max={50000}
                step={500}
                className="my-4"
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>${price[0].toLocaleString("en-US")}</span>
                <span>${price[1].toLocaleString("en-US")}+</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="mb-2 text-xs font-semibold text-muted-foreground">
                {t("filters.date")}
              </div>
              <select className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm">
                <option>Anytime</option>
                <option>Last 24 hours</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>
            </div>
          </div>

          <Banner variant={"sidebar"} />
        </aside>

        {/* MAIN */}
        <div>
          <div className="mb-4 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setShowFilters((v) => !v)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" /> {t("filters.title")}
            </Button>

            <div className="ml-auto flex items-center gap-2">
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="h-9 appearance-none rounded-full border border-input bg-card pl-4 pr-9 text-sm font-medium outline-none"
                >
                  <option value="newest">{t("filters.sort_newest")}</option>
                  <option value="popular">{t("filters.sort_popular")}</option>
                  <option value="price_low">{t("filters.sort_price_low")}</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
              <div className="flex rounded-full border border-input bg-card p-1">
                <button
                  onClick={() => setView("grid")}
                  className={cn(
                    "rounded-full p-1.5",
                    view === "grid"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground",
                  )}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setView("list")}
                  className={cn(
                    "rounded-full p-1.5",
                    view === "list"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground",
                  )}
                  aria-label="List view"
                >
                  <ListIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card/50 p-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <SlidersHorizontal className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold">No listings match your filters</h3>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting price or category.</p>
            </div>
          ) : (
            <div
              className={cn(
                view === "grid"
                  ? "grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
                  : "flex flex-col gap-3",
              )}
            >
              {filtered.map((l) => (
                <ListingCard key={l.id} listing={l} view={view} />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
