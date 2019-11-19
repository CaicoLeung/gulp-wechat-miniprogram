
Page({
  data: {
    selectedImageList: []
  },
  selectLocalPhotoHander () {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res: WechatMiniprogram.ChooseImageSuccessCallbackResult) {
        const selectedImageList = this.data.selectedImageList.concat(res.tempFilePaths)
        this.setData({ selectedImageList })
      }
    })
  }
})
