const intentConfig = {
  promo: {
    icon: "⚡",
    eyebrow: "Limited offer",
    headline: "Boost your listing",
    body: "Get 5× more views in 24 h with a Featured badge.",
    badge: "50% off today",
    accent: {
      blob: "bg-amber-400",
      badge: "bg-amber-500 text-white",
      icon: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
      strip: "from-amber-500/10",
    },
  },
  trust: {
    icon: "🛡️",
    eyebrow: "Buyer protection",
    headline: "Shop with confidence",
    body: "Every purchase is covered by our ListZona Guarantee.",
    badge: "100% secure",
    accent: {
      blob: "bg-emerald-400",
      badge: "bg-emerald-500 text-white",
      icon: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
      strip: "from-emerald-500/10",
    },
  },
  referral: {
    icon: "🎁",
    eyebrow: "Refer & earn",
    headline: "Invite friends, earn credit",
    body: "Give $10, get $10 for every friend who joins.",
    badge: "No limit",
    accent: {
      blob: "bg-rose-400",
      badge: "bg-rose-500 text-white",
      icon: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
      strip: "from-rose-500/10",
    },
  },
  download: {
    icon: "📱",
    eyebrow: "Mobile app",
    headline: "Sell on the go",
    body: "List items in 30 s with the iOS & Android app.",
    badge: "Free",
    accent: {
      blob: "bg-sky-400",
      badge: "bg-sky-500 text-white",
      icon: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
      strip: "from-sky-500/10",
    },
  },
} as const;

export { intentConfig };
