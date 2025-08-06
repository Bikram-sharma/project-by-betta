exports.up = function (knex) {
  return knex.schema.createTable("services", function (table) {
    table.increments("id").primary();
    table.string("Name").notNullable();
    table.integer('service_id').unsigned();
    table.foreign('service_id').references('id').inTable('service_cat');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.dropTable("services");
};