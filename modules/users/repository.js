const db = require('../../db/db.js');
const config =require('../../config.js');
class UsersRepository {
    static config() {
        return new UsersRepository(
            db,
            config.tableUsers
        );
    }
    async list () {
        return db(this.table).select('*');
    }

    async create (user) {
        return db(this.table).insert(user);
    }

    async retrieve (id) {
        return db(this.table).where({ id }).first();
    }

    async retrieveEmail (email) {
        return db(this.table).where({ email }).first();
    }

    async update (id, user) {
        return db(this.table).where({ id }).update(user);
    }

    async delete (id) {
        return db(this.table).where({ id }).del();
    }
    constructor(db, table) {
        this.db = db;
        this.table = table;
    }
}

module.exports = UsersRepository