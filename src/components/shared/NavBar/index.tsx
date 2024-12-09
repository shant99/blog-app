"use client";

import { Button, Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { getAuthLinks, getLinks } from "@/constants/navLink";
import { navbarItemClasses } from "./helpers";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import UserMenu from "../UserMenu";
import NavLink from "../NavLink";
import Link from "next/link";
import AnimatedComponent from "@/components/animations/AnimatedComponent";
import "./styles.css";

export default function TopNav() {
  const t = useTranslations();
  const baseLinks = getLinks(t);
  const authLinks = getAuthLinks(t);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <header className="header" style={{ height: "64px" }}></header>;
  }

  return (
    <header className="header">
      <Navbar
        maxWidth="full"
        className="navbar"
        classNames={{
          item: navbarItemClasses,
        }}
      >
        <AnimatedComponent
          component={NavbarBrand}
          className="navbar-brand"
          as={Link}
          href="/"
        >
          <span>Blog</span>
        </AnimatedComponent>

        {session ? (
          <AnimatedComponent
            component={NavbarContent}
            justify="center"
            className="flex justify-center gap-4"
          >
            {baseLinks.map(({ label, href }) => (
              <NavLink key={label} href={href} label={label} />
            ))}

            <UserMenu user={session?.user} />
          </AnimatedComponent>
        ) : (
          <AnimatedComponent component={NavbarContent} justify="end">
            {authLinks.map(({ label, href }) => (
              <Button
                key={label}
                as={Link}
                href={href}
                variant="bordered"
                className="text-[var(--white)]"
              >
                {label}
              </Button>
            ))}
          </AnimatedComponent>
        )}
      </Navbar>
    </header>
  );
}
