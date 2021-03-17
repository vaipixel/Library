async function baseRequest(api, data) {
    let result = await wx.cloud.callFunction({
        name: 'server',
        data: {
            api: api,
            data: data
        }
    });
    return result.result;
}

async function login(userName, passwd) {
    return baseRequest('login', {userName, passwd})
}

async function register(userName, passwd) {
    return baseRequest('register', {userName, passwd})
}

async function getLibraries() {
    return baseRequest('getLibraries')
}

async function appointSeat(appoint) {
    return baseRequest('appointSeat', appoint)
}

async function checkIn(appointId) {
    return baseRequest('checkIn', {appointId})
}

async function checkOut(appointId) {
    return baseRequest('checkOut', {appointId})
}

async function getNoncomplianceRecord(userId) {
    return baseRequest('getNoncomplianceRecord', {userId})
}

async function getLibraryAppointInfo(libraryId) {
    return baseRequest('getLibraryAppointInfo', {libraryId})
}

async function getLibrarySeatBookedInfo(query) {
    return baseRequest('getLibrarySeatBookedInfo', query)
}

async function getUserAppointRecords(userId, appointStatus) {
    return baseRequest('getUserAppointRecords', {userId, appointStatus})
}

module.exports = {
    login: login,
    register: register,
    getLibraries: getLibraries,
    appointSeat: appointSeat,
    checkIn: checkIn,
    checkOut: checkOut,
    getNoncomplianceRecord: getNoncomplianceRecord,
    getLibraryAppointInfo: getLibraryAppointInfo,
    getLibrarySeatBookedInfo: getLibrarySeatBookedInfo,
    getUserAppointRecords: getUserAppointRecords
}
