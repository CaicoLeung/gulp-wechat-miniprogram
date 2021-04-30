export type IWechatRequestMethods = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

export interface IResponseType<T> {
  code: number
  msg: string
  obj: T
}

export interface IAppOption {
  globalData: {
    userInfo?: Pick<WechatMiniprogram.UserInfo, 'nickName'>
    globalSystemInfo?: {
      navBarHeight: number
      capsulePosition: WechatMiniprogram.Rect
      isIOS: boolean
      navBarExtendHeight: number
    } & WechatMiniprogram.SystemInfo
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback
  WXLoginHander(): void
  WXGetSettingHander(): void
  getSystemInfoHander(): void
}
