import Vue from 'vue'
import Router from 'vue-router'
/* components */
import Index from '@/views/Index'
import HomeDetail from '@/views//HomeDetail'
import Login from '@/views/login/Login'
import Message from '@/views/message/Message'
import Order from '@/views/order/Order'

/* router-array */
// import Account from '@/router/account'
import Borrow from '@/router/borrow'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Index,
    meta: {
      title: '主页'
    }
  },
  {
    path: '/home/:wristId',
    name: 'HomeDetail',
    component: HomeDetail,
    meta: {
      title: '手环信息'
    }
  },
  {
    path: '/message',
    name: 'Message',
    component: Message,
    meta: {
      title: '消息'
    }
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
    meta: {
      title: '订单'
    }
  }
]
routes.push(...[
  // ...Account,
  ...Borrow
])

export default new Router({
  // mode: 'history',
  routes
})
