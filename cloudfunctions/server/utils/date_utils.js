function coverDateWithoutTime(date) {
    date = new Date(date);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getCurrentMonthDate() {
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
}

function getNextMonthDate() {
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
}

module.exports = {
    coverDateWithoutTime,
    getCurrentMonthDate,
    getNextMonthDate
}
