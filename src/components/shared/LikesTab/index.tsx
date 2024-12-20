"use client";

import LoadingComponent from "@/components/shared/LoadingComponent";
import { Tab, Tabs } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useTransition } from "react";
import { Key } from "react";
import MemberCard from "../MembersCard";
import { LikesTabProps } from "./index.types";

export default function LikesTab({
  members,
  likeIds,
  defaultType,
}: LikesTabProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleTabChange(key: Key) {
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("type", key.toString());
      router.replace(`${pathname}?${params.toString()}`);
    });
  }

  const tabs = [
    {
      id: "source",
      label: "Members I have liked",
    },
    {
      id: "target",
      label: "Members that like me",
    },
    { id: "mutual", label: "Mutual likes" },
  ];

  return (
    <Tabs
      aria-label="Like tabs"
      items={tabs}
      color="default"
      defaultSelectedKey={defaultType}
      onSelectionChange={(key) => handleTabChange(key)}
    >
      {(item) => (
        <Tab key={item.id} title={item.label}>
          {isPending ? (
            <LoadingComponent />
          ) : (
            <>
              {members.length > 0 ? (
                <div
                  tabIndex={0}
                  className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-8 max-w-[1300px]"
                >
                  {members.map((member) => (
                    <MemberCard
                      key={member.id}
                      member={member}
                      likeIds={likeIds}
                    />
                  ))}
                </div>
              ) : (
                <div>No members for this filter</div>
              )}
            </>
          )}
        </Tab>
      )}
    </Tabs>
  );
}
