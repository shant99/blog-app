import { getMemberByUserId } from "@/actions/membersActions/getMemberByUserId";
import { Divider } from "@nextui-org/react";
// import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

export default async function MemberDetailedPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const member = await getMemberByUserId(userId);
  // const t = (await getMessages()) || {};

  if (!member) return notFound();

  return (
    <>
      <div className="text-2xl font-semibold text-default">Profile</div>
      <Divider />
      <div>{member.description || "No description"}</div>
    </>
  );
}
