// miniprogram/pages/library/library.js
const {getLibraryAppointInfo} = require('../../requests');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        libraryId: '',
        libraryName: '',
        days: [],
        isLoading: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            libraryId: options.libraryId,
            libraryName: options.libraryName
        });
        this.generateDays();
        wx.setNavigationBarTitle({
            title: this.data.libraryName
        });

    },
    onShow() {
        this.requestAppointInfo();
    },
    async requestAppointInfo() {
        this.showLoading();
        let appointInfo = (await getLibraryAppointInfo(this.data.libraryId)).data;
        appointInfo.forEach(appoint => {
            this.data.days.forEach(day => {
                if (appoint.dateStr === day.dateStr) {
                    appoint.periodCount.forEach(appointPeriod => {
                        day.periods.forEach(dayPeriod => {
                            if (appointPeriod._id === dayPeriod.period) {
                                console.log('2342134')
                                dayPeriod.bookStatus = `${appointPeriod.count}/20`
                            }
                        })
                    })
                }
            })
        });
        this.setData({
            days: this.data.days
        });
        this.hideLoading();
    },
    generateDays() {
        let days = [];
        let today = new Date();
        for (let i = 0; i < 7; i++) {
            let periods = [
                {
                    period: '08:00-12:30',
                    bookStatus: '0/20'
                }, {
                    period: '12:30-14:00',
                    bookStatus: '0/20'
                }, {
                    period: '14:00-17:30',
                    bookStatus: '0/20'
                }, {
                    period: '17:30-18:30',
                    bookStatus: '0/20'
                }, {
                    period: '18:30-22:30',
                    bookStatus: '0/20'
                },
            ]
            let date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
            days.push({
                date: date.toString(),
                dateStr: `${date.getMonth() + 1}-${date.getDate()}`,
                week: this.getWeak(date.getDay()),
                periods
            });
        }
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
    },
    showLoading() {
        if (this.data.isLoading) {
            return
        }
        this.data.isLoading = true;
        wx.showLoading({
            mask: true
        });
    },
    hideLoading() {
        this.data.isLoading = false;
        wx.hideLoading();
    },
})
