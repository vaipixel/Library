// miniprogram/pages/noncompliance/noncompliance.js
const {getNoncomplianceRecord} = require('../../requests');
const userHolder = require('../../user_holder');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    thisMonth: [],
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.showLoading({
      mask: true
    });
    let userId = await userHolder.getUserId();
    let result = (await getNoncomplianceRecord(userId)).data;
    this.setData({
      thisMonth: result.thisMonth,
      history: result.history
    });
    console.log(result);
    wx.hideLoading();
  }
})
