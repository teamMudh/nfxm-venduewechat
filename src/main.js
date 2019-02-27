import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入Axios
import Axios from 'axios'
Axios.defaults.withCredentials = true
Axios.defaults.headers.post['Content-type']='xml'
Axios.defaults.baseURL = '/api'
Vue.prototype.$ajax = Axios; //挂载原型

import x2js from 'x2js' //xml数据处理插件
Vue.prototype.$x2js = new x2js() //创建x2js对象，挂到vue原型上

Vue.config.productionTip = false


import './style/mudh/js/jquery-1.11.0.js'
import './style/mudh/js/init.js'
import './style/mudh/css/common.css'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
