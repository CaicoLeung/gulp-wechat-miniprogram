interface IActionsheetOption {
  sizeType: string[]
  sourceType: string[]
}

Page({
  data: {
    selectedImageList: []
  },
  selectLocalPhotoHander (actionOption: IActionsheetOption) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res: WechatMiniprogram.ChooseImageSuccessCallbackResult) {
        const selectedImageList = this.data.selectedImageList.concat(res.tempFilePaths)
        this.setData({ selectedImageList })
      }
    })
  },
  showActionSheet () {
    const actionOption: IActionsheetOption = {
      sizeType: ['original'],
      sourceType: ['camera']
    }
    const self = this
    wx.showActionSheet({
      itemList: [
        '拍摄照片',
        '拍摄视频',
        '从手机相册选择照片',
        '从手机相册选择视频'
      ],
      itemColor: '#333333',
      success (res: WechatMiniprogram.ShowActionSheetSuccessCallbackResult) {
        self.selectLocalPhotoHander(actionOption)
      }
    })
  }
})
