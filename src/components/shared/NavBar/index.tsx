"use client";

import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { getAuthLinks, getLinks } from "@/constants/navLink";
import { navbarItemClasses } from "./helpers";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import UserMenu from "../UserMenu";
import NavLink from "../NavLink";
import Link from "next/link";
import "./styles.css";

export default function TopNav() {
  const t = useTranslations();
  const baseLinks = getLinks(t);
  const authLinks = getAuthLinks(t);
  const session = useSession();

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

      {session?.status === "loading" ? null : session?.data ? (
        <>
          <NavbarContent justify="center">
            {baseLinks.map(({ label, href }) => (
              <NavLink key={label} href={href} label={label} />
            ))}
          </NavbarContent>
          <UserMenu user={session?.data?.user} />
        </>
      ) : (
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
      )}
    </Navbar>
  );
}
