"use client";

import { MessageDto } from "@/types";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { pusherClient } from "@/lib/pusher";
import MessageBox from "@/components/shared/MessageBox";
import formatShortDateTime from "@/utils/dates/formatShortDateTime";
import useMessageStore from "@/store/useMessageStore";

type Props = {
  initialMessages: {
    messages: MessageDto[];
    readCount: number;
  };
  currentUserId: string;
  chatId: string;
};

export default function MessageList({
  initialMessages,
  currentUserId,
  chatId,
}: Props) {
  const [messages, setMessages] = useState(initialMessages.messages);
  const setReadCount = useRef(false);
  const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);

  useEffect(() => {
    if (!setReadCount.current) {
      updateUnreadCount(-initialMessages.readCount);
      setReadCount.current = true;
    }
  }, [initialMessages, updateUnreadCount]);

  const handleNewMessage = useCallback(
    (message: MessageDto) => {
      setMessages((prevState) => {
        return [...prevState, message];
      });
    },
    [initialMessages]
  );

  const handleReadMessages = useCallback(
    (messageIds: string[]) => {
      setMessages((prevState) =>
        prevState.map((message) => {
          return messageIds.includes(message.id)
            ? {
                ...message,
                dateRead: formatShortDateTime(new Date()),
              }
            : message;
        })
      );
    },
    [initialMessages]
  );

  useEffect(() => {
    const channel = pusherClient.subscribe(chatId);
    channel.bind("message:new", handleNewMessage);
    channel.bind("messages:read", handleReadMessages);

    return () => {
      channel.unsubscribe();
      channel.unbind("message:new", handleNewMessage);
      channel.unbind("messages:read", handleReadMessages);
    };
  }, [chatId, handleNewMessage, handleReadMessages]);

  return (
    <div>
      {messages.length === 0 ? (
        "No messages to display"
      ) : (
        <>
          {messages.map((message) => (
            <MessageBox
              key={message.id}
              message={message}
              currentUserId={currentUserId}
            />
          ))}
        </>
      )}
    </div>
  );
}
