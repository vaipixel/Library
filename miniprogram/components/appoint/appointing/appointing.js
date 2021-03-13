// components/appoint/appointing/appointing.js
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
    records:[
      {
        library: {
          name: '梁林校区医学院图书馆'
        },
        time: '08:00-12:30'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    signIn() {
      wx.scanCode({
        onlyFromCamera: true,
        scanType: ['qrCode'],
        success: result => {
          
        }
      })
    }
  }
})
