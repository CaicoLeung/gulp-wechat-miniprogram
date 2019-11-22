// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    treasureList: [
      { goodsname: '翡翠' },
      { goodsname: '和田玉' },
      { goodsname: '玛瑙' },
      { goodsname: '南红' },
      { goodsname: '宝典' },
      { goodsname: '钻石' },
      { goodsname: '黄金' },
      { goodsname: '书画' }
    ]
  },
  onLoad () {
    console.log(111)
  },
  onShow (): void {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  },
  getUserInfo ({
    detail = {
      userInfo: {}
    }
  }) {
    app.globalData.userInfo = detail.userInfo
    this.setData({
      userInfo: detail.userInfo,
      hasUserInfo: true
    })
  }
})
