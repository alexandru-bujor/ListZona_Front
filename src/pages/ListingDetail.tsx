import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import {
  Heart,
  Share2,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  BadgeCheck,
  Star,
  ChevronLeft,
  ChevronRight,
  Flag,
} from "lucide-react";
import { getListing, LISTINGS } from "@/lib/mock-data";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { ListingCard } from "@/components/ListingCard";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Banner } from "@/components/Ads.tsx";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const listing = getListing(id!) || LISTINGS[0]; // Fallback to avoid error
  const { t, saved, toggleSaved } = useApp();
  const [imgIdx, setImgIdx] = useState(0);
  const images: string[] = listing.images ?? [listing.image];
  const isSaved = saved.has(listing.id);
  const related = LISTINGS.filter(
    (l) => l.id !== listing.id && l.category === listing.category,
  ).slice(0, 3);

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link to="/listings" className="hover:text-foreground">
            {t(`cat.${listing.category}`)}
          </Link>
          <span>/</span>
          <span className="line-clamp-1 text-foreground">{listing.title}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* LEFT */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-muted shadow-elevated">
              <img
                src={images[imgIdx]}
                alt={listing.title}
                className="h-full w-full object-cover"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full glass hover:scale-110"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setImgIdx((i) => (i + 1) % images.length)}
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full glass hover:scale-110"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        className={cn(
                          "h-1.5 rounded-full transition-all",
                          i === imgIdx ? "w-6 bg-white" : "w-1.5 bg-white/60",
                        )}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={cn(
                      "relative h-20 w-28 shrink-0 overflow-hidden rounded-xl border-2 transition-all",
                      i === imgIdx ? "border-primary" : "border-transparent opacity-70",
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="mt-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">{listing.title}</h1>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {listing.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4" />
                      {t("listing.posted")} {listing.postedAt}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => toggleSaved(listing.id)}
                  >
                    <Heart className={cn("h-4 w-4", isSaved && "fill-primary text-primary")} />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4 inline-flex items-baseline gap-2 rounded-2xl bg-gradient-primary px-5 py-3 shadow-glow">
                <span className="text-3xl font-extrabold text-primary-foreground">
                  ${listing.price?.toLocaleString("en-US")}
                </span>
                {listing.priceLabel && (
                  <span className="text-sm font-medium text-primary-foreground/80">
                    {listing.priceLabel}
                  </span>
                )}
              </div>

              <div className="mt-8">
                <h2 className="text-lg font-bold">{t("listing.description")}</h2>
                <p className="mt-3 leading-relaxed text-foreground/90">{listing.description}</p>
              </div>

              <button className="mt-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                <Flag className="h-3.5 w-3.5" /> Report this listing
              </button>
            </div>
          </div>

          {/* RIGHT — sticky seller card */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border/60 bg-card p-6 shadow-elevated">
              <div className="flex items-center gap-3">
                <img
                  src={listing.seller.avatar}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover ring-2 ring-primary/20"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold">{listing.seller.name}</span>
                    {listing.seller.verified && <BadgeCheck className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Star className="h-3 w-3 fill-primary text-primary" />
                    {listing.seller.rating} · {t("listing.member_since")}{" "}
                    {listing.seller.memberSince}
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <Button className="h-12 w-full rounded-xl bg-gradient-primary text-base font-semibold shadow-glow hover:opacity-95">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("action.message")}
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-xl text-base font-semibold"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {t("action.call")}
                </Button>
              </div>

              <div className="mt-5 rounded-xl bg-muted/50 p-3 text-xs text-muted-foreground">
                <strong className="text-foreground">Stay safe:</strong> Always meet in public places
                and inspect items before paying. Never wire money.
              </div>
            </div>

            <Banner variant={"sidebar"} />
          </aside>
        </div>

        {/* RELATED */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">{t("listing.related")}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </>
  );
}
