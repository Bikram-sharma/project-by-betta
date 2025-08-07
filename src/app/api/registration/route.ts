import { NextRequest, NextResponse } from "next/server";
import knex from "knex";
import knexConfig from "../../../../knexfile";

const db = knex(knexConfig.development);

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  const { full_name, skill, rate, experience, location, phone_no, user_id } =
    body;

  if (
    !full_name ||
    !skill ||
    !rate ||
    !experience ||
    !location ||
    !phone_no ||
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
        user_id,
      })
      .returning("*");
    return NextResponse.json(serviceProvider, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json(
      { message: "Registration failed" },
      { status: 500 }
    );
  }
}
