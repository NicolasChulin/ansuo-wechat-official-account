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
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Index
  },
  {
    path: '/home/:wristId',
    name: 'HomeDetail',
    component: HomeDetail
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  }
]
routes.push(...[
  // ...Account,
  ...Borrow
])

export default new Router({
  routes
})
