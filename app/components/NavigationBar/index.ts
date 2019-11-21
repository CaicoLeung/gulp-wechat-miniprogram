const app = getApp<IAppOption>()

export default Component({
  options: {
    multipleSlots: true,
    addGlobalClass: true
  },
  properties: {
    extClass: {
      type: String,
      value: ''
    },
    background: {
      type: String,
      value: 'rgba(255, 255, 255, 1)',
      observer () {
        this.setStyle()
      }
    },
    backgroundColorTop: {
      type: String,
      value: 'rgba(255, 255, 255, 1)'
    },
    color: {
      type: String,
      value: 'rgba(0, 0, 0, 1)'
    },
    title: {
      type: String,
      value: ''
    },
    searchText: {
      type: String,
      value: '点我搜索'
    },
    searchBar: {
      type: Boolean,
      value: false
    },
    back: {
      type: Boolean,
      value: true
    },
    home: {
      type: Boolean,
      value: false
    },
    delete: {
      type: Boolean,
      value: false
    },
    iconTheme: {
      type: String,
      value: 'black'
    },
    delta: {
      type: Number,
      value: 1
    }
  },
  data: {
    navigationbarinnerStyle: '',
    navBarLeft: 0,
    navBarHeight: 0,
    capsulePosition: 0,
    navBarExtendHeight: 0,
    isIOS: false
  },
  attached () {
    this.setStyle() //设置样式
  },
  methods: {
    setStyle () {
      const {
        statusBarHeight,
        navBarHeight,
        capsulePosition,
        navBarExtendHeight,
        isIOS,
        windowWidth
      } = app.globalData.globalSystemInfo
      const { back, home, title } = this.data
      const rightDistance = windowWidth - capsulePosition.right //胶囊按钮右侧到屏幕右侧的边距
      const leftWidth = windowWidth - capsulePosition.left //胶囊按钮左侧到屏幕右侧的边距

      const navigationbarinnerStyle = [
        `color: ${this.data.color}`,
        `background: ${this.data.background}`,
        `height:${navBarHeight + navBarExtendHeight}px`,
        `padding-top:${statusBarHeight}px`,
        `padding-right:${leftWidth}px`,
        `padding-bottom:${navBarExtendHeight}px`
      ].join(';')
      let navBarLeft: string
      if ((back && !home) || (!back && home)) {
        navBarLeft = [`width:${capsulePosition.width}px`, `height:${capsulePosition.height}px`].join(';')
      } else if ((back && home) || title) {
        navBarLeft = [
          `width:${capsulePosition.width}px`,
          `height:${capsulePosition.height}px`,
          `margin-left:${rightDistance}px`
        ].join(';')
      } else {
        navBarLeft = ['width:auto', 'margin-left:0px'].join(';')
      }
      this.setData({
        navigationbarinnerStyle,
        navBarLeft,
        navBarHeight,
        capsulePosition,
        navBarExtendHeight,
        isIOS
      })
    },
    // 返回事件
    back () {
      this.triggerEvent('back', { delta: this.data.delta })
    },
    home () {
      this.triggerEvent('home', {})
    },
    search () {
      this.triggerEvent('search', {})
    },
    delete () {
      this.triggerEvent('delete', {})
    }
  }
})
