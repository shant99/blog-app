import React, { ReactNode } from "react";

import { notFound } from "next/navigation";
import getAuthUserId from "@/actions/authActions/getAuthUserId";
import { getMemberByUserId } from "@/actions/membersActions/getMemberByUserId";
import MemberSidebar from "@/components/shared/MemberSidebar";

export default async function Layout({ children }: { children: ReactNode }) {
  const userId = await getAuthUserId();

  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  const basePath = `/members/edit`;

  const navLinks = [
    { name: "Edit Profile", href: `${basePath}` },
    {
      name: "Update Photos",
      href: `${basePath}/photos`,
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh]">
      <div className="col-span-3">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className="col-span-9">
        <div className="w-full mt-10 h-[80vh]">{children}</div>
      </div>
    </div>
  );
}
