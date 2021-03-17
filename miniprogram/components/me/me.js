// components/me/me.js
const userHolder = require('../../user_holder');
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
    userAvatar: '/assets/images/user.svg',
    userName: '张三',
    userCharacter: '学生'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    async attached() {
      let userInfo = await userHolder.getUserInfo();
      this.setData({
        userAvatar: userInfo.avatarUrl,
        userName: userInfo.userName
      })
    }
  }
})
