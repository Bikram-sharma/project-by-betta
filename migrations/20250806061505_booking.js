exports.up = function (knex) {
  return knex.schema.createTable("booking", function (table) {
    table.increments("id").primary();
    table.integer('client_id').unsigned();
    table.foreign('client_id').references('id').inTable('clients');
    table.integer('provider_id').unsigned();
    table.foreign('provider_id').references('id').inTable('service_providers');
    table.integer('service_id').unsigned();
    table.foreign('service_id').references('id').inTable('services');
    table.datetime('booked_time').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.dropTable("booking");
};