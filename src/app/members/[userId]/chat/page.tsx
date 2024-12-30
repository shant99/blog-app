"use server";

import CardInnerWrapper from "@/components/shared/CardInnerWrapper";
import React from "react";
import ChatForm from "./ChatForm";
import getAuthUserId from "@/actions/authActions/getAuthUserId";
import getMessageThread from "@/actions/messageActions/getMessageThread";
import MessageBox from "@/components/shared/MessageBox";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId: userIdParam } = await params;
  const messages = await getMessageThread(userIdParam);
  const userId = await getAuthUserId();
  const body = (
    <div>
      {messages.length === 0 ? (
        "No messages to display"
      ) : (
        <div>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={userId}
            />
          ))}
        </div>
      )}
    </div>
  );
  return (
    <>
      <CardInnerWrapper header="Chat" body={body} footer={<ChatForm />} />
    </>
  );
}
