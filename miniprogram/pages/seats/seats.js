// miniprogram/pages/seats/seats.js
const {appointSeat, getLibrarySeatBookedInfo} = require('../../requests');
const userHolder = require('../../user_holder');
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
        },
        currentSeat: {},
        isLoading: false,
        isAppointDialogShow: false,
        appointSeatDialogMsg: '',
        dialogButtons: [
            {
                text: '取消'
            },
            {
                text: '确认'
            }
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            libraryId: options.libraryId,
            date: new Date(options.date),
            period: options.period
        });

        this.requestSeatBookedStatus();
    },
    async requestSeatBookedStatus() {
        this.showLoading();
        let query = {
            libraryId: this.data.libraryId,
            date: this.data.date,
            period: this.data.period
        }
        let result = (await getLibrarySeatBookedInfo(query)).data;
        result.forEach(appoint => {
            let group = this.data.seats[this.getGroupKey(appoint.groupNumber)];
            group.seats.forEach(seat => {
                if (seat.number === appoint.seatNumber) {
                    seat.booked = true;
                }
            });
        });
        this.setData({
            seats: this.data.seats
        });
        this.hideLoading();
    },
    async onSeatTaped(e) {
        let seat = e.currentTarget.dataset.seat;
        if (seat.booked) {
            console.log('this seat had booked');
            return;
        }
        this.data.currentSeat = seat;
        this.setData({
            isAppointDialogShow: true,
            appointSeatDialogMsg: `确定预定 ${seat.group}-${seat.number} 座吗？`
        })
    },
    async startAppointSeat() {
        let seat = this.data.currentSeat;
        let userId = await userHolder.getUserId();
        let appoint = {
            libraryId: this.data.libraryId,
            groupNumber: seat.group,
            seatNumber: seat.number,
            date: this.data.date,
            period: this.data.period,
            userId
        };
        this.showLoading();
        let appointResult = (await appointSeat(appoint));
        if (appointResult.code !== 200) {
            this.setData({
                error: appointResult.message
            });
        }
        this.requestSeatBookedStatus();
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
    getGroupKey(groupNumber) {
        switch (groupNumber) {
            case 1:
                return 'group1';
            case 2:
                return 'group2';
            case 3:
                return 'group3';
            case 4:
                return 'group4';
        }
    },
    onAppointDialogButtonTaped(e) {
        this.setData({
            isAppointDialogShow: false
        });
        let index = e.detail.index;
        if (index === 1) {
            this.startAppointSeat();
        }
    },
})
