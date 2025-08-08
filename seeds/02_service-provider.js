// 02_service_providers.js
exports.seed = async function (knex) {
  await knex.raw("TRUNCATE TABLE service_providers RESTART IDENTITY CASCADE");

  const users = await knex("users").select("id", "email");

  const findUserId = (email) => users.find((u) => u.email === email)?.id;

  await knex("service_providers").insert([
    {
      full_name: "Ashish",
      skill: "Electrician",
      rate: 35.0,
      experience: "4 years",
      location: "Thimphu",
      user_id: findUserId("ashish2@gmail.com"),
      phone_no: "+975XXXXXXXX",
      service_categories: "Home Services",
    },
    {
      full_name: "Tshering",
      skill: "Plumber",
      rate: 30.0,
      experience: "3 years",
      location: "Paro",
      user_id: findUserId("choszom@gmail.com"),
      phone_no: "+975XXXXXXXX",
      service_categories: "Home Services",
    },
    {
      full_name: "Dawa",
      skill: "Painter",
      rate: 25.0,
      experience: "2 years",
      location: "Punakha",
      user_id: findUserId("dawa2050@gmail.com"),
      phone_no: "+975XXXXXXXX",
      service_categories: "Creative & Design",
    },
    {
      full_name: "Chakhar",
      skill: "Carpenter",
      rate: 28.0,
      experience: "5 years",
      location: "Phuentsholing",
      user_id: findUserId("chakar@gmail.com"),
      phone_no: "+975XXXXXXXX",
      service_categories: "Home Services",
    },
  ]);
};
