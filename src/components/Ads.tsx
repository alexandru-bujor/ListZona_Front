import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import listZonaLogo from "@/assets/listzona-logo.png";
import { intentConfig } from "@/constants/intentConfig.ts";

const bannerVariants = cva("relative flex items-center gap-3 text-sm font-medium", {
  variants: {
    variant: {
      top: ["w-full justify-center px-4 py-1.5", "bg-primary text-primary-foreground"],
      bottom: [
        "fixed bottom-0 left-0 right-0 z-50",
        "flex-col sm:flex-row justify-between px-4 py-3",
        "border-t  bg-card/95 backdrop-blur-md shadow-lg",
      ],
      inline: ["container mx-auto px-4 px-4 py-3.5", "border  bg-card shadow-sm overflow-hidden"],
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

export const Banner = React.forwardRef<HTMLDivElement, BannerProps>(
  (
    { className, variant = "inline", intent = "promo", href = "#", ctaLabel, onDismiss, ...props },
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
          className={cn(bannerVariants({ variant, intent }), `bg-amber-300`, className)}
          {...props}
        >
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl",
              cfg.accent.icon,
            )}
          >
            {cfg.icon}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">{cfg.headline}</p>
            <p className="truncate text-xs text-muted-foreground">{cfg.body}</p>
          </div>
          <a
            href={href}
            className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            {ctaLabel ?? "Try free"}
          </a>
          {onDismiss && <CloseBtn onDismiss={onDismiss} className="absolute right-1.5 top-1.5" />}
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
