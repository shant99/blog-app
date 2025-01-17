import { signIn } from "@/auth";
import { sendVerificationEmail } from "@/lib/resend/mail";
import { LoginSchema } from "@/lib/schemas/LoginSchema";
import { generateToken } from "@/lib/tokens";
import { getUserByEmail } from "@/services/userServices";
import { ActionResult } from "@/types";
import { TokenType } from "@prisma/client";
import { AuthError } from "next-auth";

export async function signInUser(
  data: LoginSchema
): Promise<ActionResult<string>> {
  try {
    const existingUser = await getUserByEmail(data.email);

    if (!existingUser || !existingUser.email)
      return { status: "error", error: "Invalid credentials" };

    if (!existingUser.emailVerified) {
      const { token, email } = await generateToken(
        existingUser.email,
        TokenType.VERIFICATION
      );

      await sendVerificationEmail(email, token);

      return {
        status: "error",
        error: "Please verify your email before logging in",
      };
    }

    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    return { status: "success", data: "Logged in" };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { status: "error", error: "Invalid credentials" };
        default:
          return { status: "error", error: "Something went wrong" };
      }
    } else {
      return { status: "error", error: "Something else went wrong" };
    }
  }
}
