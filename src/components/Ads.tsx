import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import listZonaLogo from "@/assets/listzona-logo.png";
import { intentConfig } from "@/constants/intentConfig.ts";

const bannerVariants = cva("relative flex items-center gap-4 text-sm font-medium", {
  variants: {
    variant: {
      top: ["w-full justify-center px-4 py-3", "bg-primary text-primary-foreground"],
      bottom: [
        "fixed bottom-0 left-0 right-0 z-50",
        "flex-col sm:flex-row justify-between px-4 py-3",
        "border-t bg-card/95 backdrop-blur-md shadow-lg",
      ],
      // single full-width banner
      inline: ["w-full px-6 py-5", "border bg-card shadow-sm overflow-hidden"],
      // multi-banner row — layout handled in JSX, variants just resets
      inline2: ["w-full", ""],
      sidebar: [
        "w-full flex-col items-start mt-2 border-radius-2 px-5 py-5",
        "border bg-white shadow-sm overflow-hidden",
      ],
    },
    intent: {
      promo: "",
      trust: "",
      referral: "",
      download: "",
    },
  },
  defaultVariants: {
    variant: "inline",
    intent: "promo",
  },
});

export interface BannerProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof bannerVariants> {
  href?: string;
  ctaLabel?: string;
  onDismiss?: () => void;
  /** inline2 only: 2 or 3 side-by-side tiles (default: 3) */
  columns?: 2 | 3;
}

function CloseBtn({ onDismiss, className }: { onDismiss: () => void; className?: string }) {
  return (
    <button
      onClick={onDismiss}
      aria-label="Dismiss"
      className={cn(
        "rounded p-1 transition-colors",
        "text-current/60 hover:text-current hover:bg-black/10 dark:hover:bg-white/10",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}

/** Single tile used inside the inline2 grid */
function BannerTile({
                      cfg,
                      href,
                      ctaLabel,
                      onDismiss,
                    }: {
  cfg: (typeof intentConfig)[keyof typeof intentConfig];
  href: string;
  ctaLabel?: string;
  onDismiss?: () => void;
}) {
  return (
    <div className="relative flex items-center gap-4 border bg-card px-5 py-8 shadow-sm overflow-hidden">
      <div
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl",
          cfg.accent.icon,
        )}
      >
        {cfg.icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-base font-bold">{cfg.headline}</p>
        <p className="truncate text-sm text-muted-foreground">{cfg.body}</p>
      </div>
      <a
        href={href}
        className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {ctaLabel ?? "Try free"}
      </a>
      {onDismiss && <CloseBtn onDismiss={onDismiss} className="absolute right-2 top-2" />}
    </div>
  );
}

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    {
      className,
      variant = "inline",
      intent = "promo",
      href = "#",
      ctaLabel,
      onDismiss,
      columns = 3,
      ...props
    },
    ref,
  ) => {
    const cfg = intentConfig[intent!];

    if (variant === "top") {
      return (
        <div
          ref={ref}
          role="banner"
          className={cn(bannerVariants({ variant, intent }), className)}
          {...props}
        >
          <span className="hidden sm:inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider">
            {cfg.eyebrow}
          </span>
          <span>{cfg.body}</span>
          <a
            href={href}
            className="underline underline-offset-2 hover:opacity-75 transition-opacity whitespace-nowrap"
          >
            {ctaLabel ?? "Learn more →"}
          </a>
          {onDismiss && (
            <CloseBtn onDismiss={onDismiss} className="absolute right-3 top-1/2 -translate-y-1/2" />
          )}
        </div>
      );
    }

    if (variant === "bottom") {
      return (
        <div
          ref={ref}
          role="banner"
          className={cn(bannerVariants({ variant, intent }), className)}
          {...props}
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 w-full">
            <div className="flex items-center gap-3">
              <img src={listZonaLogo} alt="ListZona" className="h-7 w-auto object-contain" />
              <p className="text-sm font-medium">
                <span className="font-semibold text-primary">{cfg.eyebrow}:</span> {cfg.body}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={href}
                className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                {ctaLabel ?? "Claim offer"}
              </a>
              {onDismiss && (
                <button
                  onClick={onDismiss}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  Dismiss
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    if (variant === "inline") {
      return (
        <div
          ref={ref}
          role="complementary"
          aria-label="Advertisement"
          className={cn(bannerVariants({ variant, intent }), className)}
          {...props}
        >
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl",
              cfg.accent.icon,
            )}
          >
            {cfg.icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-lg font-bold">{cfg.headline}</p>
            <p className="truncate text-sm text-muted-foreground">{cfg.body}</p>
          </div>
          <a
            href={href}
            className="shrink-0 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {ctaLabel ?? "Try free"}
          </a>
          {onDismiss && <CloseBtn onDismiss={onDismiss} className="absolute right-2 top-2" />}
        </div>
      );
    }

    if (variant === "inline2") {
      const intents = Object.keys(intentConfig) as (keyof typeof intentConfig)[];
      const tiles = intents.slice(0, columns);

      return (
        <div
          ref={ref}
          role="complementary"
          aria-label="Advertisement"
          className={cn(
            "w-full grid gap-px bg-border",
            columns === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
            className,
          )}
          {...props}
        >
          {tiles.map((key) => (
            <BannerTile
              key={key}
              cfg={intentConfig[key]}
              href={href}
              ctaLabel={ctaLabel}
              onDismiss={onDismiss}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="complementary"
        aria-label="Advertisement"
        className={cn(bannerVariants({ variant, intent }), className)}
        {...props}
      >
        <div
          className={cn(
            "absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-10 blur-2xl pointer-events-none",
            cfg.accent.blob,
          )}
        />
        {onDismiss && <CloseBtn onDismiss={onDismiss} className="absolute right-2 top-2" />}
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {cfg.eyebrow}
        </p>
        <h3 className="mt-2 text-base font-bold leading-snug">{cfg.headline}</h3>
        <p className="mt-1.5 text-sm text-muted-foreground">{cfg.body}</p>
        <span
          className={cn(
            "mt-3 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold",
            cfg.accent.badge,
          )}
        >
          {cfg.badge}
        </span>
        <a
          href={href}
          className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {ctaLabel ?? "Learn more"}
        </a>
        <p className="mt-2 text-center text-[10px] text-muted-foreground/60">
          Sponsored · ListZona
        </p>
      </div>
    );
  },
);

Banner.displayName = "Banner";

export { bannerVariants };