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

    async getLibrary(id) {
        let result = await this._collection()
            .doc(id)
            .get();
        return result.data;
    }
}

module.exports = LibraryDao;
