// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
    // env: cloud.DYNAMIC_CURRENT_ENV,
    env: 'dev-0gwpl8mkeac5622f'
})

const {inject, services} = require('./inject');
const {ServerError} = require('./errors');

inject();

// 云函数入口函数
exports.main = async (event, context) => {
    let api = event.api;
    let request = event.data;

    let response = {
        code: 200,
        message: 'success'
    }
    let data;
    try {
        switch (api) {
            case 'login':
                data = await services.userService.login(request.userName, request.passwd);
                break;
            case 'register':
                data = await services.userService.register(request.userName, request.passwd);
                break
            case 'getLibraries':
                data = await services.libraryService.getLibraries();
                break;
            case 'getLibraryAppointInfo':
                data = await services.libraryService.getLibraryAppointInfo(request.libraryId);
                break;
            case 'getLibrarySeatBookedInfo':
                data = await services.libraryService.getLibrarySeatBookedInfo(request.libraryId, request.date, request.period);
                break;
            case 'appointSeat':
                // 预定座位
                data = await services.appointService.appointSeat(
                    request.libraryId,
                    request.groupNumber,
                    request.seatNumber,
                    request.date,
                    request.period,
                    request.userId
                );
                break;
            case 'checkIn':
                data = await services.appointService.checkIn(request.appointId);
                break;
            case 'checkOut':
                data = await services.appointService.checkOut(request.appointId);
                break;
            case 'getNoncomplianceRecord':
                data = await services.appointService.getNoncomplianceRecord(request.userId);
                break;
        }
        return {
            ...response,
            data
        };
    } catch (e) {
        if (e instanceof ServerError) {
            return e.getErrorResponse();
        }
        return {
            code: 19999,
            message: `unknown: ${e.message}`
        };
    }
}
