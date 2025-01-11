"use client";

import { useCallback, useEffect, useRef } from "react";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";
import usePresenceStore from "@/store/usePresenceStore";

export const usePresenceChannel = () => {
  const setMembers = usePresenceStore((state) => state.set);
  const addMember = usePresenceStore((state) => state.add);
  const removeMember = usePresenceStore((state) => state.remove);
  const channelRef = useRef<Channel | null>(null);

  const handleSetMembers = useCallback(
    (memberIds: string[]) => {
      setMembers(memberIds);
    },
    [setMembers]
  );

  const handleAddMember = useCallback(
    (memberId: string) => {
      addMember(memberId);
    },
    [addMember]
  );

  const handleRemoveMember = useCallback(
    (memberId: string) => {
      removeMember(memberId);
    },
    [removeMember]
  );

  useEffect(() => {
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe("presence-blog");

      channelRef.current.bind(
        "pusher:subscription_succeeded",
        (members: Members) => {
          handleSetMembers(Object.keys(members.members));
        }
      );

      channelRef.current.bind(
        "pusher:member_added",
        (member: Record<string, any>) => {
          handleAddMember(member.id);
        }
      );

      channelRef.current.bind(
        "pusher:member_removed",
        (member: Record<string, any>) => {
          handleRemoveMember(member.id);
        }
      );
    }

    return () => {
      if (channelRef.current) {
        channelRef.current.unsubscribe();
        channelRef.current.unbind(
          "pusher:subscription_succeeded",
          handleSetMembers
        );
        channelRef.current.unbind("pusher:member_added", handleAddMember);
        channelRef.current.unbind("pusher:member_removed", handleRemoveMember);
      }
    };
  }, [handleAddMember, handleRemoveMember, handleSetMembers]);
};
