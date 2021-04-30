Page({
  data: {
    motto: 'Hello CaicoLeung!',
    userInfo: {}
  },
  onLoad(query) {
    console.log('page参数: ', query)
  },
  onShow() {
    // 自定义Tabbar所需
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})
