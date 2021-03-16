const cloud = require('wx-server-sdk');

const library_collection_name = 'library';

class LibraryDao {
    _collection() {
        let db = cloud.database();
        return db.collection(library_collection_name);
    }

    _command() {
        let db = cloud.database();
        return db.command;
    }

    async getLibraries() {
        return (await this._collection().get()).data;
    }
}

module.exports = LibraryDao;
