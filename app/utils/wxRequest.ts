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
        const result = res.data as IResponseType<T>
        if (result.code === 200) {
          resolve(result)
        } else {
          wx.showToast({
            title: result.msg,
            icon: 'none'
          })
          reject(result.msg)
        }
      },
      fail(error: WechatMiniprogram.GeneralCallbackResult) {
        reject(error.errMsg)
      }
    })
  })
}
