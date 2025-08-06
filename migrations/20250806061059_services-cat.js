exports.up = function (knex) {
  return knex.schema.createTable("service_cat", function (table) {
    table.increments("id").primary();
    table.string("Name").notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.dropTable("service_cat");
};