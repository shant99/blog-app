import { sendPasswordResetEmail } from "@/lib/resend/mail";
import { generateToken } from "@/lib/tokens";
import { getUserByEmail } from "@/services/userServices";
import { ActionResult } from "@/types";
import { TokenType } from "@prisma/client";

export async function generateResetPasswordEmail(
  email: string
): Promise<ActionResult<string>> {
  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { status: "error", error: "Email not found" };
    }

    const token = await generateToken(email, TokenType.PASSWORD_RESET);

    await sendPasswordResetEmail(token.email, token.token);

    return {
      status: "success",
      data: "Password reset email has been sent.  Please check your emails",
    };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Something went wrong" };
  }
}
