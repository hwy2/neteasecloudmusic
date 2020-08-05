import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  redirect: {
    name: 'find'
  },
  children: [{
    path: '/find',
    name: 'find',
    component: () => import('../views/find.vue')
  }, {
    path: '/me',
    name: 'me',
    component: () => import('../views/me.vue')
  }, {
    path: '/yuncun',
    name: 'yuncun',
    component: () => import('../views/yuncun.vue')
  }, {
    path: '/videoY',
    name: 'videoY',
    component: () => import('../views/videoY.vue')
  }]
}]

const router = new VueRouter({
  routes
})

export default router