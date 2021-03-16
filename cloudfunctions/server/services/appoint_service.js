const {dao} = require('../inject');
const {dateUtils} = require('../utils');
const {throwError, errors} = require('../errors');

class AppointService {

    /**
     * 将座位按图书馆划分，图书馆中的座位又按照组划分，每个图书馆有 4 个组，每个组有 5 个座位
     * @param libraryId 图书馆 id
     * @param groupNumber 组号
     * @param seatNumber 座位号
     * @param date 预定日期
     * @param period 预定的时间段
     * @param userId 预定用户 id
     */
    async appointSeat(libraryId, groupNumber, seatNumber, date, period, userId) {
        date = dateUtils.coverDateWithoutTime(date);
        let booked = await dao.appointDao.isSeatBooked(
            libraryId,
            groupNumber,
            seatNumber,
            date,
            period
        );
        if (booked) {
            throwError(errors.SEAT_ALREADY_BOOKED);
        }
        await dao.appointDao.addAppoint({
            libraryId, groupNumber, seatNumber, date, period, userId,
            status: 'pending'
        });
        return 'success';
    }

    async checkIn(appointId) {
        await dao.appointDao.updateAppoint(appointId, {
            status: 'processing'
        });
        return 'success';
    }

    async checkOut(appointId) {
        await dao.appointDao.updateAppoint(appointId, {
            status: 'finished'
        });
        return 'success';
    }

    async getNoncomplianceRecord(userId) {
        let records = await dao.appointDao.queryAppoints({userId, status: 'noncompliance'});
        let result = {};
        let s = [];

        result.thisMonth = records.filter(item => {
            return item.date.getTime() >= dateUtils.getCurrentMonthDate().getTime()
                && item.date.getTime() < dateUtils.getNextMonthDate().getTime()
        });
        result.history = records.filter(item => {
            return item.date.getTime() < dateUtils.getCurrentMonthDate().getTime()
        });
        return result;
    }

    async queryAppointCount(query) {
        return await dao.appointDao.queryAppointCount(query);
    }

    async querySeatBookedInfo(query) {
        return await dao.appointDao.querySeatBookedInfo(query);
    }
}

module.exports = AppointService;
