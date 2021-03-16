// miniprogram/pages/register/register.js
const {register} = require('../../requests');
const {isEmpty} = require('../../utils/str_utils');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: '',
        passwd: ''
    },
    async onRegister() {
        console.log(1231)
        let error;
        if (isEmpty(this.data.passwd)) {
            error = '密码必填'
        }
        if (isEmpty(this.data.userName)) {
            error = '用户名必填'
        }
        if (error) {
            this.setData({
                error: error
            });
            console.log(231)
            return
        }

        wx.showLoading({
            mask: true
        });
        let response = await register(this.data.userName, this.data.passwd);
        wx.hideLoading();
        if (response.code === 200) {
            wx.setStorage({
                key: 'userInfo',
                data: response.data
            });
            wx.showToast({
                title: '注册成功'
            });
            setTimeout(() => {
                wx.navigateBack();
            }, 500);
        } else {
            this.setData({
                error: response.message
            });
        }
    }
})
