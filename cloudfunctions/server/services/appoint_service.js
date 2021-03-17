const {dao, services} = require('../inject');
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
        let noncomplianceRecords = await this.getNoncomplianceRecord(userId);
        if (noncomplianceRecords.thisMonth.length > 2) {
            throwError(errors.USER_HAD_BLOCKED);
        }
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
        let appoint = await dao.appointDao.getAppoint(appointId);
        if (appoint.status === 'noncompliance') {
            throwError(errors.APPOINT_HAD_EXPIRED);
        }
        await dao.appointDao.updateAppoint(appointId, {
            status: 'processing'
        });
        return 'success';
    }

    async checkOut(appointId) {
        let appoint = await dao.appointDao.getAppoint(appointId);
        if (appoint.status === 'noncompliance') {
            throwError(errors.APPOINT_HAD_EXPIRED);
        }
        await dao.appointDao.updateAppoint(appointId, {
            status: 'finished'
        });
        return 'success';
    }

    async getNoncomplianceRecord(userId) {
        let records = await dao.appointDao.queryAppoints({userId, status: 'noncompliance'});
        let result = {};

        for (let record of records) {
            record.library = await services.libraryService.getLibraryInfo(record.libraryId);
            record.seat = `${record.groupNumber}-${record.seatNumber}`;
            record.formatDate = `${record.date.getFullYear()}-${record.date.getMonth() + 1}`
        }
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
        console.log(query);
        return await dao.appointDao.queryAppointCount(query);
    }

    async querySeatBookedInfo(query) {
        return await dao.appointDao.querySeatBookedInfo(query);
    }

    async getUserAppointRecords(userId, appointStatus) {
        let records =  await dao.appointDao.queryAppoints({
            userId,
            status: appointStatus
        });

        for (let record of records) {
            record.library = await services.libraryService.getLibraryInfo(record.libraryId);
            record.seat = `${record.groupNumber}-${record.seatNumber}`;
        }
        return records;
    }
}

module.exports = AppointService;
