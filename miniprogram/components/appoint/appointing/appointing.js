// components/appoint/appointing/appointing.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {},

    /**
     * 组件的初始数据
     */
    data: {
        records: [
            {
                library: {
                    _id: '1',
                    name: '梁林校区医学院图书馆',
                    seat: '1-1'
                },
                time: '08:00-12:30'
            }
        ],
        dialogButtons: [
            {
                text: '取消'
            },
            {
                text: '确认'
            }
        ],
        isCheckInInvalid: false,
        checkInInvalidMsg: ''
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
            let checkInResult = {};
            try {
                checkInResult = JSON.parse(result.result);
            } catch (e) {
                this.setData({
                    isCheckInInvalid: true,
                    checkInInvalidMsg: '二维码无效，是否重试？'
                });
                return;
            }
            if (checkInResult.library !== currentRecord.library._id
                || checkInResult.seat !== currentRecord.library.seat) {
                this.setData({
                    isCheckInInvalid: true,
                    checkInInvalidMsg: '座位错误，是否重试？'
                });
                return;
            }
            // check in
            console.log('check in success');
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
        checkOut(e) {

        }
    }
})
