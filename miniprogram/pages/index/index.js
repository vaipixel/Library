// miniprogram/pages/index/index.js
const userHolder = require('../../user_holder');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0,
        index: [
            {
                "text": "主页",
                "iconPath": "/assets/images/tab_home.svg",
                "selectedIconPath": "/assets/images/tab_home_active.svg",
            },
            {
                "text": "预约记录",
                "iconPath": "/assets/images/tab_appoint.svg",
                "selectedIconPath": "/assets/images/tab_appoint_active.svg",
            },
            {
                "text": "我的",
                "iconPath": "/assets/images/tab_me.svg",
                "selectedIconPath": "/assets/images/tab_me_active.svg",
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        let userInfo = await userHolder.getUserInfo();
        if (!userInfo) {
            wx.redirectTo({
                url: '/pages/login/login'
            });
        }
    },

    onTabChange(e) {
        this.setData({
            currentIndex: e.detail.index
        })
    }
})
