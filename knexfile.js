require("dotenv").config({ path: ".env.local" });

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: process.env.USER_NMAE,
      password: process.env.USER_PASS,
      database: process.env.DATABASE,
      port: process.env.PORT,
    },
  },
};
