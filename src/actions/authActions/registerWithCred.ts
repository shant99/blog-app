"use client";

import { TRegisterSchema } from "@/lib/schemas/RegisterSchema";
import { TranslationFunction } from "@/types/global";
import { handleSignInErrors } from "@/utils/errors/handleSignInErrors";
import { signIn } from "next-auth/react";

export default async function registerWithCred(
  data: TRegisterSchema,
  t: TranslationFunction
) {
  try {
    const response = await fetch("/api/auth/register-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return {
        status: "error",
        error: t("errors.userAlreadyExists"),
      };
    }

    const signInResult = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    return handleSignInErrors(signInResult, t);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : t("errors.unknownError");
    return { status: "error", error: errorMessage };
  }
}
