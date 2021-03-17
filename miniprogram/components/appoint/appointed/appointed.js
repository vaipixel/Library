// components/appoint/appointed/appointed.js
const {getUserAppointRecords} = require('../../../requests');
const userHolder = require('../../../user_holder');
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    records:[],
    isLoading: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
      }
  },
  lifetimes: {
    async attached() {
      this.showLoading();
      let userId = await userHolder.getUserId();
      let records = (await getUserAppointRecords(userId, ['finished', 'noncompliance'])).data;
      this.setData({
        records
      });
      console.log(records)
      this.hideLoading();
    }
  }
})
