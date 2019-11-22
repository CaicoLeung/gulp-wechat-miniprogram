/// <reference path="../../node_modules/miniprogram-api-typings/index.d.ts" />
/// <reference path="./publish.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo | {}
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
