Page({
  data: {
    selectedSourceList: [],
    swiperCurrentIndex: 0,
    tagList: ['翡翠', '玛瑙', '宝石', '么么哒'],
    showConfirmActionSheet: false
  },
  onLoad () {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('getSelectedSourceListFromMain', (data: {
      selectedSourceList: ISelectedSourceList
      swiperCurrentIndex: number
    }) => {
      this.setData({
        selectedSourceList: data.selectedSourceList,
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
        eventChannel.emit('getSelectedSourceListFromEdit', self.data.selectedSourceList)
      }
    })
  },
  swiperChangeHander ({
    detail: { current = 0 }
  }) {
    this.setData({ swiperCurrentIndex: current })
  },
  showActionSheetHander () {
    const selectedSourceList: ISelectedSourceList = [].concat(this.data.selectedSourceList)
    selectedSourceList[this.data.swiperCurrentIndex].showActionSheet = true
    this.setData({ selectedSourceList })
  },
  hideActionSheetHander (callback: () => {}) {
    const selectedSourceList: ISelectedSourceList = [].concat(this.data.selectedSourceList)
    selectedSourceList[this.data.swiperCurrentIndex].showActionSheet = false
    this.setData({ selectedSourceList }, callback)
  },
  selectTagHander ({
    currentTarget: {
      dataset = { tag: '' }
    }
  }) {
    const { tag } = dataset
    const selectedSourceList: ISelectedSourceList = [].concat(this.data.selectedSourceList)
    selectedSourceList[this.data.swiperCurrentIndex].tag = tag
    this.hideActionSheetHander(() => (this.setData({ selectedSourceList })))
  },
  deleteTagHander () {
    const selectedSourceList: ISelectedSourceList = [].concat(this.data.selectedSourceList)
    selectedSourceList[this.data.swiperCurrentIndex].tag = ''
    this.setData({ selectedSourceList })
  },
  deleteCurrentSourceHander () {
    const selectedSourceList: ISelectedSourceList = [].concat(this.data.selectedSourceList)
    selectedSourceList.splice(this.data.swiperCurrentIndex, 1)
    if (this.data.swiperCurrentIndex === selectedSourceList.length) {
      this.setData({ swiperCurrentIndex: this.data.swiperCurrentIndex - 1 })
    }
    this.setData({ selectedSourceList }, this.hideConfirmActionSheetHander)
    if (!this.data.selectedSourceList.length) {
      this.complateEditHander()
    }
  },
  showConfirmActionSheetHander () {
    this.setData({ showConfirmActionSheet: true })
  },
  hideConfirmActionSheetHander () {
    this.setData({ showConfirmActionSheet: false })
  }
})
