import bcrypt from "bcryptjs";

export async function seed(knex) {
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

  await knex("users").insert([
    {
      name: "Bikram",
      email: "sharmabikram061@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    },
    {
      name: "Dema",
      email: "demal2525@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
    {
      name: "Phuntsho",
      email: "phuntsho@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    },
    {
      name: "Kuenzang",
      email: "kuenzang@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
  ]);
}
