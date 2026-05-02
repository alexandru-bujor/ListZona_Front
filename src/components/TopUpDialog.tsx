import { useState } from "react";
import { Wallet, Check, CreditCard, Sparkles } from "lucide-react";
import { useApp, TOPUP_PACKAGES } from "@/contexts/AppContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (o: boolean) => void;
};

export function TopUpDialog({ trigger, open, onOpenChange }: Props) {
  const { t, balance, topUp } = useApp();
  const [selected, setSelected] = useState<number>(20);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      topUp(selected);
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onOpenChange?.(false);
      }, 1400);
    }, 700);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" /> {t("balance.add_funds")}
          </DialogTitle>
          <DialogDescription>{t("balance.mock_notice")}</DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex flex-col items-center py-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary shadow-glow">
              <Check className="h-8 w-8 text-primary-foreground" strokeWidth={3} />
            </div>
            <p className="text-lg font-bold">+${selected} added</p>
            <p className="mt-1 text-sm text-muted-foreground">New balance: ${balance.toFixed(2)}</p>
          </div>
        ) : (
          <>
            <div className="rounded-2xl bg-gradient-soft p-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {t("balance.your_balance")}
              </p>
              <p className="mt-1 text-3xl font-extrabold text-gradient-primary">
                ${balance.toFixed(2)}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold">{t("balance.choose_package")}</p>
              <div className="grid grid-cols-3 gap-2">
                {TOPUP_PACKAGES.map((amt) => {
                  const isSel = selected === amt;
                  return (
                    <button
                      key={amt}
                      onClick={() => setSelected(amt)}
                      className={cn(
                        "relative flex flex-col items-center justify-center rounded-2xl border-2 px-3 py-4 transition-all",
                        isSel
                          ? "border-primary bg-primary/5 shadow-soft"
                          : "border-border hover:border-primary/40",
                      )}
                    >
                      {amt === 20 && (
                        <span className="absolute -top-2 right-2 flex items-center gap-0.5 rounded-full bg-gradient-primary px-2 py-0.5 text-[9px] font-bold uppercase text-primary-foreground shadow-glow">
                          <Sparkles className="h-2.5 w-2.5" /> Popular
                        </span>
                      )}
                      <span className="text-2xl font-extrabold">${amt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={loading}
              className="w-full rounded-full bg-gradient-primary shadow-glow"
              size="lg"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {loading ? "Processing..." : `Add $${selected}`}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
