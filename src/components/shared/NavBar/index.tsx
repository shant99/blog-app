"use client";
import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import Link from "next/link";
import NavLink from "../NavLink";
import "./styles.css";
import { getAuthLinks, getLinks } from "@/constants/navLink";
import { navbarItemClasses } from "./helpers";
import { useTranslations } from "next-intl";

export default function TopNav() {
  const t = useTranslations();
  const baseLinks = getLinks(t);
  const authLinks = getAuthLinks(t);
  return (
    <Navbar
      maxWidth="full"
      className="navbar"
      classNames={{
        item: navbarItemClasses,
      }}
    >
      <NavbarBrand className="navbar-brand" as={Link} href="/">
        <span>Blog</span>
      </NavbarBrand>

      <NavbarContent justify="center">
        {baseLinks.map(({ label, href }) => (
          <NavLink key={label} href={href} label={label} />
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {authLinks.map(({ label, href }) => (
          <Button
            key={label}
            as={Link}
            href={href}
            variant="bordered"
            className="text-white"
          >
            {label}
          </Button>
        ))}
      </NavbarContent>
    </Navbar>
  );
}
