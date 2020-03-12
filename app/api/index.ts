import httpRequest from '../utils/wxRequest'
import config from '../config/index'

class API {
    // 订阅模板消息
    subscribleMessage = (params: {
      c_p: string
      signature: string
      template_id: string
      target: string
      page: string
      data: string
      title: string
    }): Promise<IResponseType<{}>> => httpRequest('/msg/sub_msg', 'POST', params)
    // 用户登陆
    userLogin = (params: {
      c_p: string
      signature: string
      code: string
    }): Promise<IResponseType<{
      user_code: string
      nickname: string
      avatar_url: string
    }>> => httpRequest('/usercenter/login', 'POST', params)
}

export default new API()
