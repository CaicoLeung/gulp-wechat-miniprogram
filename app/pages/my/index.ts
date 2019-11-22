Page({
  data: {
    titleList:[
      {txtname:'动态'},
      {txtname:'玩物日志'},
    ],
    selsectIndex:0,
  }
  selectBtn({currentTarget: {dataset}}){
    const { index } = dataset;
    this.setData({
      selsectIndex:index
    })
  }
  onShow (): void {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      })
    }
  }
})
