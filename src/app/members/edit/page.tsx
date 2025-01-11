import { Divider } from "@nextui-org/react";
import React from "react";

import { notFound } from "next/navigation";
import getAuthUserId from "@/actions/authActions/getAuthUserId";
import { getMemberByUserId } from "@/actions/membersActions/getMemberByUserId";
import EditForm from "./EditForm";

export default async function MemberEditPage() {
  const userId = await getAuthUserId();

  const member = await getMemberByUserId(userId);

  if (!member) return notFound();
  return (
    <>
      <div className="text-2xl font-semibold text-default">Edit Profile</div>
      <Divider />
      <div>
        <EditForm member={member} />
      </div>
    </>
  );
}
