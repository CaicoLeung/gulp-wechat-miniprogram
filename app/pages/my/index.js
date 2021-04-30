Page({
  data: {},
  onShow(): void {
    // 自定义Tabbar所需
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  }
})
