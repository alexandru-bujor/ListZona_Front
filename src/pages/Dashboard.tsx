import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Package,
  Heart,
  MessageCircle,
  Settings,
  Plus,
  Send,
  MoreHorizontal,
  Wallet,
  User,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { LISTINGS } from "@/lib/mock-data";
import { useApp, POST_COST, type AccountType } from "@/contexts/AppContext";
import { ListingCard } from "@/components/ListingCard";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { TopUpDialog } from "@/components/TopUpDialog";
import { cn } from "@/lib/utils";

type Tab = "listings" | "saved" | "messages" | "billing" | "settings";

export default function Dashboard() {
  const { t, saved, balance } = useApp();
  const [tab, setTab] = useState<Tab>("listings");

  const myListings = LISTINGS.slice(0, 3);
  const savedListings = LISTINGS.filter((l) => saved.has(l.id));

  const tabs: { id: Tab; label: string; icon: typeof Package; count?: number }[] = [
    { id: "listings", label: t("dash.my_listings"), icon: Package, count: myListings.length },
    { id: "saved", label: t("dash.saved"), icon: Heart, count: savedListings.length },
    { id: "messages", label: t("dash.messages"), icon: MessageCircle, count: 3 },
    { id: "billing", label: t("billing.tab"), icon: Wallet },
    { id: "settings", label: t("dash.settings"), icon: Settings },
  ];

  return (
    <>
      <div className="border-b border-border/60 bg-gradient-soft">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <img
              src="https://i.pravatar.cc/100?img=15"
              alt=""
              className="h-16 w-16 rounded-full ring-2 ring-primary/20"
            />
            <div>
              <p className="text-sm text-muted-foreground">{t("dash.welcome")}</p>
              <h1 className="text-2xl font-bold">Sam Anderson</h1>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <TopUpDialog
                trigger={
                  <button className="hidden items-center gap-2 rounded-full border border-border/60 bg-card/80 px-4 py-2 text-sm font-semibold backdrop-blur transition-all hover:border-primary/40 hover:shadow-soft sm:flex">
                    <Wallet className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{t("balance.label")}:</span>
                    <span className="tabular-nums text-foreground">${balance.toFixed(2)}</span>
                  </button>
                }
              />
              <Link to="/post" className="hidden sm:block">
                <Button className="rounded-full bg-gradient-primary shadow-glow">
                  <Plus className="mr-1.5 h-4 w-4" /> {t("nav.post_ad")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid gap-6 px-4 py-6 lg:grid-cols-[240px_1fr]">
        <aside>
          <nav className="rounded-2xl border border-border/60 bg-card p-2 shadow-soft">
            {tabs.map((tb) => {
              const Icon = tb.icon;
              const active = tab === tb.id;
              return (
                <button
                  key={tb.id}
                  onClick={() => setTab(tb.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-accent",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tb.label}</span>
                  {tb.count !== undefined && (
                    <span
                      className={cn(
                        "ml-auto rounded-full px-2 py-0.5 text-[10px] font-bold",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {tb.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        <div>
          {tab === "listings" && (
            <Section title={t("dash.my_listings")}>
              {myListings.length === 0 ? (
                <EmptyState label={t("dash.empty")} />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {myListings.map((l) => (
                    <ListingCard key={l.id} listing={l} />
                  ))}
                </div>
              )}
            </Section>
          )}

          {tab === "saved" && (
            <Section title={t("dash.saved")}>
              {savedListings.length === 0 ? (
                <EmptyState label="Tap the heart on any listing to save it here." />
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {savedListings.map((l) => (
                    <ListingCard key={l.id} listing={l} />
                  ))}
                </div>
              )}
            </Section>
          )}

          {tab === "messages" && <MessagesUI />}

          {tab === "billing" && <BillingUI />}

          {tab === "settings" && (
            <Section title={t("dash.settings")}>
              <div className="space-y-4 rounded-2xl border border-border/60 bg-card p-6 shadow-soft">
                {[
                  { label: "Display name", value: "Sam Anderson" },
                  { label: "Email", value: "sam@example.com" },
                  { label: "Phone", value: "+1 (415) 555-0123" },
                  { label: "Location", value: "San Francisco, CA" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="text-xs font-semibold text-muted-foreground">{f.label}</label>
                    <input defaultValue={f.value} className="input mt-1" />
                  </div>
                ))}
                <Button className="rounded-full bg-gradient-primary shadow-glow">
                  Save changes
                </Button>
              </div>
            </Section>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">{title}</h2>
      {children}
    </div>
  );
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-card/50 p-16 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Package className="h-7 w-7 text-muted-foreground" />
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function MessagesUI() {
  const conversations = [
    {
      id: 1,
      name: "Alex Morgan",
      avatar: "https://i.pravatar.cc/100?img=12",
      last: "Yes, still available!",
      time: "2m",
      unread: 2,
    },
    {
      id: 2,
      name: "Priya Patel",
      avatar: "https://i.pravatar.cc/100?img=47",
      last: "Could you do $1,800?",
      time: "1h",
      unread: 0,
    },
    {
      id: 3,
      name: "Marco Rossi",
      avatar: "https://i.pravatar.cc/100?img=33",
      last: "Thanks!",
      time: "Yesterday",
      unread: 0,
    },
  ];
  const [active, setActive] = useState(conversations[0]);

  return (
    <div className="grid h-[600px] grid-cols-1 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft sm:grid-cols-[280px_1fr]">
      <div className="border-r border-border/60">
        <div className="border-b border-border/60 p-4">
          <h3 className="font-bold">Inbox</h3>
        </div>
        <div className="divide-y divide-border/60">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c)}
              className={cn(
                "flex w-full items-center gap-3 p-3 text-left transition-colors",
                active.id === c.id ? "bg-accent" : "hover:bg-accent/50",
              )}
            >
              <img src={c.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{c.name}</span>
                  <span className="text-[10px] text-muted-foreground">{c.time}</span>
                </div>
                <p className="line-clamp-1 text-xs text-muted-foreground">{c.last}</p>
              </div>
              {c.unread > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="hidden flex-col sm:flex">
        <div className="flex items-center justify-between border-b border-border/60 p-4">
          <div className="flex items-center gap-3">
            <img src={active.avatar} alt="" className="h-9 w-9 rounded-full object-cover" />
            <div>
              <div className="text-sm font-semibold">{active.name}</div>
              <div className="text-[10px] text-muted-foreground">Online now</div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
          <Bubble side="them">Hi! Is this still available?</Bubble>
          <Bubble side="me">Yes, still available! When would you like to come see it?</Bubble>
          <Bubble side="them">Tomorrow afternoon? Around 3pm?</Bubble>
          <Bubble side="me">Sounds great. I'll send the address.</Bubble>
        </div>
        <div className="flex items-center gap-2 border-t border-border/60 p-3">
          <input placeholder="Type a message..." className="input flex-1" />
          <Button size="icon" className="rounded-full bg-gradient-primary shadow-glow">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function Bubble({ side, children }: { side: "me" | "them"; children: React.ReactNode }) {
  return (
    <div className={cn("flex", side === "me" ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-4 py-2 text-sm",
          side === "me" ? "bg-gradient-primary text-primary-foreground shadow-glow" : "bg-card",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function BillingUI() {
  const { t, balance, accountType, setAccountType } = useApp();

  const mockHistory = [
    { type: "topup" as const, label: t("balance.add_funds"), amount: 20, time: "2h ago" },
    { type: "charge" as const, label: t("post.title"), amount: -5, time: "1d ago" },
    { type: "topup" as const, label: t("balance.add_funds"), amount: 50, time: "3d ago" },
    { type: "charge" as const, label: t("post.title"), amount: -30, time: "5d ago" },
  ];
  const visibleHistory = balance > 0 ? mockHistory : [];

  return (
    <Section title={t("billing.tab")}>
      <div className="space-y-5">
        {/* Balance hero card */}
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-primary p-6 text-primary-foreground shadow-glow sm:p-8">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary-foreground/80">
                <Wallet className="h-3.5 w-3.5" /> {t("balance.your_balance")}
              </div>
              <div className="mt-2 text-5xl font-extrabold tabular-nums">${balance.toFixed(2)}</div>
              <p className="mt-2 text-xs text-primary-foreground/80">{t("balance.mock_notice")}</p>
            </div>
            <TopUpDialog
              trigger={
                <Button
                  size="lg"
                  variant="secondary"
                  className="rounded-full font-semibold shadow-soft"
                >
                  <Plus className="mr-1.5 h-4 w-4" /> {t("balance.topup")}
                </Button>
              }
            />
          </div>
        </div>

        {/* Account type */}
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft sm:p-6">
          <h3 className="text-sm font-bold">{t("billing.account_type")}</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Cost per listing depends on your account type.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["individual", "business"] as AccountType[]).map((type) => {
              const Icon = type === "individual" ? User : Building2;
              const isSel = accountType === type;
              return (
                <button
                  key={type}
                  onClick={() => setAccountType(type)}
                  className={cn(
                    "flex items-center gap-4 rounded-2xl border-2 p-4 text-left transition-all",
                    isSel
                      ? "border-primary bg-primary/5 shadow-soft"
                      : "border-border hover:border-primary/40",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl",
                      isSel
                        ? "bg-gradient-primary text-primary-foreground shadow-glow"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{t(`billing.${type}`)}</div>
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold text-gradient-primary">
                        ${POST_COST[type]}
                      </span>{" "}
                      {t("billing.per_post")}
                    </div>
                  </div>
                  {isSel && (
                    <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                      ACTIVE
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* History */}
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-soft sm:p-6">
          <h3 className="text-sm font-bold">{t("billing.history")}</h3>
          {visibleHistory.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">{t("billing.no_history")}</p>
          ) : (
            <ul className="mt-4 divide-y divide-border/60">
              {visibleHistory.map((h, i) => (
                <li key={i} className="flex items-center gap-3 py-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full",
                      h.type === "topup"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {h.type === "topup" ? (
                      <ArrowDownRight className="h-4 w-4" />
                    ) : (
                      <ArrowUpRight className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold">{h.label}</div>
                    <div className="text-xs text-muted-foreground">{h.time}</div>
                  </div>
                  <div
                    className={cn(
                      "text-sm font-bold tabular-nums",
                      h.amount > 0 ? "text-primary" : "text-foreground",
                    )}
                  >
                    {h.amount > 0 ? "+" : ""}${Math.abs(h.amount).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Section>
  );
}
