import { NextRequest, NextResponse } from "next/server";
import knex from "knex";
import knexConfig from "../../../../knexfile";
import { sendEmail } from "@/app/helper/mailer";

const db = knex(knexConfig.development);

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    full_name,
    skill,
    rate,
    experience,
    location,
    phone_no,
    service_categories,
    user_id,
  } = body;

  if (
    !full_name ||
    !skill ||
    !rate ||
    !experience ||
    !location ||
    !phone_no ||
    !service_categories ||
    !user_id
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    const existingProvider = await db("service_providers")
      .where("user_id", user_id)
      .first();

    if (existingProvider) {
      return NextResponse.json(
        { message: "This user is already Registered" },
        { status: 409 }
      );
    }

    const [serviceProvider] = await db("service_providers")
      .insert({
        full_name,
        skill,
        rate,
        experience,
        location,
        phone_no,
        service_categories,
        user_id,
      })
      .returning("*");

    const { email } = await db("users")
      .select("email")
      .where("id", user_id)
      .first();

    await sendEmail({
      email,
      subject: "You’re Now a Service Provider on Betta Service!",
      message: `
    <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
      <p>Hi ${full_name},</p>

      <p>Your registration as a <strong>service provider</strong> was successful. 
      You can now log in, update your profile, and start offering your services.</p>

      <p>Welcome aboard! 🚀</p>

      <p>— The Betta Service Team<br>
      <a href="mailto:support@betta.com">support@betta.com</a></p>
    </div>
  `,
    });

    return NextResponse.json(serviceProvider, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
