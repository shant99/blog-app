"use server";

import { Navbar, NavbarBrand, NavbarContent } from "@nextui-org/react";
import { navbarItemClasses } from "./helpers";
import UserMenu from "../UserMenu";
import Link from "next/link";
import BaseLinks from "./BaseLinks";
import AuthLinks from "./AuthLinks";
import { getUserInfoForNav } from "@/actions/userActions/getUserInfoForNav";
import { auth } from "@/auth";
import FiltersWrapper from "../Filters/FiltersWrapper";

export default async function TopNav() {
  const session = await auth();
  const userInfo = session?.user && (await getUserInfoForNav());

  return (
    <header className="header">
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

        {session ? (
          <NavbarContent justify="center" className="flex justify-center gap-4">
            <BaseLinks />
            {userInfo && <UserMenu userInfo={userInfo} />}
          </NavbarContent>
        ) : (
          <NavbarContent justify="end">
            <AuthLinks />
          </NavbarContent>
        )}
      </Navbar>
      <FiltersWrapper />
    </header>
  );
}
