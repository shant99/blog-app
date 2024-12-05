import { registerSchema, TRegisterSchema } from "@/lib/schemas/RegisterSchema";
import { createUser, findUserByEmail } from "@/services/userServices";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: TRegisterSchema = await req.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors },
        { status: 400 }
      );
    }

    const { email } = validated.data;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "User already registerd" },
        { status: 404 }
      );
    }

    const user = await createUser(validated.data);

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong during registration" },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    { status: 204, headers: { Allow: "POST, OPTIONS" } }
  );
}
