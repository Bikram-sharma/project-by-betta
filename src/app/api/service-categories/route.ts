import { db } from "@/app/helper/db";

export async function GET() {
  const serviceCategories = await db("service_categories").select("id", "name");
  console.log(serviceCategories);
  return Response.json(serviceCategories);
}
