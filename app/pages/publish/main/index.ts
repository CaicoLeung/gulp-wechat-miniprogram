import { WXGetImageInfoAsync } from '../../../utils/util'

Page({
  data: {
    maximumImageCount: 9, // 可选择最多图片数量
    maximumVideoCount: 1, // 可选择最多视频数量
    selectedSourceList: [],
    selectedVideo: '',
    actionSheetItemList: [
      '拍摄照片',
      '拍摄视频',
      '从手机相册选择照片',
      '从手机相册选择视频'
    ],
    maxTitleLength: 20,
    maxTextLength: 1000,
    title: '',
    text: ''
  },
  selectLocalPhotoHander (actionOption: IChooseSourceOption) {
    const self = this
    wx.chooseImage({
      count: self.data.maximumImageCount - self.data.selectedSourceList.length,
      sizeType: ['original', 'compressed'],
      sourceType: actionOption.sourceType,
      async success (res: WechatMiniprogram.ChooseImageSuccessCallbackResult) {
        wx.showLoading({ title: '处理中' })
        let count = 0
        const swiperCurrentIndex = self.data.selectedSourceList.length
        let selectedSourceList: ISelectedSourceList = [].concat(self.data.selectedSourceList)

        async function Iterator () {
          if (count < res.tempFilePaths.length) {
            const result: ISelectedSourceItem = await WXGetImageInfoAsync(res.tempFilePaths[count])
            count++
            selectedSourceList = selectedSourceList.concat([result])
            await Iterator()
          }
        }
        await Iterator()
        self.preEditHander(selectedSourceList, swiperCurrentIndex)
      }
    })
  },
  selectLocalViseoHander (chooseVideoOption: IChooseSourceOption) {
    const self = this
    wx.chooseVideo({
      maxDuration: 60,
      compressed: false,
      sourceType: chooseVideoOption.sourceType,
      success (res: WechatMiniprogram.ChooseVideoSuccessCallbackResult) {
        const selectedSourceList: ISelectedSourceList = [
          {
            ...res,
            showActionSheet: false,
            tag: '',
            type: 'video'
          }
        ]
        self.preEditHander(selectedSourceList, 0)
      }
    })
  },
  showActionSheet () {
    const selectedImageSourceLength = this.data.selectedSourceList.filter((i: ISelectedSourceItem) => i.type === 'image').length
    if (selectedImageSourceLength === this.data.maximumImageCount) {
      wx.showModal({
        title: '提示',
        content: `最多可发布${this.data.maximumImageCount}张照片`,
        showCancel: false
      })
      return
    }
    const selectedVideoSourceLength = this.data.selectedSourceList.filter((i: ISelectedSourceItem) => i.type === 'video').length
    if (selectedVideoSourceLength === this.data.maximumVideoCount) {
      wx.showModal({
        title: '提示',
        content: `最多可发布${this.data.maximumVideoCount}个视频`,
        showCancel: false
      })
      return
    }
    const actionSheetItemList = !this.data.selectedSourceList.length ? ['拍摄照片', '拍摄视频', '从手机相册选择照片', '从手机相册选择视频']
      : selectedImageSourceLength ? ['拍摄照片', '从手机相册选择照片'] : ['拍摄视频', '从手机相册选择视频']
    this.setData({ actionSheetItemList })
    const actionOption: IChooseSourceOption = {
      sourceType: ['camera']
    }
    const { selectLocalPhotoHander, selectLocalViseoHander } = this
    wx.showActionSheet({
      itemList: this.data.actionSheetItemList,
      itemColor: '#333333',
      success ({ tapIndex = 0 }) {
        if (actionSheetItemList[tapIndex] === '拍摄照片') {
          actionOption.sourceType = ['camera']
          selectLocalPhotoHander(actionOption)
        } else if (actionSheetItemList[tapIndex] === '从手机相册选择照片') {
          actionOption.sourceType = ['album']
          selectLocalPhotoHander(actionOption)
        } else if (actionSheetItemList[tapIndex] === '拍摄视频') {
          actionOption.sourceType = ['camera']
          selectLocalViseoHander(actionOption)
        } else if (actionSheetItemList[tapIndex] === '从手机相册选择视频') {
          actionOption.sourceType = ['album']
          selectLocalViseoHander(actionOption)
        }
      }
    })
  },
  preEditHander (selectedSourceList: ISelectedSourceList, swiperCurrentIndex = 0) {
    const self = this
    wx.navigateTo({
      url: '/pages/publish/edit/index',
      events: {
        getSelectedSourceListFromEdit (selectedSourceList: ISelectedSourceList) {
          console.log('getSelectedSourceListFromEdit: ', selectedSourceList)
          self.setData({ selectedSourceList })
        }
      },
      success (res) {
        res.eventChannel.emit('getSelectedSourceListFromMain', {
          selectedSourceList,
          swiperCurrentIndex
        })
        wx.hideLoading()
      }
    })
  },
  gotoEditPage ({
    currentTarget: {
      dataset = { swipercurrentindex: 0 }
    }
  }) {
    const { swipercurrentindex } = dataset
    this.preEditHander(this.data.selectedSourceList, swipercurrentindex)
  },
  titleInputHander ({
    detail: { value = '' }
  }) {
    console.log(value)
    this.setData({ title: value })
  },
  textInputHander ({
    detail: { value = '' }
  }) {
    this.setData({ text: value })
  }
})
