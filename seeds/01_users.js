import bcrypt from "bcryptjs";

export async function seed(knex) {
  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

  await knex("users").insert([
    {
      name: "Dema",
      email: "demal2525@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
    {
      name: "Phuntsho",
      email: "pwangmo2019@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
    },
    {
      name: "Kuenzang",
      email: "kuenzang@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
    {
      name: "Kundan",
      email: "trekkreck@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
    {
      name: "Tandin",
      email: "tandin@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
    {
      name: "Ashish",
      email: "ashish2@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
    {
      name: "Tshering",
      email: "choszom@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
    {
      name: "Dawa",
      email: "dawa2050@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
    {
      name: "Chakhar",
      email: "chakar@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
    {
      name: "Thomas",
      email: "tomc@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
    {
      name: "Tashi",
      email: "tphuntsho@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "user",
    },
  ]);
}
