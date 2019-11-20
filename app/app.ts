/// <reference path="../node_modules/miniprogram-api-typings/index.d.ts" />
interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo
    globalSystemInfo?: {
      navBarHeight: number
      capsulePosition: WechatMiniprogram.Rect
      isIOS: boolean
      navBarExtendHeight: number
    } & WechatMiniprogram.GetSystemInfoSyncResult
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
  WXLoginHander(): void
  WXGetSettingHander(): void
  getSystemInfoHander(): void
}

App<IAppOption>({
  globalData: {},
  onLaunch () {
    this.getSystemInfoHander()
    this.WXLoginHander()
    this.WXGetSettingHander()
  },
  WXLoginHander () {
    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  WXGetSettingHander () {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getSystemInfoHander () {
    const systemInfo: WechatMiniprogram.GetSystemInfoSyncResult = wx.getSystemInfoSync()
    const isIOS = !!(systemInfo.system.toLowerCase().search('ios') + 1)
    let rect: WechatMiniprogram.Rect
    try {
      rect = wx.getMenuButtonBoundingClientRect()
    } catch (error) {
      let gap: number //胶囊按钮上下间距 使导航内容居中
      let width = 96 //胶囊的宽度
      if (systemInfo.platform === 'android') {
        gap = 8
        width = 96
      } else if (systemInfo.platform === 'devtools') {
        if (isIOS) {
          gap = 5.5 //开发工具中IOS手机
        } else {
          gap = 7.5 //开发工具中android和其他手机
        }
      } else {
        gap = 4
        width = 88
      }
      if (!systemInfo.statusBarHeight) {
        //开启wifi的情况下修复statusBarHeight值获取不到
        systemInfo.statusBarHeight = systemInfo.screenHeight - systemInfo.windowHeight - 20
      }
      rect = {
        //获取不到胶囊信息就自定义重置一个
        bottom: systemInfo.statusBarHeight + gap + 32,
        height: 32,
        left: systemInfo.windowWidth - width - 10,
        right: systemInfo.windowWidth - 10,
        top: systemInfo.statusBarHeight + gap,
        width: width
      }
      console.error('getMenuButtonBoundingClientRect Error', error)
    }
    const navBarHeight = 2 * rect.top - systemInfo.statusBarHeight + rect.height
    this.globalData.globalSystemInfo = {
      navBarHeight,//导航栏高度不包括statusBarHeight
      capsulePosition: rect,//右上角胶囊按钮信息bottom: 58 height: 32 left: 317 right: 404 top: 26 width: 87 目前发现在大多机型都是固定值 为防止不一样所以会使用动态值来计算nav元素大小
      isIOS,//是否isIOS
      navBarExtendHeight: isIOS ? 4 : 0,
      ...systemInfo
    } //将信息保存到全局变量中
  }
})
