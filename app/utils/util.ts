const formatNumber = (n: number) => {
  const str = n.toString()
  return str[1] ? str : '0' + str
}

export const formatTime = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

export const WXGetImageInfoAsync = (src: string): Promise<ISelectedSourceItem> => {
  return new Promise<ISelectedSourceItem>((resolve, reject) => {
    wx.getImageInfo({
      src,
      success (res: WechatMiniprogram.GetImageInfoSuccessCallbackResult) {
        resolve({
          ...res,
          showActionSheet: false,
          tag: '',
          type: 'image'
        })
      },
      fail (error) {
        reject(error)
      }
    })
  })
}
