import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/app/helper/mailer";
import knex from "knex";
import knexConfig from "../../../../../knexfile";

const db = knex(knexConfig.development);

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

    const existingUser = await db("users").where({ email }).first();
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await db("users")
      .insert({
        name,
        email,
        password: hashedPassword,
        role: "user",
      })
      .returning(["id", "name", "email"]);

    await sendEmail({
      email,
      subject: "Sign up successful",
      message: `Hello ${name}, you have successfully signed up to Betta!`,
    });

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Something went wrong", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  const users = await db("users").select("*");
  return Response.json(users);
}
