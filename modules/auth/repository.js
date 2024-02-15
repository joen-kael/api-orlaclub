const db = require('../../db/db.js');
const config = require('../../config.js');

class AuthRepository {
    static config() {
        return new AuthRepository(
            db,
            config.tableAuth
        );
    }

    async create (user) {
        return db(this.table).insert(user);
    }

    async retrieve (token) {
        return db(this.table).where({ token }).first();
    }

    constructor(db, table) {
        this.db = db;
        this.table = table;
    }
}

module.exports = AuthRepository;