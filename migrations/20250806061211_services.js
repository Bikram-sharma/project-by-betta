exports.up = function (knex) {
  return knex.schema.createTable("services", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("service_categories")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("services");
};
