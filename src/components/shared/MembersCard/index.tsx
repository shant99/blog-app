"use client";

import { calculateAge } from "@/utils/dates/calculateAge";
import { Card, CardFooter, Image } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import "./styles.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import toggleLikeMember from "@/actions/likeActions/toggleLikeMember";
import { useRouter } from "next/navigation";
import { MemberCardProps } from "./index.types";

export default function MemberCard({ member, likeIds }: MemberCardProps) {
  const hasLiked = likeIds.includes(member.userId);
  const router = useRouter();

  const preventLinkAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  async function toggleLike() {
    const targetId = member.userId;
    await toggleLikeMember(targetId, hasLiked);
    router.refresh();
  }

  return (
    <Card fullWidth as={Link} href={`/members/${member.userId}`} isPressable>
      <Image
        isZoomed
        alt={member.name}
        width={300}
        src={member.image || "/images/user.png"}
        className="aspect-square object-cover"
      />
      <div onClick={preventLinkAction}>
        <div className="absolute top-3 right-3 z-50">
          <div
            onClick={toggleLike}
            className="relative hover:opacity-80 transition cursor-pointer"
          >
            <AiOutlineHeart
              size={28}
              className="fill-white absolute -top-[2px] -right-[2px]"
            />
            <AiFillHeart
              size={24}
              className={hasLiked ? "fill-rose-500" : "fill-neutral-500/70"}
            />
          </div>
        </div>
      </div>
      <CardFooter className="card-footer flex justify-start bg-black overflow-hidden absolute bottom-0 z-10">
        <div className="flex flex-col text-white">
          <span className="font-semibold">
            {member.name}, {calculateAge(member.dateOfBirth)}
          </span>
          <span className="text-sm">{member.city}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
