// miniprogram/pages/login/login.js
const {login} = require('../../requests');
const {isEmpty} = require('../../utils/str_utils');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userName: '',
        passwd: ''
    },

    async onLogin() {
        let error = ''
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
            return
        }

        wx.showLoading({
            mask: true
        });
        let response = await login(this.data.userName, this.data.passwd);
        wx.hideLoading();
        if (response.code === 200) {
            this.setData({
                info: '登录成功'
            });
            wx.setStorage({
                key: 'userInfo',
                data: response.data
            });
            wx.redirectTo({
                url: '/pages/index/index'
            });
        } else {
            this.setData({
                error: response.message
            });
        }
    },
    goToRegister() {
        wx.navigateTo({
            url: '/pages/register/register'
        })
    }
})
