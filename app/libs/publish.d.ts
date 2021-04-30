export type ISelectedSourceItem = (
  | WechatMiniprogram.GetImageInfoSuccessCallbackResult
  | WechatMiniprogram.ChooseVideoSuccessCallbackResult
) & {
  showActionSheet: boolean
  tag: string
  type: 'image' | 'video'
}

export type ISelectedSourceList = ISelectedSourceItem[]

export interface IChooseSourceOption {
  sourceType: Array<'album' | 'camera'>
}
