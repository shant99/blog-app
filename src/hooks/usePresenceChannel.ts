import { useCallback, useEffect, useRef } from "react";

import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/lib/pusher";
import usePresenceStore from "@/store/usePresenceStore";
import { updateLastActive } from "@/actions/membersActions/updateLastActive";

export const usePresenceChannel = (userId: string | null) => {
  const set = usePresenceStore((state) => state.set);
  const add = usePresenceStore((state) => state.add);
  const remove = usePresenceStore((state) => state.remove);
  const channelRef = useRef<Channel | null>(null);

  const handleSetMembers = useCallback(
    (memberIds: string[]) => {
      set(memberIds);
    },
    [set]
  );

  const handleAddMember = useCallback(
    (memberId: string) => {
      add(memberId);
    },
    [add]
  );

  const handleRemoveMember = useCallback(
    (memberId: string) => {
      remove(memberId);
    },
    [remove]
  );

  useEffect(() => {
    if (!userId) return;
    if (!channelRef.current) {
      channelRef.current = pusherClient.subscribe("presence-match-me");

      channelRef.current.bind(
        "pusher:subscription_succeeded",
        async (members: Members) => {
          handleSetMembers(Object.keys(members.members));
          await updateLastActive();
        }
      );

      channelRef.current.bind(
        "pusher:member_added",
        (member: Record<string, string>) => {
          handleAddMember(member.id);
        }
      );

      channelRef.current.bind(
        "pusher:member_removed",
        (member: Record<string, string>) => {
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
  }, [handleAddMember, handleRemoveMember, handleSetMembers, userId]);
};
