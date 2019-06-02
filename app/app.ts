/// <reference path="../typings/index.d.ts" />
export interface IMyApp {
  userInfoReadyCallback?(res: wx.UserInfo): void;
  globalData: {
    userInfo?: wx.UserInfo
  }
}

App({
  onLaunch() {
    let logs: number[] = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs);

    wx.login({
      success(_res: wx.LoginSuccessCallbackResult) {
        console.log(_res.code);
      }
    });

    wx.getSetting({
      success(_res: wx.GetSettingSuccessCallbackResult) {
        if(_res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (res: wx.GetUserInfoSuccessCallbackResult) => {
              this.globalData.userInfo = res.userInfo;
              if(this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res.userInfo);
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    
  }
})