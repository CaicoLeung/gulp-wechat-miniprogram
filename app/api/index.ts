import httpRequest from '../utils/wxRequest'

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
  }) => httpRequest('/msg/sub_msg', 'POST', params)

  // 用户登陆
  userLogin = (params: {
    c_p: string
    signature: string
    code: string
  }) => httpRequest<{
    user_code: string
    nickname: string
    avatar_url: string
  }>('/usercenter/login', 'POST', params)
}

export default new API()
