Page({
  data: {
    selectedImageList: [],
    swiperCurrentIndex: 0
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
  },
  swiperChangeHander ({
    detail: { current = 0 }
  }) {
    console.log(current)
    this.setData({ swiperCurrentIndex: current })
  }
})
// selected == index ? 'color:#333333;font-weight:600;' : ''
// selected === index && 'color:#333333;font-weight:600;'
