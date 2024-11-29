"use client";

import { NavbarItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Props } from "./types";
import "./styles.css";

export default function NavLink({ href, label }: Props) {
  const pathname = usePathname();
  return (
    <NavbarItem
      className="navbar-item"
      isActive={pathname === href}
      as={Link}
      href={href}
    >
      {label}
    </NavbarItem>
  );
}
