/// <reference path="../../node_modules/miniprogram-api-typings/index.d.ts" />
/// <reference path="./publish.d.ts" />

type IWechatRequestMethods = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

interface IResponseType<T> {
  code: number
  msg: string
  obj: T
}

interface IAppOption {
  globalData: {
    userInfo?: {
      is_updated: boolean
    }
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
