// components/appoint/appointing/appointing.js
const {getUserAppointRecords, checkIn, checkOut} = require('../../../requests');
const userHolder = require('../../../user_holder');
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        records: [],
        dialogButtons: [
            {
                text: '取消'
            },
            {
                text: '确认'
            }
        ],
        isCheckInInvalid: false,
        checkInInvalidMsg: '',
        isLoading: false,
        error: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        async checkIn(currentRecord) {
            let result = await wx.scanCode({
                onlyFromCamera: true,
                scanType: ['qrCode']
            });
            let seatInfo = {};
            try {
                seatInfo = JSON.parse(result.result);
            } catch (e) {
                this.setData({
                    isCheckInInvalid: true,
                    checkInInvalidMsg: '二维码无效，是否重试？'
                });
                return;
            }
            if (seatInfo.library !== currentRecord.libraryId
                || seatInfo.seat !== currentRecord.seat) {
                this.setData({
                    isCheckInInvalid: true,
                    checkInInvalidMsg: '座位错误，是否重试？'
                });
                return;
            }
            // check in
            this.showLoading();
            let checkInResult = await checkIn(this.data.currentRecord._id);
            if (checkInResult.code !== 200) {
                this.setData({
                    error: checkInResult.message
                });
            }
            this.requestRecords();
        },
        onCheckInInvalidDialogButtonTaped(e) {
            this.setData({
                isCheckInInvalid: false
            });
            let index = e.detail.index;
            if (index === 1) {
                this.checkIn(this.data.currentRecord);
            }
        },
        onCheckInTaped(e) {
            let currentRecord = e.currentTarget.dataset.record;
            this.setData({
                currentRecord: currentRecord
            })
            this.checkIn(currentRecord)
        },
        async checkOut(e) {
            let currentRecord = e.currentTarget.dataset.record;
            this.setData({
                currentRecord: currentRecord
            })
            this.showLoading();
            let checkOutResult = await checkOut(this.data.currentRecord._id);
            if (checkOutResult.code !== 200) {
                this.setData({
                    error: checkOutResult.message
                });
            }
            this.requestRecords();
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
        async requestRecords() {
            this.showLoading();
            let userId = await userHolder.getUserId();
            let records = (await getUserAppointRecords(userId, ['pending', 'processing'])).data;
            this.setData({
                records
            });
            console.log(records);
            this.hideLoading();
        }
    },
    lifetimes: {
        async attached() {
            this.requestRecords();
        }
    }
})
