const BaseService = require('./base');
const {throwError, errors} = require('../errors');
const {dao} = require('../inject');

class UserService extends BaseService {

    async login(userName, passwd) {
        let userInfos = await dao.userDao.queryUser({userName, passwd});
        if (userInfos.length === 0) {
            throwError(errors.USER_AUTH_FAILED);
        }
        return userInfos[0];
    }

    async register(userName, passwd) {
        let exist = await dao.userDao.isUserExist(userName);
        if (exist) {
            throwError(errors.USER_ALREADY_EXIST);
        }
        let user = {
            userName,
            passwd,
            avatarUrl: ''
        }
        await dao.userDao.addUser(user);
        return 'success';
    }
}

module.exports = UserService
