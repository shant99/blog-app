import React, { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Card } from "@nextui-org/react";
import { getMemberByUserId } from "@/actions/membersActions/getMemberByUserId";
import MemberSidebar from "@/components/shared/MemberSidebar";

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: { userId: string };
}) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);
  if (!member) return notFound();

  const basePath = `/members/${member.userId}`;

  const navLinks = [
    { name: "Profile", href: `${basePath}` },
    {
      name: "Photos",
      href: `${basePath}/photos`,
    },
    { name: "Chat", href: `${basePath}/chat` },
  ];

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] max-w-[1350px]">
      <div className="col-span-3">
        <MemberSidebar member={member} navLinks={navLinks} />
      </div>
      <div className="col-span-9 w-full ">
        <Card className="w-full mt-10 min-h-[80vh]">{children}</Card>
      </div>
    </div>
  );
}
