
interface IChooseSourceOption {
  sourceType: Array<'album' | 'camera'>
}

Page({
  data: {
    selectedImageList: [],
    selectedVideo: {
      height: 750,
      src: ''
    }
  },
  selectLocalPhotoHander (actionOption: IChooseSourceOption) {
    const self = this
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: actionOption.sourceType,
      success (res: WechatMiniprogram.ChooseImageSuccessCallbackResult) {
        const selectedImageList = self.data.selectedImageList.concat(res.tempFilePaths)
        self.setData({ selectedImageList })
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
        console.log(res)
        self.setData({ selectedVideo: {
          height: 750 / (res.width / res.height),
          src: res.tempFilePath
        }})
      }
    })
  },
  showActionSheet () {
    const actionOption: IChooseSourceOption = {
      sourceType: ['camera']
    }
    const { selectLocalPhotoHander, selectLocalViseoHander } = this
    wx.showActionSheet({
      itemList: [
        '拍摄照片',
        '拍摄视频',
        '从手机相册选择照片',
        '从手机相册选择视频'
      ],
      itemColor: '#333333',
      success (res: WechatMiniprogram.ShowActionSheetSuccessCallbackResult) {
        switch (res.tapIndex) {
        case 0:
          actionOption.sourceType = ['camera']
          selectLocalPhotoHander(actionOption)
          break
        case 1:
          actionOption.sourceType = ['camera']
          selectLocalViseoHander(actionOption)
          break
        case 2:
          actionOption.sourceType = ['album']
          selectLocalPhotoHander(actionOption)
          break
        case 3:
          actionOption.sourceType = ['album']
          selectLocalViseoHander(actionOption)
          break
        default:
          actionOption.sourceType = ['camera']
          selectLocalPhotoHander(actionOption)
        }
      }
    })
  }
})
