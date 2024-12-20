"use server";

import fetchCurrentUserLikeIds from "@/actions/likeActions/fetchCurrentUserLikeIds";
import { getMembers } from "@/actions/membersActions/getMembers";
import MemberCard from "@/components/shared/MembersCard";
// import { getMessages } from "next-intl/server";

export default async function MembersPage() {
  // const t = await getMessages();
  const members = await getMembers();
  const total = members?.length || 0;
  const likeIds = await fetchCurrentUserLikeIds();

  return (
    <div>
      {members && <h2>Total: {total}</h2>}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 max-w-[1200px]">
        {members &&
          members.map((member) => (
            <MemberCard member={member} key={member.id} likeIds={likeIds} />
          ))}
      </div>
    </div>
  );
}
