import { useApp } from "@/contexts/AppContext";
import listZonaLogo from "@/assets/listzona-logo.png";

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="mt-20 border-t border-border/60 bg-gradient-soft">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <img src={listZonaLogo} alt="ListZona" className="h-12 w-auto object-contain" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{t("footer.tagline")}</p>
          </div>
          {[
            { title: "Company", links: [t("footer.about"), "Careers", "Press"] },
            { title: "Support", links: [t("footer.help"), t("footer.safety"), "Contact"] },
            { title: "Legal", links: [t("footer.terms"), t("footer.privacy"), "Cookies"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold">{col.title}</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-foreground">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} ListZona Marketplace, Inc.</span>
          <span>Made with ♥ in San Francisco</span>
        </div>
      </div>
    </footer>
  );
}
