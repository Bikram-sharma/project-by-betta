require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: process.env.USER_NAME,
      password: process.env.USER_PASS,
      database: process.env.DATABASE,
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
    },
  },
};
