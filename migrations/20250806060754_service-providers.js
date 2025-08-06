exports.up = function (knex) {
  return knex.schema.createTable("service_providers", function (table) {
    table.increments("id").primary();
    table.string("full_name").notNullable();
    table.string("skill").notNullable();
    table.decimal("rate", 10, 2).notNullable();
    table.string("experience").notNullable();
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
  return knex.schema.dropTable("service_providers");
};
