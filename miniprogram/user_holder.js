class UserHolder {
    async getUserId() {
        return (await this.getUserInfo())._id;
    }

    async getUserInfo() {
        try {
            return (await wx.wxp.getStorage({
                key: 'userInfo'
            })).data;
        } catch (e) {
            console.log(e)
            return undefined;
        }
    }
}

module.exports = new UserHolder();
