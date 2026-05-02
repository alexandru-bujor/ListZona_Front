import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { Lang, translate } from "@/lib/i18n";

type Theme = "light" | "dark";
export type AccountType = "individual" | "business";

export const POST_COST: Record<AccountType, number> = {
  individual: 5,
  business: 30,
};

// Categories with a fixed flat price that overrides the account-type rate.
// e.g. Jobs $30 (employers), Housing $40 (landlords / agents).
export const CATEGORY_FIXED_PRICE: Record<string, number> = {
  jobs: 30,
  housing: 40,
};

export const BUSINESS_ONLY_CATEGORIES = Object.keys(CATEGORY_FIXED_PRICE);

export function getPostCost(accountType: AccountType, category?: string | null): number {
  if (category && category in CATEGORY_FIXED_PRICE) {
    return CATEGORY_FIXED_PRICE[category];
  }
  return POST_COST[accountType];
}

export const TOPUP_PACKAGES = [5, 20, 50] as const;

type AppContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  theme: Theme;
  toggleTheme: () => void;
  saved: Set<string>;
  toggleSaved: (id: string) => void;
  // Balance system
  balance: number;
  accountType: AccountType;
  setAccountType: (a: AccountType) => void;
  topUp: (amount: number) => void;
  charge: (amount: number) => boolean;
  postCost: number;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("light");
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [balance, setBalance] = useState<number>(0);
  const [accountType, setAccountTypeState] = useState<AccountType>("individual");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedLang = (localStorage.getItem("bz_lang") as Lang) || "en";
    const storedTheme = (localStorage.getItem("bz_theme") as Theme) || "light";
    const storedSaved = localStorage.getItem("bz_saved");
    const storedBalance = localStorage.getItem("bz_balance");
    const storedAccount = localStorage.getItem("bz_account") as AccountType | null;
    setLangState(storedLang);
    setTheme(storedTheme);
    if (storedSaved) setSaved(new Set(JSON.parse(storedSaved)));
    if (storedBalance) setBalance(Number(storedBalance) || 0);
    if (storedAccount === "individual" || storedAccount === "business")
      setAccountTypeState(storedAccount);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("bz_theme", theme);
  }, [theme]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("bz_lang", l);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const toggleSaved = useCallback((id: string) => {
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem("bz_saved", JSON.stringify([...next]));
      return next;
    });
  }, []);

  const setAccountType = useCallback((a: AccountType) => {
    setAccountTypeState(a);
    localStorage.setItem("bz_account", a);
  }, []);

  const topUp = useCallback((amount: number) => {
    setBalance((b) => {
      const next = b + amount;
      localStorage.setItem("bz_balance", String(next));
      return next;
    });
  }, []);

  const charge = useCallback((amount: number) => {
    let ok = false;
    setBalance((b) => {
      if (b >= amount) {
        ok = true;
        const next = b - amount;
        localStorage.setItem("bz_balance", String(next));
        return next;
      }
      return b;
    });
    return ok;
  }, []);

  const t = useCallback((key: string) => translate(key, lang), [lang]);

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        t,
        theme,
        toggleTheme,
        saved,
        toggleSaved,
        balance,
        accountType,
        setAccountType,
        topUp,
        charge,
        postCost: POST_COST[accountType],
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
