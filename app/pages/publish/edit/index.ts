
type ISelectedImageList = Array<(WechatMiniprogram.GetImageInfoSuccessCallbackResult | null) & {
  showActionSheet: boolean
  tag: string
}>

Page({
  data: {
    selectedImageList: [],
    swiperCurrentIndex: 0,
    tagList: ['翡翠', '玛瑙', '宝石', '么么哒']
  },
  onReady () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('getSelectedImageList', (data: {
      selectedImageList: Array<(WechatMiniprogram.GetImageInfoSuccessCallbackResult | null) & {showActionSheet: boolean}>
    }) => {
      const selectedImageList = data.selectedImageList.map(i => ({ ...i, showActionSheet: false, tag: '' }))
      this.setData({ selectedImageList })
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
    this.setData({ swiperCurrentIndex: current })
  },
  showActionSheetHander () {
    const selectedImageList: ISelectedImageList = [].concat(this.data.selectedImageList)
    selectedImageList[this.data.swiperCurrentIndex].showActionSheet = true
    this.setData({ selectedImageList })
  },
  hideActionSheetHander (callback: () => {}) {
    const selectedImageList: ISelectedImageList = [].concat(this.data.selectedImageList)
    selectedImageList[this.data.swiperCurrentIndex].showActionSheet = false
    this.setData({ selectedImageList }, callback)
  },
  selectTagHander ({
    currentTarget: {
      dataset = { tag: '' }
    }
  }) {
    const { tag } = dataset
    const selectedImageList: ISelectedImageList = [].concat(this.data.selectedImageList)
    selectedImageList[this.data.swiperCurrentIndex].tag = tag
    this.hideActionSheetHander(() => (this.setData({ selectedImageList })))
  },
  deleteTagHander () {
    const selectedImageList: ISelectedImageList = [].concat(this.data.selectedImageList)
    selectedImageList[this.data.swiperCurrentIndex].tag = ''
    this.setData({ selectedImageList })
  }
})
