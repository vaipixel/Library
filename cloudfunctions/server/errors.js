class ServerError extends Error {
    constructor(errorEnum) {
        super();
        this.code = errorEnum.code;
        this.message = errorEnum.message;
    }

    getErrorResponse() {
        return {
            code: this.code,
            message: this.message
        };
    }
}

class ErrorEnum {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
}

const errors = {

    // 用户异常 3000 ～ 3999
    USER_ALREADY_EXIST: new ErrorEnum(3000, '用户已经存在'),
    USER_AUTH_FAILED: new ErrorEnum(3001, '用户鉴权失败'),
    USER_HAD_BLOCKED: new ErrorEnum(3002, '用户本月违约超过 3 次，已被封禁'),

    // 预约异常 4000 ～ 4999
    SEAT_ALREADY_BOOKED: new ErrorEnum(4000, '座位已经被预约'),
    APPOINT_HAD_EXPIRED: new ErrorEnum(4001, '预约已经失效'),
};

function throwError(error) {
    throw new ServerError(error);
}

module.exports = {
    throwError,
    errors,
    ErrorEnum,
    ServerError
}
