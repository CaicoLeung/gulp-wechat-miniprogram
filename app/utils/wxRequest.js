import config from '../config/index'

export default (url, method, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: config.urlPrefix + url,
      method,
      header: {
        'content-type': method === 'GET' ? 'application/json' : 'application/x-www-form-urlencoded'
      },
      data,
      success(res) {
        console.warn('[HTTP状态码]: ', res.statusCode)
        const result = res.data
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
      fail(error) {
        reject(error.errMsg)
      }
    })
  })
}
