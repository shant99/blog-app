"use server";

import fetchCurrentUserLikeIds from "@/actions/likeActions/fetchCurrentUserLikeIds";
import { getMembers } from "@/actions/membersActions/getMembers";
import MemberCard from "@/components/shared/MembersCard";
import PaginationComponent from "@/components/shared/PaginationComponent";
import { GetMemberParams } from "@/types";

// import { getMessages } from "next-intl/server";

export default async function MembersPage({
  searchParams,
}: {
  searchParams: Promise<GetMemberParams>;
}) {
  // const t = await getMessages();
  const searchQuery = await searchParams;
  const { items: members, totalCount } = await getMembers(searchQuery);
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
      <div className="flex justify-center mt-10">
        <PaginationComponent totalCount={totalCount} />
      </div>
    </div>
  );
}
