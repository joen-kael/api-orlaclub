const config = require('../config');
exports.up = function (knex) {
    return knex.schema.createTable(config.tableActivities, function (table) {
      table.string('id').primary();
      table.string('activity').notNullable();
      table.string('describe').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable(config.tableActivities);
  };
  