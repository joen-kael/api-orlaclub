const db = require('../../db/db.js');
const config = require('../../config.js');
class UploadRepository {
    static config() {
        return new UploadRepository(
            db,
            config.tablePictures,
        );
    }
    async list () {
        return db(this.table).select('*');
    }

    async create (picture) {
        return db(this.table).insert(picture);
    }

    async listByActivityId (activity_id) {
        return db(this.table).select('id', 'url').where({activity_id});
    }

    async retrieve(id) {
        return db(this.table).where({id}).first();
    }

    async delete (id) {
        return db(this.table).where({ id }).del();
    }
    constructor(db, table) {
        this.db = db;
        this.table = table;
    }
}

module.exports = UploadRepository;