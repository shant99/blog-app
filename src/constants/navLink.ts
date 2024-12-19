import { TranslationFunction } from "@/types/global";

export const getLinks = (t: TranslationFunction) => [
  { label: t("navLinks.members"), href: "/members" },
  { label: t("navLinks.likes"), href: "/likes" },
  { label: t("navLinks.messages"), href: "/messages" },
];

export const getAuthLinks = (t: TranslationFunction) => [
  { label: t("navLinks.login"), href: "/login" },
  { label: t("navLinks.register"), href: "/register" },
];
