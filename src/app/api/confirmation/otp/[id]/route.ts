import { NextRequest } from "next/server";
import { sendEmail } from "@/app/helper/mailer";
import { db } from "@/app/helper/db";

const otpGenerator = (): string => {
  let otp = "";
  for (let i = 0; i < 4; i++) {
    const num = Math.floor(Math.random() * 10);
    otp += num.toString();
  }
  return otp;
};

interface Props {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Props) {
  const { id } = params;

  const user = await db("users").select("email").where("id", id).first();

  if (!user || !user.email) {
    return new Response(JSON.stringify({ error: "User not found" }), {
      status: 404,
    });
  }

  const otp = otpGenerator();

  const message = `Your OTP for verification is: ${otp}. It will expire in 5 minutes.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "OTP Verification",
      message,
    });
    return new Response(JSON.stringify({ OTP: otp }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to send OTP email" }), {
      status: 500,
    });
  }
}
