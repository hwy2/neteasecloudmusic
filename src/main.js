import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import './registerServiceWorker'
import "./assets/less/public.less"

// 引用全部mint UI
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'

// 引用手淘rem
import 'lib-flexible'

// 配置Axios
Vue.prototype.$axios = Axios
//配置公共url
Axios.defaults.baseURL = 'http://3dcw.cn:5005'
Axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
