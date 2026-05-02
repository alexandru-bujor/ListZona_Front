import { Link } from "react-router-dom";
import { Bell, BadgeCheck, CreditCard, Heart, MessageCircle, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/Footer";

const notifications = [
  {
    id: 1,
    title: "New message from Alex Morgan",
    body: "Asked if the truck trailer is still available.",
    time: "2 min ago",
    icon: MessageCircle,
  },
  {
    id: 2,
    title: "Listing approved",
    body: "Your housing listing is now live on ListZona.",
    time: "18 min ago",
    icon: BadgeCheck,
  },
  {
    id: 3,
    title: "Balance updated",
    body: "$20 were added to your posting balance.",
    time: "1 hour ago",
    icon: CreditCard,
  },
  {
    id: 4,
    title: "Saved by a buyer",
    body: "Someone saved your heavy equipment listing.",
    time: "Today",
    icon: Heart,
  },
  {
    id: 5,
    title: "Safety reminder",
    body: "Meet in public places and confirm payment before delivery.",
    time: "Today",
    icon: ShieldCheck,
  },
] as const;

export default function NotificationsPage() {
  return (
    <>
      <section className="border-b border-border/60 bg-gradient-soft">
        <div className="container mx-auto flex items-center gap-3 px-4 py-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
            <Bell className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Updates about leads, listings, payments, and safety alerts.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-6">
        <div className="space-y-3">
          {notifications.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.id}
                className="flex items-start gap-4 rounded-3xl border border-border/60 bg-card p-5 shadow-soft transition-colors hover:bg-accent/30"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-base font-semibold">{item.title}</h2>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{item.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </>
  );
}
