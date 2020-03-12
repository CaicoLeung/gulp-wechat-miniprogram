
const app = getApp<IAppOption>()

Component({
  properties: {
    disabled: {
      type: Boolean,
      value: false
    }
  },
  data: {
    isUserInfoUpdate: false
  },
  lifetimes: {
    attached() {
      this.setData({ isUserInfoUpdate: app.globalData.userInfo.is_updated })
    }
  },
  methods: {
    submit() {
      if (this.data.isUserInfoUpdate) {
        this.triggerEvent('submit')
      }
    },
    updateUserInfo() {
      void 0
    }
  }
})
