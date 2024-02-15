const config = require('../config');
exports.up = function (knex) {
    return knex.schema.createTable(config.tablePictures, function (table) {
      table.string('id').primary();
      table.string('url').notNullable();
      table.string('activity_id').notNullable();
      table.timestamp('createdAt').defaultTo(knex.fn.now());

      table.foreign('activity_id').references('id').inTable(config.tableActivities).onDelete('cascade');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable(config.tablePictures);
  };
  