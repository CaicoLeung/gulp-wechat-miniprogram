Component({
  data: {
    selected: 0,
    color: '#4A4A4A',
    selectedColor: '#FF335F',
    list: [
      {
        pagePath: '/pages/home/index',
        iconPath: '/assets/img/tabbar/faxian@2x.png',
        selectedIconPath: '/assets/img/tabbar/faxian-select@2x.png',
        text: '首页'
      },
      {
        pagePath: '/pages/publish/index',
        iconPath: '/assets/img/tabbar/fabu-select@2x.png',
        selectedIconPath: '/assets/img/tabbar/fabu-select@2x.png',
        text: ''
      },
      {
        pagePath: '/pages/my/index',
        iconPath: '/assets/img/tabbar/wode-not@2x.png',
        selectedIconPath: '/assets/img/tabbar/wode@2x.png',
        text: '我的'
      }
    ],
    showRedDot: false
  },
  methods: {
    switchTab({
      currentTarget: {
        dataset = { index: 0, path: '' }
      }
    }) {
      const self = this
      wx.switchTab({
        url: dataset.path,
        success() {
          self.setData({ selected: dataset.index })
        }
      })
    }
  }
})
