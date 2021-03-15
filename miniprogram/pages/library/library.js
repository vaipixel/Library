// miniprogram/pages/library/library.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        libraryId: '',
        days: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            libraryId: options.libraryId
        });
        this.generateDays();
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
    generateDays() {
        let periods = [
            '08:00-12:30',
            '12:30-14:00',
            '14:00-17:30',
            '17:30-18:30',
            '18:30-22:30',
        ]
        let days = [];
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
            days.push({
                date: date,
                dateStr: `${date.getMonth() + 1}-${date.getDate()}`,
                week: this.getWeak(date.getDay()),
                periods
            })
        }
        console.log(days);
        this.setData({
            days
        })
    },
    getWeak(day) {
        switch (day) {
            case 0:
                return '星期日';
            case 1:
                return '星期一';
            case 2:
                return '星期二';
            case 3:
                return '星期三';
            case 4:
                return '星期四';
            case 5:
                return '星期五';
            case 6:
                return '星期六';
        }
    }
})
