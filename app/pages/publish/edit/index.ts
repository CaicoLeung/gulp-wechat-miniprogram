Page({
  data: {
    selectedImageList: [],
    swiperCurrentIndex: 0,
    tagList: ['翡翠', '玛瑙', '宝石', '么么哒'],
    showConfirmActionSheet: false
  },
  onReady () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('getSelectedImageList', (data: {
      selectedImageList: ISelectedImageList
      swiperCurrentIndex: number
    }) => {
      const selectedImageList = data.selectedImageList.map(i => ({ ...i, showActionSheet: false, tag: '' }))
      this.setData({
        selectedImageList,
        swiperCurrentIndex: data.swiperCurrentIndex
      })
      console.log('data: ', data)
    })
  },
  navigationBackHander () {
    wx.navigateBack()
  },
  complateEditHander () {
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
  },
  deleteCurrentSourceHander () {
    const selectedImageList: ISelectedImageList = [].concat(this.data.selectedImageList)
    selectedImageList.splice(this.data.swiperCurrentIndex, 1)
    if (this.data.swiperCurrentIndex === selectedImageList.length) {
      this.setData({ swiperCurrentIndex: this.data.swiperCurrentIndex - 1 })
    }
    this.setData({ selectedImageList }, this.hideConfirmActionSheetHander)
  },
  showConfirmActionSheetHander () {
    this.setData({ showConfirmActionSheet: true })
  },
  hideConfirmActionSheetHander () {
    this.setData({ showConfirmActionSheet: false })
  },
})
