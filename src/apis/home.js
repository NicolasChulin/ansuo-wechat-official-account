import api from './api'

export default {
  list (datas, success, error) {
    api._post('', datas, success, error)
  },
  // 微信公众号支付相关 ---->
  // 获取微信js-sdk配置参数
  getJsApiParameter (datas, success, error) {
    api._post('/getJsApiParameter', datas, success, error)
  },
  // 根据code和state获取token、openID
  getOAuth2AccessToken (datas, success, error) {
    api._post('/getOAuth2AccessToken', datas, success, error)
  },
  // 获取支付配置信息
  getJSSDKPayInfo (datas, success, error) {
    api._post('/ansuo/wxPay/getJSSDKPayInfo', datas, success, error)
  },
  // 查询支付结果
  findPayResult (datas, success, error) {
    api._post('/ansuo/wxPay/findPayResult', datas, success, error)
  }
  // wxAccessToken (datas, success, error) {
  //   api._post('/weixin/getOAuth2AccessToken', datas, success, error)
  // },
  // getJsApiParameter (datas, success, error) {
  //   api._post('/weixin/getJsApiParameter', datas, success, error)
  // }
}
