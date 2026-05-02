export type Lang = "en" | "ru" | "ro";

export const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "ro", label: "Română", flag: "🇷🇴" },
];

type Dict = Record<string, Record<Lang, string>>;

export const dict: Dict = {
  "nav.home": { en: "Home", ru: "Главная", ro: "Acasă" },
  "nav.search": { en: "Search", ru: "Поиск", ro: "Caută" },
  "nav.post_ad": { en: "Post Ad", ru: "Разместить", ro: "Adaugă" },
  "nav.messages": { en: "Messages", ru: "Сообщения", ro: "Mesaje" },
  "nav.notifications": { en: "Notifications", ru: "Уведомления", ro: "Notificări" },
  "nav.profile": { en: "Profile", ru: "Профиль", ro: "Profil" },
  "nav.dashboard": { en: "Dashboard", ru: "Кабинет", ro: "Panou" },
  "nav.browse": { en: "Browse", ru: "Каталог", ro: "Răsfoiește" },

  "home.title": {
    en: "Find jobs, housing, and services near you",
    ru: "Найди работу, жильё и услуги рядом",
    ro: "Găsește joburi, locuințe și servicii lângă tine",
  },
  "home.subtitle": {
    en: "The modern marketplace for your community. Built for trust, designed for speed.",
    ru: "Современный маркетплейс для вашего сообщества. Доверие и скорость.",
    ro: "Piața modernă pentru comunitatea ta. Construită pentru încredere și viteză.",
  },
  "home.search_placeholder": {
    en: "Search anything...",
    ru: "Введите запрос...",
    ro: "Caută orice...",
  },
  "home.location_placeholder": { en: "City or ZIP", ru: "Город или индекс", ro: "Oraș sau cod" },
  "home.cta": { en: "Search", ru: "Найти", ro: "Caută" },
  "home.featured": { en: "Featured listings", ru: "Рекомендуемые", ro: "Anunțuri recomandate" },
  "home.featured_sub": {
    en: "Hand-picked deals updated every hour",
    ru: "Лучшие предложения, обновляются каждый час",
    ro: "Oferte selectate, actualizate la oră",
  },
  "home.categories": { en: "Browse categories", ru: "Категории", ro: "Categorii" },
  "home.trust": {
    en: "Trusted by 2M+ neighbors",
    ru: "Нам доверяют 2M+ соседей",
    ro: "Avem încrederea a peste 2M de vecini",
  },
  "home.view_all": { en: "View all", ru: "Все", ro: "Vezi tot" },

  "cat.jobs": { en: "Jobs", ru: "Работа", ro: "Joburi" },
  "cat.housing": { en: "Housing", ru: "Жильё", ro: "Locuințe" },
  "cat.cars": { en: "Trucks & Trailers", ru: "Грузовики и прицепы", ro: "Camioane și remorci" },
  "cat.services": { en: "Services", ru: "Услуги", ro: "Servicii" },
  "cat.community": { en: "Community", ru: "Сообщество", ro: "Comunitate" },
  "cat.for_sale": { en: "For Sale", ru: "Продажа", ro: "De vânzare" },

  "listing.price": { en: "Price", ru: "Цена", ro: "Preț" },
  "listing.location": { en: "Location", ru: "Локация", ro: "Locație" },
  "listing.posted": { en: "Posted", ru: "Опубликовано", ro: "Publicat" },
  "listing.description": { en: "Description", ru: "Описание", ro: "Descriere" },
  "listing.related": { en: "Related listings", ru: "Похожие", ro: "Anunțuri similare" },
  "listing.seller": { en: "Seller", ru: "Продавец", ro: "Vânzător" },
  "listing.verified": { en: "Verified", ru: "Проверен", ro: "Verificat" },
  "listing.member_since": { en: "Member since", ru: "С нами с", ro: "Membru din" },

  "action.contact": { en: "Contact", ru: "Связаться", ro: "Contactează" },
  "action.call": { en: "Call", ru: "Позвонить", ro: "Sună" },
  "action.message": { en: "Send message", ru: "Написать", ro: "Trimite mesaj" },
  "action.save": { en: "Save", ru: "Сохранить", ro: "Salvează" },
  "action.share": { en: "Share", ru: "Поделиться", ro: "Distribuie" },
  "action.next": { en: "Next", ru: "Далее", ro: "Continuă" },
  "action.back": { en: "Back", ru: "Назад", ro: "Înapoi" },
  "action.publish": { en: "Publish listing", ru: "Опубликовать", ro: "Publică" },

  "filters.title": { en: "Filters", ru: "Фильтры", ro: "Filtre" },
  "filters.category": { en: "Category", ru: "Категория", ro: "Categorie" },
  "filters.price": { en: "Price range", ru: "Диапазон цен", ro: "Interval preț" },
  "filters.date": { en: "Date posted", ru: "Дата", ro: "Data" },
  "filters.clear": { en: "Clear all", ru: "Сбросить", ro: "Resetează" },
  "filters.sort_newest": { en: "Newest", ru: "Новые", ro: "Cele mai noi" },
  "filters.sort_popular": { en: "Popular", ru: "Популярные", ro: "Populare" },
  "filters.sort_price_low": {
    en: "Price: low to high",
    ru: "Цена: по возрастанию",
    ro: "Preț: crescător",
  },

  "post.title": { en: "Post a new ad", ru: "Создать объявление", ro: "Creează un anunț" },
  "post.step.category": { en: "Category", ru: "Категория", ro: "Categorie" },
  "post.step.details": { en: "Details", ru: "Детали", ro: "Detalii" },
  "post.step.photos": { en: "Photos", ru: "Фото", ro: "Fotografii" },
  "post.step.preview": { en: "Preview", ru: "Превью", ro: "Previzualizare" },
  "post.upload": {
    en: "Drag & drop or click to upload",
    ru: "Перетащите или нажмите",
    ro: "Trage sau apasă pentru a încărca",
  },
  "post.upload_hint": {
    en: "Up to 10 photos · JPG, PNG",
    ru: "До 10 фото · JPG, PNG",
    ro: "Până la 10 poze · JPG, PNG",
  },
  "post.field.title": { en: "Listing title", ru: "Заголовок", ro: "Titlu anunț" },
  "post.field.price": { en: "Price (USD)", ru: "Цена (USD)", ro: "Preț (USD)" },
  "post.field.location": { en: "Location", ru: "Локация", ro: "Locație" },
  "post.field.description": { en: "Description", ru: "Описание", ro: "Descriere" },

  "dash.my_listings": { en: "My listings", ru: "Мои объявления", ro: "Anunțurile mele" },
  "dash.saved": { en: "Saved", ru: "Сохранённые", ro: "Salvate" },
  "dash.messages": { en: "Messages", ru: "Сообщения", ro: "Mesaje" },
  "dash.settings": { en: "Settings", ru: "Настройки", ro: "Setări" },
  "dash.welcome": { en: "Welcome back", ru: "С возвращением", ro: "Bine ai revenit" },
  "dash.empty": { en: "Nothing here yet", ru: "Пока пусто", ro: "Nimic aici încă" },

  "footer.about": { en: "About", ru: "О нас", ro: "Despre" },
  "footer.help": { en: "Help center", ru: "Помощь", ro: "Ajutor" },
  "footer.safety": { en: "Trust & safety", ru: "Безопасность", ro: "Siguranță" },
  "footer.terms": { en: "Terms", ru: "Условия", ro: "Termeni" },
  "footer.privacy": { en: "Privacy", ru: "Конфиденциальность", ro: "Confidențialitate" },
  "footer.tagline": {
    en: "Built for neighbors. Made in the USA.",
    ru: "Создано для соседей. Сделано в США.",
    ro: "Făcut pentru vecini. Made in USA.",
  },

  "balance.label": { en: "Balance", ru: "Баланс", ro: "Sold" },
  "balance.topup": { en: "Top up", ru: "Пополнить", ro: "Reîncarcă" },
  "balance.add_funds": { en: "Add funds", ru: "Пополнить счёт", ro: "Adaugă fonduri" },
  "balance.choose_package": { en: "Choose a package", ru: "Выберите пакет", ro: "Alege un pachet" },
  "balance.your_balance": { en: "Your balance", ru: "Ваш баланс", ro: "Soldul tău" },
  "balance.insufficient": {
    en: "Insufficient balance",
    ru: "Недостаточно средств",
    ro: "Sold insuficient",
  },
  "balance.need_to_topup": {
    en: "You need to top up your balance to publish this listing.",
    ru: "Пополните баланс, чтобы опубликовать объявление.",
    ro: "Trebuie să reîncarci soldul ca să publici anunțul.",
  },
  "balance.cost_to_post": { en: "Cost to post", ru: "Стоимость публикации", ro: "Cost publicare" },
  "balance.charged": {
    en: "charged from your balance",
    ru: "списано с баланса",
    ro: "retras din sold",
  },
  "billing.tab": { en: "Billing", ru: "Оплата", ro: "Plată" },
  "billing.account_type": { en: "Account type", ru: "Тип аккаунта", ro: "Tip de cont" },
  "billing.individual": { en: "Individual", ru: "Физическое лицо", ro: "Persoană fizică" },
  "billing.business": { en: "Business", ru: "Юридическое лицо", ro: "Persoană juridică" },
  "billing.per_post": { en: "per post", ru: "за объявление", ro: "per anunț" },
  "billing.history": { en: "Recent activity", ru: "Последние операции", ro: "Activitate recentă" },
  "billing.no_history": {
    en: "No transactions yet",
    ru: "Транзакций пока нет",
    ro: "Nicio tranzacție încă",
  },
  "billing.mock_notice": {
    en: "Demo mode — payments are simulated, no real charges.",
    ru: "Демо-режим — оплата симулируется, реальных списаний нет.",
    ro: "Mod demo — plățile sunt simulate, fără tranzacții reale.",
  },
  "billing.business_rate": { en: "Business rate", ru: "Бизнес-тариф", ro: "Tarif business" },
  "billing.fixed_price_notice": {
    en: "Posting in {category} always costs ${price} — flat rate for all users, regardless of account type.",
    ru: "Публикация в категории «{category}» всегда стоит ${price} — фиксированная ставка для всех.",
    ro: "Publicarea în categoria «{category}» costă mereu ${price} — tarif fix pentru toți utilizatorii.",
  },
};

export function translate(key: string, lang: Lang): string {
  const entry = dict[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en;
}
