import { IAppOption } from '../../libs'

const app = getApp<IAppOption>()

export default Component({
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
      this.setData({ isUserInfoUpdate: !!app.globalData.userInfo })
    }
  },
  methods: {
    submit() {
      if (this.data.isUserInfoUpdate) {
        this.triggerEvent('submit')
      }
    }
  }
})
