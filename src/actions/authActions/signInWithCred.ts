import { TLoginSchema } from "@/lib/schemas/LoginSchema";
import { signIn } from "next-auth/react";
import { handleSignInErrors } from "@/utils/errors/handleSignInErrors";
import { TranslationFunction } from "@/types/global";

export default async function signInWithCred(
  data: TLoginSchema,
  t: TranslationFunction
) {
  try {
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
