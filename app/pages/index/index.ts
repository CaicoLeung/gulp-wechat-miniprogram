/// <reference path="../../../typings/index.d.ts" />
Page({
  data: {
    motto: '点击"编译"以构建',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindViewTap() {
    wx.navigateTo({
      url: ''
    })
  },
  onLoad() {
    
  }
})