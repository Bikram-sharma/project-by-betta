exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE service_categories RESTART IDENTITY CASCADE");
  await knex("service_categories").insert([
    { name: "Home Services" },
    { name: "Tech & IT Support" },
    { name: "Creative & Design" },
    { name: "Cleaning & Maintenance" },
    { name: "Tutoring & Education" },
    { name: "Skilled Labor & Others" },
  ]);
};
