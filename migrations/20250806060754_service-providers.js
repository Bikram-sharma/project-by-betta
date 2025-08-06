exports.up = function (knex) {
  return knex.schema.createTable("service_providers", function (table) {
    table.increments("id").primary();
    table.string("Full_Name").notNullable();
    table.string("Skill").notNullable().unique();
    table.string("rate").notNullable();
    table.string("Experience").notNullable();
    table.string("Location").notNullable();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.dropTable("service_providers");
};