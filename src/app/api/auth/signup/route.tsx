import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/app/helper/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const mailObj = {
      email,
      subject: "Sign up successful",
      message: `Hello ${name}, you have successfully signed up to Betta!`,
    };

    await sendEmail(mailObj);

    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error: unknown) {
    let errorMessage = "Unknown error";
    if (error instanceof Error) errorMessage = error.message;

    return NextResponse.json(
      { message: "Something went wrong", error: errorMessage },
      { status: 500 }
    );
  }
}
