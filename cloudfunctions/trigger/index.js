// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    env: 'dev-0gwpl8mkeac5622f'
})

const collection_name = 'appoint';

// 云函数入口函数
exports.main = async (event, context) => {
    let {TriggerName} = event;
    switch (TriggerName) {
        // 整点签到检查
        case 'checkInTrigger1':
            checkIn()
            break;
        //  半点签到检查
        case 'checkInTrigger2':
            checkIn()
            break;
        //  整点签退检查
        case 'checkOutTrigger1':
            checkOut()
            break;
        //  半点签退检查
        case 'checkOutTrigger2':
            checkOut()
            break;
    }
}

async function checkIn() {
    let db = cloud.database();
    let _ = db.command;
    let queryResult = (await db.collection(collection_name)
        .where({
            status: _.eq('pending'),
            period: _.eq(_getCheckInPeriod()),
            date: _.eq(_getTodayDate())
        })
        .get()).data;
    let appointIds = queryResult.map(item => item._id);
    db.collection(collection_name)
        .where({
            _id: _.in(appointIds)
        })
        .update({
            data: {
                status: 'noncompliance'
            }
        });
}

async function checkOut() {
    let db = cloud.database();
    let _ = db.command;
    let queryResult = (await db.collection(collection_name)
        .where({
            status: _.eq('processing'),
            period: _.eq(_getCheckOutPeriod()),
            date: _.eq(_getTodayDate())
        })
        .get()).data;
    let appointIds = queryResult.map(item => item._id);
    db.collection(collection_name)
        .where({
            _id: _.in(appointIds)
        })
        .update({
            data: {
                status: 'noncompliance'
            }
        });
}

function _getCheckInPeriod() {
    let now = new Date();
    let hours = now.getHours();
    switch (hours) {
        case 8:
            return '08:00-12:30';
        case 12:
            return '12:30-14:00';
        case 14:
            return '14:00-17:30';
        case 17:
            return '17:30-18:30';
        case 18:
            return '18:30-22:30';
    }
}

function _getCheckOutPeriod() {
    let now = new Date();
    let hours = now.getHours();
    switch (hours) {
        case 12:
            return '08:00-12:30';
        case 14:
            return '12:30-14:00';
        case 17:
            return '14:00-17:30';
        case 18:
            return '17:30-18:30';
        case 22:
            return '18:30-22:30';
    }
}

function _getTodayDate() {
    let now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
}
