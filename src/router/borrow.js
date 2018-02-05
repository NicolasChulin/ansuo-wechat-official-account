/* components */
import Borrow from '@/views/borrow/Borrow'
import Refund from '@/views/borrow/Refund'
import RefundSuccess from '@/views/borrow/RefundSuccess'
import PayWeixinCallback from '@/views/borrow/PayWeixinCallback'

var borrow = [
  {
    path: '/borrow',
    name: 'Borrow',
    component: Borrow,
    meta: {
      title: '借出手环'
    }
  },
  {
    path: '/refund',
    name: 'Refund',
    component: Refund,
    meta: {
      title: '手环归还'
    }
  },
  {
    path: '/pay/weixinCallback',
    name: 'PayWeixinCallback',
    component: PayWeixinCallback
  },
  {
    path: '/refund/success',
    name: 'RefundSuccess',
    component: RefundSuccess,
    meta: {
      title: '申请退款成功！'
    }
  }
]

export default borrow
