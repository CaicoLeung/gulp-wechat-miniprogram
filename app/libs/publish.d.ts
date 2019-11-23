type ISelectedSourceItem = (
  | WechatMiniprogram.GetImageInfoSuccessCallbackResult
  | WechatMiniprogram.ChooseVideoSuccessCallbackResult
) & {
  showActionSheet: boolean
  tag: string
  type: 'image' | 'video'
}

type ISelectedSourceList = ISelectedSourceItem[]

interface IChooseSourceOption {
  sourceType: Array<'album' | 'camera'>
}
