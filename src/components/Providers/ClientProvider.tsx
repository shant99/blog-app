"use client";

import { useNotificationChannel } from "@/hooks/useNotificationChannel";
import { usePresenceChannel } from "@/hooks/usePresenceChannel";
import useMessageStore from "@/store/useMessageStore";
import { ReactNode, useCallback, useEffect, useRef } from "react";

const ClientProvider = ({
  children,
  unreadMessageCount,
  userId,
}: {
  children: ReactNode;
  userId: string | null;
  unreadMessageCount: number;
}) => {
  const isUnreadCountSet = useRef(false);
  const updateUnreadCount = useMessageStore((state) => state.updateUnreadCount);

  const setUnreadCount = useCallback(
    (amount: number) => {
      updateUnreadCount(amount);
    },
    [updateUnreadCount]
  );

  if (!userId) return <div>{children}</div>;

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      setUnreadCount(unreadMessageCount);
      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId, unreadMessageCount]);

  usePresenceChannel(userId);
  useNotificationChannel(userId);
  return <div>{children}</div>;
};

export default ClientProvider;
