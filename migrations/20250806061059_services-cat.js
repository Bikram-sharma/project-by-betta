exports.up = function (knex) {
  return knex.schema.createTable("service_categories", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("service_categories");
};
