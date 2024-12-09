"use client";

import { handleRegistered } from "@/lib/confetti";
import Link from "next/link";
import React, { useEffect, useRef } from "react";

export default function MembersPage() {
  const isNewUser = true;
  const registeredRef = useRef(null);

  useEffect(() => {
    if (isNewUser) {
      handleRegistered();
    }
  });
  return (
    <div ref={registeredRef}>
      <h3 className="text-3xl">Welcome !!!!!</h3>
      <Link href="/">Go back home</Link>
    </div>
  );
}
