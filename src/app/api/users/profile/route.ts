import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/helper/db";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, name, email } = body;
    console.log(id, name, email);

    if (!id || !name || !email) {
      return NextResponse.json(
        {
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const updatedRows = await db("users")
      .where({ id })
      .update({ name, email })
      .returning(["id", "name", "email"]);

    if (updatedRows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Profile updated successfully",
        user: updatedRows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Missing user ID" }, { status: 400 });
    }

    const deletedRows = await db("users").where({ id }).del();

    if (deletedRows === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
