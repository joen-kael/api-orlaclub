const db = require('../../db/db.js');
const config = require('../../config.js');
class ActivitiesRepository {
    static config() {
        return new ActivitiesRepository(
            db,
            config.tableActivities,
        );
    }
    async list () {
        return db(this.table).select('*');
    }

    async create (activity) {
        return db(this.table).insert(activity);
    }

    async retrieve (id) {
        return db(this.table).where({ id }).first();
    }

    async update (id, activity) {
        return db(this.table).where({ id }).update(activity);
    }

    async delete (id) {
        return db(this.table).where({ id }).del();
    }
    constructor(db, table) {
        this.db = db;
        this.table = table;
    }
}

module.exports = ActivitiesRepository;