import { deleteMessage } from "@/actions/messageActions/deleteMessage";
import { getMessagesByContainer } from "@/actions/messageActions/getMessagesByContainer";
import useMessageStore from "@/store/useMessageStore";
import { MessageDto } from "@/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState, useCallback, Key, useEffect, useRef } from "react";

const outboxColumns = [
  { key: "recipientName", label: "Recipient" },
  { key: "text", label: "Message" },
  { key: "created", label: "Date sent" },
  { key: "actions", label: "Actions" },
];

const inboxColumns = [
  { key: "senderName", label: "Sender" },
  { key: "text", label: "Message" },
  { key: "created", label: "Date received" },
  { key: "actions", label: "Actions" },
];

export const useMessages = (
  initialMessages: MessageDto[],
  nextCursor?: string
) => {
  const set = useMessageStore((state) => state.set);
  const remove = useMessageStore((state) => state.remove);
  const messages = useMessageStore((state) => state.messages);
  const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);
  const resetMessages = useMessageStore((state) => state.resetMessages);
  const cursorRef = useRef(nextCursor);

  const searchParams = useSearchParams();
  const router = useRouter();
  const container = searchParams.get("container");
  const isOutbox = container === "outbox";
  const [isDeleting, setDeleting] = useState({
    id: "",
    loading: false,
  });

  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    set(initialMessages);
    cursorRef.current = nextCursor;

    return () => {
      resetMessages();
    };
  }, [initialMessages, set, nextCursor, resetMessages]);

  const loadMore = useCallback(async () => {
    if (cursorRef.current) {
      setLoadingMore(true);
      const { messages, nextCursor } = await getMessagesByContainer(
        container,
        cursorRef.current
      );
      set(messages);
      cursorRef.current = nextCursor;
      setLoadingMore(false);
    }
  }, [container, set]);

  const columns = isOutbox ? outboxColumns : inboxColumns;

  const handleDeleteMessage = useCallback(
    async (message: MessageDto) => {
      setDeleting({
        id: message.id,
        loading: true,
      });
      await deleteMessage(message.id, isOutbox);
      remove(message.id);
      if (!message.dateRead && !isOutbox) updateUnreadCount(-1);
      setDeleting({ id: "", loading: false });
    },
    [isOutbox, remove, updateUnreadCount]
  );

  const handleRowSelect = (key: Key) => {
    const message = messages.find((m) => m.id === key);
    const url = isOutbox
      ? `/members/${message?.recipientId}`
      : `/members/${message?.senderId}`;
    router.push(url + "/chat");
  };

  return {
    isOutbox,
    columns,
    deleteMessage: handleDeleteMessage,
    selectRow: handleRowSelect,
    isDeleting,
    messages,
    loadingMore,
    loadMore,
    hasMore: !!cursorRef.current,
  };
};
