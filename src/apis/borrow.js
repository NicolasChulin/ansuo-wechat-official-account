import api from './api'

export default {
  // 借手环
  borrowList (datas, success, error) {
    api._post('/picture/list', datas, success, error)
  },
  binding (datas, success, error) {
    api._post('/bracelet/binding', datas, success, error)
  },
  unBinding (datas, success, error) {
    api._post('/bracelet/unBinding', datas, success, error)
  },
  // 还手环
  refundList (datas, success, error) {
    api._post('', datas, success, error)
  },
  refund (datas, success, error) {
    api._post('/wxRefund/refund', datas, success, error)
  },
  // 支付押金相关
  topay (datas, success, error) {
    api._post('/ansuo/apply', datas, success, error)
  },
  getOAuth2AccessToken (datas, success, error) {
    api._post('/ansuo/apply', datas, success, error)
  },
  getJSSDKPayInfo (datas, success, error) {
    api._post('/ansuo/wxPay/getJSSDKPayInfo', datas, success, error)
  },
  findPayResult (datas, success, error) {
    api._post('/ansuo/wxPay/findPayResult', datas, success, error)
  }
}
