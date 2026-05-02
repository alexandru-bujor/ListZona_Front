import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Check,
  Upload,
  X,
  ImagePlus,
  Briefcase,
  Home as HomeIcon,
  Truck,
  Wrench,
  Users,
  Tag,
  Wallet,
  AlertCircle,
  User,
  Building2,
  Info,
  type LucideIcon,
} from "lucide-react";
import { CATEGORIES, type Category } from "@/lib/mock-data";
import {
  useApp,
  POST_COST,
  getPostCost,
  CATEGORY_FIXED_PRICE,
  type AccountType,
} from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { TopUpDialog } from "@/components/TopUpDialog";
import { cn } from "@/lib/utils";

const ICONS: Record<string, LucideIcon> = { Briefcase, Home: HomeIcon, Truck, Wrench, Users, Tag };

export default function PostAdPage() {
  const { t, balance, accountType, setAccountType, charge } = useApp();
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState<Category | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  // Effective cost: certain categories (Jobs, Housing) have a flat fixed price.
  const postCost = getPostCost(accountType, category);
  const fixedPrice = category ? CATEGORY_FIXED_PRICE[category] : undefined;
  const isFixedPriceCategory = fixedPrice !== undefined;
  const canAfford = balance >= postCost;

  const handlePublish = () => {
    if (charge(postCost)) setDone(true);
  };

  const steps = [
    t("post.step.category"),
    t("post.step.details"),
    t("post.step.photos"),
    t("post.step.preview"),
  ];

  const canNext =
    (step === 1 && !!category) ||
    (step === 2 && title.length > 3 && !!location) ||
    step === 3 ||
    step === 4;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const urls = Array.from(files)
      .slice(0, 10 - photos.length)
      .map((f) => URL.createObjectURL(f));
    setPhotos((p) => [...p, ...urls]);
  };

  if (done) {
    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
          <Check className="h-10 w-10 text-primary-foreground" strokeWidth={3} />
        </div>
        <h1 className="text-3xl font-bold">Your listing is live! 🎉</h1>
        <p className="mt-2 text-muted-foreground">
          ${postCost.toFixed(2)} {t("balance.charged")}. Remaining balance: ${balance.toFixed(2)}
        </p>
        <div className="mt-6 flex gap-3">
          <Link to="/listings">
            <Button variant="outline" className="rounded-full">
              View all listings
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button className="rounded-full bg-gradient-primary shadow-glow">
              Go to dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto max-w-3xl px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t("post.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Reach 2M+ neighbors in your area.</p>
        </div>

        {/* Progress */}
        <div className="mt-8">
          <div className="flex items-center justify-between">
            {steps.map((label, i) => {
              const idx = i + 1;
              const active = step === idx;
              const completed = step > idx;
              return (
                <div key={label} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-bold transition-all",
                        completed && "border-primary bg-primary text-primary-foreground",
                        active && "border-primary bg-card text-primary scale-110",
                        !active && !completed && "border-border bg-card text-muted-foreground",
                      )}
                    >
                      {completed ? <Check className="h-4 w-4" /> : idx}
                    </div>
                    <span
                      className={cn(
                        "hidden text-xs font-medium sm:inline",
                        active ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div
                      className={cn(
                        "mx-2 h-0.5 flex-1 rounded-full transition-colors",
                        completed ? "bg-primary" : "bg-border",
                      )}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step content */}
        <div className="mt-10 rounded-3xl border border-border/60 bg-card p-6 shadow-soft sm:p-8">
          {step === 1 && (
            <>
              <h2 className="text-lg font-bold">Choose a category</h2>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CATEGORIES.map((c) => {
                  const Icon = ICONS[c.icon];
                  const selected = category === c.id;
                  const flat = CATEGORY_FIXED_PRICE[c.id];
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCategory(c.id)}
                      className={cn(
                        "relative flex flex-col items-center gap-2 rounded-2xl border-2 p-5 transition-all",
                        selected
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border hover:border-primary/40",
                      )}
                    >
                      {flat !== undefined && (
                        <span className="absolute right-2 top-2 rounded-full bg-gradient-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary-foreground shadow-glow">
                          ${flat}
                        </span>
                      )}
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${c.gradient}`}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-sm font-semibold">{t(`cat.${c.id}`)}</span>
                    </button>
                  );
                })}
              </div>
            </>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-lg font-bold">Tell us about it</h2>

              <Field label={t("billing.account_type")}>
                <div className="grid grid-cols-2 gap-3">
                  {(["individual", "business"] as AccountType[]).map((type) => {
                    const Icon = type === "individual" ? User : Building2;
                    const isSel = accountType === type;
                    const overridden = isFixedPriceCategory && type === "individual";
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setAccountType(type)}
                        className={cn(
                          "flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all",
                          isSel
                            ? "border-primary bg-primary/5 shadow-soft"
                            : "border-border hover:border-primary/40",
                          overridden && "opacity-60",
                        )}
                      >
                        <div
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl",
                            isSel
                              ? "bg-gradient-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground",
                          )}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold">{t(`billing.${type}`)}</div>
                          <div className="text-xs text-muted-foreground">
                            {overridden ? (
                              <span className="line-through">${POST_COST[type]}</span>
                            ) : (
                              <>${POST_COST[type]}</>
                            )}{" "}
                            {t("billing.per_post")}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {isFixedPriceCategory && (
                  <div className="mt-3 flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-xs">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span className="text-foreground/80">
                      {t("billing.fixed_price_notice")
                        .replace("{category}", t(`cat.${category}`))
                        .replace("{price}", String(fixedPrice))}
                    </span>
                  </div>
                )}
              </Field>

              <Field label={t("post.field.title")}>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Sunny 2BR loft in Brooklyn"
                  className="input"
                />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t("post.field.price")}>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    placeholder="0"
                    className="input"
                  />
                </Field>
                <Field label={t("post.field.location")}>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, State"
                    className="input"
                  />
                </Field>
              </div>
              <Field label={t("post.field.description")}>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Describe your listing in detail..."
                  className="input resize-none"
                />
              </Field>
            </div>
          )}

          {step === 3 && (
            <>
              <h2 className="text-lg font-bold">{t("post.upload")}</h2>
              <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 p-10 text-center transition-colors hover:border-primary/60 hover:bg-primary/5">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="mt-3 text-sm font-medium">{t("post.upload")}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("post.upload_hint")}</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
              {photos.length > 0 && (
                <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4">
                  {photos.map((p, i) => (
                    <div
                      key={i}
                      className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
                    >
                      <img src={p} alt="" className="h-full w-full object-cover" />
                      <button
                        onClick={() => setPhotos(photos.filter((_, idx) => idx !== i))}
                        className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background/90 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {photos.length < 10 && (
                    <label className="flex aspect-square cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-border hover:border-primary/60">
                      <ImagePlus className="h-6 w-6 text-muted-foreground" />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleFiles(e.target.files)}
                      />
                    </label>
                  )}
                </div>
              )}
            </>
          )}

          {step === 4 && (
            <>
              <h2 className="text-lg font-bold">Preview</h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-background">
                {photos[0] && (
                  <img src={photos[0]} alt="" className="aspect-[4/3] w-full object-cover" />
                )}
                <div className="p-5">
                  <div className="text-xs font-semibold uppercase tracking-wide text-primary">
                    {category ? t(`cat.${category}`) : ""}
                  </div>
                  <h3 className="mt-1 text-xl font-bold">{title || "Your title"}</h3>
                  <div className="mt-2 text-2xl font-extrabold text-gradient-primary">
                    ${price ? Number(price).toLocaleString("en-US") : "0"}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{location || "Location"}</p>
                  <p className="mt-3 text-sm">
                    {description || "Your description will appear here."}
                  </p>
                </div>
              </div>

              {/* Cost / balance summary */}
              <div
                className={cn(
                  "mt-5 rounded-2xl border-2 p-4",
                  canAfford
                    ? "border-primary/30 bg-primary/5"
                    : "border-destructive/40 bg-destructive/5",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-xl",
                      canAfford
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "bg-destructive/10 text-destructive",
                    )}
                  >
                    {canAfford ? (
                      <Wallet className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">
                      {canAfford ? t("balance.cost_to_post") : t("balance.insufficient")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {canAfford
                        ? `$${postCost.toFixed(2)} (${t(`billing.${accountType}`)}) · ${t("balance.your_balance")}: $${balance.toFixed(2)}`
                        : `${t("balance.need_to_topup")} ${t("balance.your_balance")}: $${balance.toFixed(2)} / $${postCost.toFixed(2)}`}
                    </div>
                  </div>
                  {!canAfford && (
                    <TopUpDialog
                      trigger={
                        <Button size="sm" className="rounded-full bg-gradient-primary shadow-glow">
                          {t("balance.topup")}
                        </Button>
                      }
                    />
                  )}
                </div>
              </div>
            </>
          )}

          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              {t("action.back")}
            </Button>
            {step < 4 ? (
              <Button
                disabled={!canNext}
                onClick={() => setStep((s) => s + 1)}
                className="rounded-full bg-gradient-primary px-6 shadow-glow disabled:opacity-50"
              >
                {t("action.next")}
              </Button>
            ) : (
              <Button
                onClick={handlePublish}
                disabled={!canAfford}
                className="rounded-full bg-gradient-primary px-6 shadow-glow disabled:opacity-50"
              >
                {t("action.publish")} · ${postCost.toFixed(2)}
              </Button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
