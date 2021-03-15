// miniprogram/pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 2,
        index: [
            {
                "text": "主页",
                "iconPath": "/assets/images/tab_home.svg",
                "selectedIconPath": "/assets/images/tab_home_active.svg",
                dot: true
            },
            {
                "text": "预约记录",
                "iconPath": "/assets/images/tab_appoint.svg",
                "selectedIconPath": "/assets/images/tab_appoint_active.svg",
                badge: 'New'
            },
            {
                "text": "我的",
                "iconPath": "/assets/images/tab_me.svg",
                "selectedIconPath": "/assets/images/tab_me_active.svg",
                badge: 'New'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    onTabChange(e) {
        this.setData({
            currentIndex: e.detail.index
        })
    }
})
