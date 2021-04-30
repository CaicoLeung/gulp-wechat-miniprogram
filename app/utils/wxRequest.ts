import { IResponseType, IWechatRequestMethods } from '../libs'
import config from '../config/index'

export default <T = unknown>(url: string, method: IWechatRequestMethods, data: string | WechatMiniprogram.IAnyObject | ArrayBuffer): Promise<IResponseType<T>> => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.urlPrefix + url,
      method,
      header: {
        'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded'
      },
      data,
      success(res: WechatMiniprogram.RequestSuccessCallbackResult) {
        console.warn('[HTTP状态码]: ', res.statusCode)
        const data = res.data as IResponseType<T>
        if (data.code === 200) {
          resolve(data)
        } else {
          wx.showToast({
            title: data.msg,
            icon: 'none'
          })
          reject(data.msg)
        }
      },
      fail(error: WechatMiniprogram.GeneralCallbackResult) {
        reject(error.errMsg)
      }
    })
  })
}
