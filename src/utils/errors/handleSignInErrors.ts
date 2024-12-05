import { TranslationFunction } from "@/types/global";
import { SignInResponse } from "next-auth/react";

/**
 * Обрабатывает ошибки для результатов signIn.
 * @param signInResult - Результат функции signIn.
 * @returns Объект, представляющий статус и сообщение об ошибке, если таковая имеется.
 */

type TSignInResult = SignInResponse | undefined;

export function handleSignInErrors(
  signInResult: TSignInResult,
  t: TranslationFunction
) {
  if (!signInResult) {
    return {
      status: "error",
      error: t("errors.unknownError"),
    };
  }

  if (signInResult.error) {
    return {
      status: "error",
      error:
        signInResult.error === "CredentialsSignin"
          ? t("errors.invalidCredentials")
          : t("errors.somethingWentWrong"),
    };
  }

  return { ...signInResult, status: "success" };
}
