import httpRequest from '../utils/wxRequest'

class API {
  // 订阅模板消息
  subscribleMessage = (params) => httpRequest('/msg/sub_msg', 'POST', params)

  // 用户登陆
  userLogin = (params) => httpRequest('/usercenter/login', 'POST', params)
}

export default new API()
