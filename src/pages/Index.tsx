import { Link } from "react-router-dom";
import { Search, MapPin, Sparkles, Shield, Zap, Star } from "lucide-react";
import { useApp } from "@/contexts/AppContext";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ListingCard } from "@/components/ListingCard";
import { Footer } from "@/components/Footer";
import { LISTINGS, TESTIMONIALS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";
import { Banner } from "@/components/Ads.tsx";

export default function Index() {
  const { t } = useApp();
  const featured = LISTINGS.filter((l) => l.featured).slice(0, 4);
  const recent = LISTINGS.slice(0, 6);

  return (
    <>
    {/* HERO */}
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          width={1920}
          height={1024}
          className="h-full w-full object-cover opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      <div className="relative mx-auto max-w-screen-2xl px-6 lg:px-10 pb-16 pt-12 sm:pt-20 lg:pb-24 lg:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-in-up inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {t("home.trust")}
          </div>
          <h1 className="animate-fade-in-up mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {t("home.title").split(",")[0]},
            <span className="block text-gradient-primary">
                {t("home.title").split(",").slice(1).join(",").trim()}
              </span>
          </h1>
          <p className="animate-fade-in-up mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            {t("home.subtitle")}
          </p>

          {/* Search bar */}
          <div className="animate-fade-in-up mx-auto mt-8">
            <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-card/90 p-2 shadow-elevated backdrop-blur sm:flex-row">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder={t("home.search_placeholder")}
                  className="h-12 w-full rounded-xl bg-transparent pl-12 pr-4 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="relative flex-1 sm:max-w-[200px]">
                <MapPin className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder={t("home.location_placeholder")}
                  className="h-12 w-full rounded-xl bg-transparent pl-12 pr-4 text-sm outline-none placeholder:text-muted-foreground"
                />
              </div>
              <Link to="/listings">
                <Button className="h-12 w-full rounded-xl bg-gradient-primary px-6 font-semibold shadow-glow hover:opacity-95 sm:w-auto">
                  {t("home.cta")}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-14">
          <CategoryGrid />
        </div>
      </div>
    </section>

    {/* AD BANNER — full width container */}
    <div className="mx-auto max-w-screen-2xl px-6 lg:px-10">
      <Banner variant={"inline2"} />
    </div>

    {/* FEATURED — bigger section, bigger gap */}
    <section className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-16">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold sm:text-4xl">{t("home.featured")}</h2>
          <p className="mt-1.5 text-base text-muted-foreground">{t("home.featured_sub")}</p>
        </div>
        <Link
          to="/listings"
          className="hidden text-sm font-semibold text-primary hover:underline sm:inline"
        >
          {t("home.view_all")} →
        </Link>
      </div>
      {/* Bigger gap between cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </section>

    {/* RECENT */}
    <section className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-12">
      <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {recent.map((l) => (
          <ListingCard key={l.id} listing={l} />
        ))}
      </div>
    </section>

    {/* TRUST */}
    <section className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-16">
      <div className="overflow-hidden rounded-3xl border border-border/60 bg-gradient-soft p-8 sm:p-12">
        <div className="grid gap-8 sm:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Verified sellers",
              desc: "ID-checked profiles you can trust.",
            },
            { icon: Zap, title: "Lightning fast", desc: "List in 60 seconds. Sell same day." },
            {
              icon: Star,
              title: "5-star reviews",
              desc: "Built on transparent community ratings.",
            },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
                <f.icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* TESTIMONIALS */}
    <section className="mx-auto max-w-screen-2xl px-6 lg:px-10 py-12">
      <h2 className="text-3xl font-bold sm:text-4xl">
      Loved by neighbors nationwide
    </h2>
    <div className="grid gap-4 sm:grid-cols-3">
      {TESTIMONIALS.map((t) => (
        <div
          key={t.name}
          className="rounded-2xl border border-border/60 bg-card p-6 shadow-soft"
        >
          <div className="flex gap-0.5 text-primary">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
          <div className="mt-4 flex items-center gap-3">
            <img src={t.avatar} alt={t.name} className="h-10 w-10 rounded-full object-cover" />
            <div>
              <div className="text-sm font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
    </section>

  <Footer />
</>
);
}