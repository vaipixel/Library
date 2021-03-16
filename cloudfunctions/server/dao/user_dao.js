const cloud = require('wx-server-sdk');

const user_collection_name = 'user';

class UserDao {
    _collection() {
        let db = cloud.database();
        return db.collection(user_collection_name);
    }

    _command() {
        let db = cloud.database();
        return db.command;
    }

    async isUserExist(userName) {
        let result = await this._collection()
            .where({
                userName: this._command().eq(userName)
            })
            .get();
        return result.data.length > 0;
    }

    async addUser(user) {
        return await this._collection().add({
            data: user
        });
    }

    async getUserInfo(id) {
        let result = await this._collection()
            .doc(id)
            .get();
        return result.data;
    }

    async queryUser(query) {
        let result = await this._collection()
            .where(query)
            .get();
        return result.data;
    }
}

module.exports = UserDao;
