import { Link } from "react-router-dom";
import { Heart, MapPin, Clock, BadgeCheck } from "lucide-react";
import { Listing } from "@/lib/mock-data";
import { useApp } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";

function formatPrice(p: number | null, label?: string) {
  if (p === null) return "Free";
  return `$${p.toLocaleString("en-US")}${label ?? ""}`;
}

export function ListingCard({
  listing,
  view = "grid",
}: {
  listing: Listing;
  view?: "grid" | "list";
}) {
  const { saved, toggleSaved } = useApp();
  const isSaved = saved.has(listing.id);

  if (view === "list") {
    return (
      <Link
        to="/listing/$id"
        params={{ id: listing.id }}
        className="group flex gap-4 rounded-2xl border border-border/60 bg-card p-3 shadow-soft transition-all hover:shadow-elevated"
      >
        <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-xl bg-muted">
          <img
            src={listing.image}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 font-semibold leading-tight">{listing.title}</h3>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleSaved(listing.id);
              }}
              className="rounded-full p-1.5 transition-colors hover:bg-accent"
              aria-label="Save"
            >
              <Heart
                className={cn(
                  "h-4 w-4",
                  isSaved ? "fill-primary text-primary" : "text-muted-foreground",
                )}
              />
            </button>
          </div>
          <div className="mt-1 text-lg font-bold text-foreground">
            {formatPrice(listing.price, listing.priceLabel)}
          </div>
          <div className="mt-auto flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {listing.location}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {listing.postedAt}
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to="/listing/$id"
      params={{ id: listing.id }}
      className="group block overflow-hidden rounded-2xl border border-border/60 bg-card shadow-soft hover-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={listing.image}
          alt={listing.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {listing.featured && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-gradient-primary px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-foreground shadow-glow">
            <BadgeCheck className="h-3 w-3" /> Featured
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleSaved(listing.id);
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full glass transition-transform hover:scale-110"
          aria-label="Save"
        >
          <Heart
            className={cn("h-4 w-4", isSaved ? "fill-primary text-primary" : "text-foreground")}
          />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-[15px] font-semibold leading-tight">{listing.title}</h3>
        </div>
        <div className="mt-1 text-lg font-bold text-foreground">
          {formatPrice(listing.price, listing.priceLabel)}
        </div>
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {listing.location}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {listing.postedAt}
          </span>
        </div>
      </div>
    </Link>
  );
}
