import { Link } from "react-router-dom";
import { MoreHorizontal, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";

type Conversation = {
  id: number;
  name: string;
  avatar: string;
  last: string;
  time: string;
  unread: number;
};

const conversations: Conversation[] = [
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

export default function MessagesPage() {
  const [active, setActive] = useState(conversations[0]);

  return (
    <>
      <section className="border-b border-border/60 bg-gradient-soft">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Conversations with buyers, sellers, and leads in one place.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-6">
        <div className="grid h-[calc(100vh-17rem)] min-h-[560px] grid-cols-1 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-soft sm:grid-cols-[320px_1fr]">
          <div className="border-r border-border/60">
            <div className="border-b border-border/60 p-4">
              <h2 className="font-bold">Inbox</h2>
            </div>
            <div className="divide-y divide-border/60">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setActive(conversation)}
                  className={cn(
                    "flex w-full items-center gap-3 p-3 text-left transition-colors",
                    active.id === conversation.id ? "bg-accent" : "hover:bg-accent/50",
                  )}
                >
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold">{conversation.name}</span>
                      <span className="text-[10px] text-muted-foreground">{conversation.time}</span>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">{conversation.last}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
                      {conversation.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="hidden flex-col sm:flex">
            <div className="flex items-center justify-between border-b border-border/60 p-4">
              <div className="flex items-center gap-3">
                <img
                  src={active.avatar}
                  alt={active.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-semibold">{active.name}</div>
                  <div className="text-[10px] text-muted-foreground">Online now</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-muted/30 p-4">
              <Bubble side="them">Hi! Is this still available?</Bubble>
              <Bubble side="me">Yes, still available! When would you like to come see it?</Bubble>
              <Bubble side="them">Tomorrow afternoon? Around 3pm?</Bubble>
              <Bubble side="me">Perfect, I’ll send the address.</Bubble>
            </div>

            <div className="flex items-center gap-2 border-t border-border/60 p-3">
              <input placeholder="Type a message..." className="input flex-1" />
              <Button size="icon" className="rounded-full bg-gradient-primary shadow-glow">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
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
