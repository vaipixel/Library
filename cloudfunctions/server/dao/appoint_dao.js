const cloud = require('wx-server-sdk');

const appoint_collection_name = 'appoint';

class AppointDao {
    _collection() {
        let db = cloud.database();
        return db.collection(appoint_collection_name);
    }

    _command() {
        let db = cloud.database();
        return db.command;
    }

    async isSeatBooked(libraryId,
                       groupNumber,
                       seatNumber,
                       date,
                       period) {
        let _ = this._command();
        let query = {
            libraryId: _.eq(libraryId),
            groupNumber: _.eq(groupNumber),
            seatNumber: _.eq(seatNumber),
            date: _.eq(date),
            period: _.eq(period)
        }
        console.log(query);
        let result = await this._collection()
            .where(query)
            .get();
        console.log(result)
        return result.data.length > 0;
    }

    async addAppoint(appoint) {
        return await this._collection()
            .add({
                data: appoint
            });
    }

    async updateAppoint(id, appoint) {
        let result = await this._collection()
            .doc(id)
            .update({
                data: appoint
            });
        return result.data;
    }

    async queryAppoints({libraryId, date, period, userId, status}) {
        let _ = this._command();
        let query = {};
        if (libraryId) {
            query.libraryId = _.eq(libraryId);
        }
        if (date) {
            query.date = _.eq(date);
        }
        if (period) {
            query.period = _.eq(period);
        }
        if (userId) {
            query.userId = _.eq(userId);
        }
        if (status) {
            if (status instanceof Array) {
                query.status = _.in(status);
            } else {
                query.status = _.eq(status);
            }
        }
        let result = await this._collection()
            .where(query)
            .get();
        return result.data;
    }

    async queryAppointCount({libraryId, date}) {
        let $ = this._command().aggregate;
        let result = await this._collection()
            .aggregate()
            .match({
                libraryId,
                date
            })
            .group({
                _id: '$period',
                count: $.sum(1)
            })
            .end();
        return result.list;
    }

    async querySeatBookedInfo({libraryId, date, period}) {
        let _ = this._command();
        let result = await this._collection()
            .where({
                libraryId: _.eq(libraryId),
                date: _.eq(date),
                period: _.eq(period)
            })
            .get();
        return result.data;
    }

    async getAppoint(id) {
        let result = await this._collection()
            .doc(id)
            .get();
        return result.data;
    }
}

module.exports = AppointDao;
