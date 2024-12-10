import { getMemberByUserId } from "@/actions/members/getMemberByUserId";
import { CardBody, CardHeader, Divider } from "@nextui-org/react";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

export default async function MemberDetailedPage({
  params,
}: {
  params: { userId: string };
}) {
  const { userId } = params;
  const member = await getMemberByUserId(userId);
  const t = (await getMessages()) || {};

  if (!member) return notFound();

  return (
    <>
      <CardHeader className="text-2xl font-semibold text-default">
        {t.user_profile.profile}
      </CardHeader>
      <Divider />
      <CardBody>{member.description || "No description"}</CardBody>
    </>
  );
}
