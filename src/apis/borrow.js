import api from './api'

export default {
  // 借手环相关 ----->
  // 借手环图片列表
  borrowList (datas, success, error) {
    api._post('/picture/list', datas, success, error)
  },
  // 绑定手环
  binding (datas, success, error) {
    api._post('/bracelet/binding', datas, success, error)
  },
  // 解绑手环
  unBinding (datas, success, error) {
    api._post('/bracelet/unBinding', datas, success, error)
  },
  // 生成订单
  makeOrder (datas, success, error) {
    api._post('/ansuo/apply', datas, success, error)
  },
  // 还手环相关 ------>
  // 还手环图片列表
  refundList (datas, success, error) {
    api._post('/bracelet/return', datas, success, error)
  },
  // 申请退款
  refund (datas, success, error) {
    api._post('/wxRefund/refund', datas, success, error)
  }
}
