const config = require('../config');
exports.up = function (knex) {
    return knex.schema.createTable(config.tableUsers, function (table) {
      table.increments('id').primary();
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('name').notNullable();
      table.boolean('admin').defaultTo(false);
      table.string('describe');
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable(config.tableUsers);
  };
  