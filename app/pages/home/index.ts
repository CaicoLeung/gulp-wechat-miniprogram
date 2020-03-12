// 获取应用实例
const app = getApp<IAppOption>()

export default Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  onLoad(query: Record<string, string | undefined>) {
    console.log('page参数: ', query)
  },
  onShow(): void {
    // 自定义Tabbar所需
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0
      })
    }
  }
})
