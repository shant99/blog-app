"use client";

import { getLinks } from "@/constants/navLink";
import { useTranslations } from "next-intl";
import NavLink from "../NavLink";

export default function BaseLinks() {
  const t = useTranslations();
  const baseLinks = getLinks(t);

  return baseLinks.map(({ label, href }) => (
    <NavLink key={label} href={href} label={label} />
  ));
}
