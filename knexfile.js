require('dotenv').config();
const { mysql}  = require("./config");

module.exports = {
    client: 'mysql',
    connection: {
        host: mysql.host,
        port: mysql.port,
        database: mysql.database,
        user: mysql.user,
        password: mysql.password,
        charset: 'utf8mb4'
    },
        pool: {
        min: 0,
        max: 2,
        acquireTimeoutMillis: 10000,
        createTimeoutMillis: 10000,
        idleTimeoutMillis: 5000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false,
        log: (message, logLevel) => console.log(`${logLevel}: ${message}`),
    },
    debug: false,
    migrations: {
        tableName: 'knex_migrations',
    },
  };
