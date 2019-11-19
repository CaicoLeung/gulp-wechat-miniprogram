Page({
  data: {
    isInto: false
  },
  onShow (): void {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1
      })
    }
    this.togglePage()
  },
  togglePage () {
    if (this.data.isInto) {
      wx.switchTab({
        url: '/pages/home/index'
      })
    } else {
      wx.navigateTo({
        url: '/pages/publish/main/index'
      })
    }
    this.setData({
      isInto: !this.data.isInto
    })
  }
})
