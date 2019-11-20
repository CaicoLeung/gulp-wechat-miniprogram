Page({
  data: {
    selectedImageList: []
  },
  onReady () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('getSelectedImageList', (data: {
      selectedImageList: Array<WechatMiniprogram.GetImageInfoSuccessCallbackResult | null>
    }) => {
      this.setData({ selectedImageList: data.selectedImageList })
      console.log('selectedImageList: ', this.data.selectedImageList)
    })
  },
  navigationBackHander () {
    const eventChannel = this.getOpenerEventChannel()
    const self = this
    wx.navigateBack({
      success () {
        eventChannel.emit('getSelectedImageList', self.data.selectedImageList)
      }
    })
  }
})
