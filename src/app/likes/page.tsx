"use server";

import fetchCurrentUserLikeIds from "@/actions/likeActions/fetchCurrentUserLikeIds";
import { fetchLikedMembers } from "@/actions/likeActions/fetchLikedMembers";
import LikesTab from "@/components/shared/LikesTab";
import React from "react";

export default async function ListsPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const { type } = await searchParams;
  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(type);

  return (
    <div className="flex w-full flex-col items-center justify-start mt-10 gap-5">
      <LikesTab members={members} likeIds={likeIds} defaultType={type} />
    </div>
  );
}
