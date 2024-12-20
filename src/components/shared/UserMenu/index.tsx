"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

type Props = {
  userInfo: {
    name: string | null;
    image: string | null;
  } | null;
};

export default function UserMenu({ userInfo }: Props) {
  const t = useTranslations();

  return (
    <Dropdown placement="bottom-end" style={{ color: "black" }}>
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="default"
          name={userInfo?.name || "user avatar"}
          size="sm"
          src={userInfo?.image || "/images/user.png"}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem
            isReadOnly
            as="span"
            className="h-14 flex flex-row"
            aria-label="username"
          >
            {t("user_profile.signed_in")} {userInfo?.name}
          </DropdownItem>
        </DropdownSection>
        <DropdownItem as={Link} href="/members/edit">
          {t("user_profile.edit_profile")}
        </DropdownItem>
        <DropdownItem
          color="danger"
          onClick={async () => signOut({ redirectTo: "/login" })}
        >
          {t("navLinks.logout")}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
