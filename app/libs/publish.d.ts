type ISelectedImageItem = (WechatMiniprogram.GetImageInfoSuccessCallbackResult | null) & {
  showActionSheet: boolean
  tag: string
}

type ISelectedImageList = ISelectedImageItem[]

interface IChooseSourceOption {
  sourceType: Array<'album' | 'camera'>
}
