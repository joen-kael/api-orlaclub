const config = require('../config');
exports.up = function (knex) {
    return knex.schema.createTable(config.tableAuth, function (table) {
      table.increments('id').primary();
      table.string('email').notNullable();
      table.string('token').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable(config.tableAuth);
  };
  