exports.up = function (knex) {
  return knex.schema.createTable("bookings", function (table) {
    table.increments("id").primary();
    table
      .integer("client_id")
      .unsigned()
      .references("id")
      .inTable("clients")
      .onDelete("CASCADE");
    table
      .integer("provider_id")
      .unsigned()
      .references("id")
      .inTable("service_providers")
      .onDelete("CASCADE");
    table.datetime("booked_time").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("bookings");
};
