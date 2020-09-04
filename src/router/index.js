import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = () => import('../page/home')
const MongodbSetting = () => import('../page/mongodb-setting')
const Component = () => import('../page/component.vue')
const MyConvas = () => import('../page/my-canvas')
const Drag = () => import('../page/drag')
const Test = () => import('../page/test')
const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: Home
  }, {
    path: '/index',
    redirect: '/'
  }, {
    path: '/db',
    component: MongodbSetting
  }, {
    path: '/component',
    component: Component
  }, {
    path: '/canvas',
    component: MyConvas
  }, {
    path: '/drag',
    component: Drag
  }, {
    path: '/test',
    component: Test
  }]
})

export default router
