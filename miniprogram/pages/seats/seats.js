// miniprogram/pages/seats/seats.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        libraryId: '',
        date: '',
        period: '',
        seats: {
            group1: {
                seats: [
                    {
                        number: 1,
                        booked: false,
                        group: 1
                    },
                    {
                        number: 2,
                        booked: false,
                        group: 1
                    },
                    {
                        number: 3,
                        booked: false,
                        group: 1
                    },
                    {
                        number: 4,
                        booked: false,
                        group: 1
                    },
                    {
                        number: 5,
                        booked: false,
                        group: 1
                    },
                ]
            },
            group2: {
                seats: [
                    {
                        number: 1,
                        booked: false,
                        group: 2
                    },
                    {
                        number: 2,
                        booked: false,
                        group: 2
                    },
                    {
                        number: 3,
                        booked: false,
                        group: 2
                    },
                    {
                        number: 4,
                        booked: false,
                        group: 2
                    },
                    {
                        number: 5,
                        booked: false,
                        group: 2
                    },
                ]
            },
            group3: {
                seats: [
                    {
                        number: 1,
                        booked: false,
                        group: 3
                    },
                    {
                        number: 2,
                        booked: false,
                        group: 3
                    },
                    {
                        number: 3,
                        booked: false,
                        group: 3
                    },
                    {
                        number: 4,
                        booked: false,
                        group: 3
                    },
                    {
                        number: 5,
                        booked: false,
                        group: 3
                    },
                ]
            },
            group4: {
                seats: [
                    {
                        number: 1,
                        booked: false,
                        group: 4
                    },
                    {
                        number: 2,
                        booked: false,
                        group: 4
                    },
                    {
                        number: 3,
                        booked: false,
                        group: 4
                    },
                    {
                        number: 4,
                        booked: false,
                        group: 4
                    },
                    {
                        number: 5,
                        booked: false,
                        group: 4
                    },
                ]
            },
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            libraryId: options.libraryId,
            date: options.date,
            period: options.period
        })
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
    onSeatTaped(e) {
        let seat = e.currentTarget.dataset.seat;
        console.log(seat);
    }
})
