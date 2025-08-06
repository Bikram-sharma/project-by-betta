exports.up = function (knex) {
  return knex.schema.createTable("clients", function (table) {
    table.increments("id").primary();
    table.string("service_booked").notNullable();
    table.string("phone_no").notNullable().unique();
    table.string("location").notNullable();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("clients");
};
