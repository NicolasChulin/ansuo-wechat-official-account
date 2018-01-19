import Vue from 'vue'
import Router from 'vue-router'
/* components */
import Index from '@/views/Index'
/* router-array */
import Account from '@/router/account'
import Borrow from '@/router/borrow'

Vue.use(Router)

let routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  }
]
routes.push(...[
  ...Account,
  ...Borrow
])

export default new Router({
  routes
})
