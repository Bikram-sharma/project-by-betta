import { NextRequest, NextResponse } from "next/server";
import knex from "knex";
import knexConfig from "../../../../knexfile";

const db = knex(knexConfig.development);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const service_categories = searchParams.get("categories");
    const location = searchParams.get("location");

    if (!service_categories || !location) {
      return NextResponse.json(
        { error: "Missing skill or location query parameter" },
        { status: 400 }
      );
    }

    const providers = await db("service_providers")
      .select(
        "id",
        "full_name",
        "skill",
        "rate",
        "experience",
        "location",
        "user_id"
      )
      .where("service_categories", service_categories);
    console.log(providers);

    return new Response(JSON.stringify(providers), {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Error fetching service providers:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
