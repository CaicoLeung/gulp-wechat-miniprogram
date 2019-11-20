
import { WXGetImageInfoAsync } from '../../../utils/util'

interface IChooseSourceOption {
  sourceType: Array<'album' | 'camera'>
}

Page({
  data: {
    maximumImageCount: 9,
    selectedImageList: [],
    selectedVideo: '',
    actionSheetItemList: [
      '拍摄照片',
      '拍摄视频',
      '从手机相册选择照片',
      '从手机相册选择视频'
    ]
  },
  selectLocalPhotoHander (actionOption: IChooseSourceOption) {
    this.setData({ selectedVideo: '' })
    const self = this
    wx.chooseImage({
      count: self.data.maximumImageCount - self.data.selectedImageList.length,
      sizeType: ['original', 'compressed'],
      sourceType: actionOption.sourceType,
      async success (res: WechatMiniprogram.ChooseImageSuccessCallbackResult) {
        let count = 0
        let selectedImageList: Array<WechatMiniprogram.GetImageInfoSuccessCallbackResult | null> = self.data.selectedImageList

        async function Iterator () {
          if (count < res.tempFilePaths.length) {
            const result = await WXGetImageInfoAsync(res.tempFilePaths[count])
            count++
            selectedImageList = selectedImageList.concat([result])
            await Iterator()
          }
        }
        await Iterator()
        self.setData({ selectedImageList })
        self.preEditHander()
      }
    })
  },
  selectLocalViseoHander (chooseVideoOption: IChooseSourceOption) {
    this.setData({ selectedImageList: [] })
    const self = this
    wx.chooseVideo({
      maxDuration: 60,
      compressed: false,
      sourceType: chooseVideoOption.sourceType,
      success (res: WechatMiniprogram.ChooseVideoSuccessCallbackResult) {
        console.log(res)
        self.setData({ selectedVideo: res.tempFilePath })
      }
    })
  },
  showActionSheet () {
    const selectedImageLength = this.data.selectedImageList.length
    const selectedVideo = this.data.selectedVideo
    const actionSheetItemList = selectedImageLength ? ['拍摄照片', '从手机相册选择照片']
      : selectedVideo ? ['拍摄视频', '从手机相册选择视频']
        : ['拍摄照片', '拍摄视频', '从手机相册选择照片', '从手机相册选择视频']
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
  preEditHander () {
    const self = this
    wx.navigateTo({
      url: '/pages/publish/edit/index',
      events: {
        getSelectedImageList (selectedImageList: Array<WechatMiniprogram.GetImageInfoSuccessCallbackResult | null>) {
          console.log('selectedImageList: ', selectedImageList)
          self.setData({ selectedImageList })
        }
      },
      success (res) {
        res.eventChannel.emit('getSelectedImageList', { selectedImageList: self.data.selectedImageList })
      }
    })
  }
})
