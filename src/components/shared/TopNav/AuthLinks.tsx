"use client";

import { getAuthLinks } from "@/constants/navLink";
import { useTranslations } from "next-intl";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default function AuthLinks() {
  const t = useTranslations();
  const authLinks = getAuthLinks(t);

  return authLinks.map(({ label, href }) => (
    <Button
      key={label}
      as={Link}
      href={href}
      variant="bordered"
      className="text-[var(--white)]"
      prefetch={false}
    >
      {label}
    </Button>
  ));
}
