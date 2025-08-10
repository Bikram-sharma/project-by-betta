import { db } from "@/app/helper/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, categoryId } = body;

    if (!name || name.trim() === "") {
      return Response.json(
        { message: "Service name is required" },
        { status: 400 }
      );
    }

    if (!categoryId) {
      return Response.json(
        { message: "Category ID is required" },
        { status: 400 }
      );
    }

    const [newService] = await db("services")
      .insert({
        name: name.trim(),
        category_id: categoryId,
      })
      .returning(["id", "name", "category_id"]);

    return Response.json(
      {
        message: "Service added successfully",
        service: newService,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding service:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}
