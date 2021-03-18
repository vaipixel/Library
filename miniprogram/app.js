//app.js
import { promisifyAll } from 'miniprogram-api-promise';

App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'dev-0gwpl8mkeac5622f',
        env: 'test-9gx7tprlf5646d97',
        traceUser: true,
      })
    }

    this.globalData = {};

    // 使用了微信官方提供的 promise 插件,将所有的 api promise 化,并注入 wx 对象
    const wxp = {};
    promisifyAll(wx, wxp);
    wx.wxp = wxp;
  }
})
