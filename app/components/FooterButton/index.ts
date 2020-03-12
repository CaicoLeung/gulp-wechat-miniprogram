import { getSignature } from '../../utils/index'
import api from '../../api/index'

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
    async updateUserInfo(e: { detail: WechatMiniprogram.GetUserInfoSuccessCallbackResult }) {
      if (e.detail.errMsg !== 'getUserInfo:ok') return
      try {
        const params = getSignature({
          c_p: app.globalData.c_p,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv
        })
        const { obj } = await api.userUpdate(params)
        this.setData({ isUserInfoUpdate: !!obj.is_updated }, () => {
          app.globalData.userInfo = obj
          app.globalData.c_p.user_code = obj.user_code
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
})
