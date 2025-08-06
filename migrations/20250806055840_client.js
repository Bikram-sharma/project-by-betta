exports.up = function (knex) {
  return knex.schema.createTable("clients", function (table) {
    table.increments("id").primary();
    table.string("Service_Booked").notNullable();
    table.string("Phone-No").notNullable().unique();
    table.string("Location").notNullable();
    table.integer('user_id').unsigned();
    table.foreign('user_id').references('id').inTable('users');
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.dropTable("clients");
};