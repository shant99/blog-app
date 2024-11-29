type TranslationFunction = (key: string) => string;

export const getLinks = (t: TranslationFunction) => [
  { label: t("navLinks.matches"), href: "/matches" },
  { label: t("navLinks.lists"), href: "/lists" },
  { label: t("navLinks.messages"), href: "/messages" },
];

export const getAuthLinks = (t: TranslationFunction) => [
  { label: t("navLinks.login"), href: "/login" },
  { label: t("navLinks.register"), href: "/register" },
];
