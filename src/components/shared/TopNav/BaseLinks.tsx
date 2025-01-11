"use client";

import { getLinks } from "@/constants/navLink";
import { useTranslations } from "next-intl";
import NavLink from "../NavLink";
import useMessageStore from "@/store/useMessageStore";

export default function BaseLinks() {
  const t = useTranslations();
  const baseLinks = getLinks(t);
  const unreadCount = useMessageStore((state) => state.unreadCount);

  return baseLinks.map(({ label, href }) => {
    return (
      <div key={label} className="flex items-center relative">
        <NavLink href={href} label={label} />
        {href === "/messages" ? (
          <p
            style={{
              color: "white",
              position: "absolute",
              top: "-10px",
              right: "-10px",
            }}
          >
            {unreadCount}
          </p>
        ) : null}
      </div>
    );
  });
}
