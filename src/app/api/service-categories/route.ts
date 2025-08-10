import { db } from "@/app/helper/db";

export async function GET() {
  const serviceCategories = await db("service_categories").select("id", "name");
  return Response.json(serviceCategories);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name || name.trim() === "") {
      return Response.json(
        { message: "Category name is required" },
        { status: 400 }
      );
    }

    const [newCategory] = await db("service_categories")
      .insert({ name: name.trim() })
      .returning(["id", "name"]);

    return Response.json(
      {
        message: "Category added successfully",
        category: newCategory,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding category:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
