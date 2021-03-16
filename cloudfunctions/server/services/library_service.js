const BaseService = require('./base');
const {dao, services} = require('../inject');
const {dateUtils} = require('../utils');

class LibraryService extends BaseService {
    async getLibraries() {
        return dao.libraryDao.getLibraries();
    }

    async getLibraryAppointInfo(libraryId) {
        let response = [];
        let now = new Date();
        for (let i = 0; i < 8; i++) {
            let date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i, 0, 0, 0);
            let query = {
                libraryId: libraryId,
                date
            }
            let periodCount = await services.appointService.queryAppointCount(query);
            if (periodCount.length > 0) {
                response.push({
                    dateStr: `${date.getMonth() + 1}-${date.getDate()}`,
                    periodCount
                });
            }
        }
        return response;
    }

    async getLibrarySeatBookedInfo(libraryId, date, period) {
        date = dateUtils.coverDateWithoutTime(date);
        return services.appointService.querySeatBookedInfo({libraryId, date, period});
    }
}

module.exports = LibraryService;
