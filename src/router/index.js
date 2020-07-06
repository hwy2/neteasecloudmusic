import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

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