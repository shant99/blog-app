"use client";

import { handleRegistered } from "@/lib/confetti";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";

export default function MembersPage() {
  const registeredRef = useRef(null);
  const searchParams = useSearchParams();
  const action = searchParams.get("action");
  const isNewUser = action === "register";
  const { data } = useSession();

  useEffect(() => {
    if (isNewUser) {
      handleRegistered();
    }
  }, [isNewUser]);
  return (
    <div ref={registeredRef}>
      <h3 className="text-3xl">Welcome to Blog App {data?.user?.name} !</h3>
    </div>
  );
}
