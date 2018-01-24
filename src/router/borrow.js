/* components */
import Borrow from '@/views/borrow/Borrow'
import Refund from '@/views/borrow/Refund'
import PayWeixinCallback from '@/views/borrow/PayWeixinCallback'

var borrow = [
  {
    path: '/borrow',
    name: 'Borrow',
    component: Borrow
  },
  {
    path: '/refund',
    name: 'Refund',
    component: Refund
  },
  {
    path: '/pay/weixinCallback',
    name: 'PayWeixinCallback',
    component: PayWeixinCallback
  }
]

export default borrow
