// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './store/index'
import App from './App'
import axios from 'axios'
import ElementUI from 'element-ui'
import ECharts from 'vue-echarts/components/ECharts'
import { v4 } from 'uuid'
import './assets/css/base.css'
import _ from 'lodash'
import 'element-ui/lib/theme-chalk/index.css'
import 'animate.css'
import 'velocity-animate'
// mock模拟数据
import './mock/'
// register component to use
Vue.component('v-chart', ECharts)

Vue.use(ElementUI)
Vue.use(_)

// register component to use
Vue.prototype.$axios = axios
// Vue.prototype._ = _
Vue.prototype.v4 = v4
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
