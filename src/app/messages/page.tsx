"use server";

import { getMessagesByContainer } from "@/actions/messageActions/getMessagesByContainer";
import MessageSidebar from "@/components/shared/MessageSidebar";
import MessageTable from "@/components/shared/MessageTable";
import React from "react";

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ container: string }>;
}) {
  const { container } = await searchParams;
  const { messages, nextCursor } = await getMessagesByContainer(container);

  return (
    <div className="grid grid-cols-12 gap-5 h-[80vh] mt-10">
      <div className="col-span-2">
        <MessageSidebar />
      </div>
      <div className="col-span-10">
        <MessageTable initialMessages={messages} nextCursor={nextCursor} />
      </div>
    </div>
  );
}
