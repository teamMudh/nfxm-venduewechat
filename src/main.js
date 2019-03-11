import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入Axios
import Axios from 'axios'
// Axios.defaults.withCredentials = true
Axios.defaults.headers.post['Content-type']='xml'
Axios.defaults.baseURL = 'http://172.18.3.11:40160/vendue-frontend-trade/mobileHttpServlet'
Vue.prototype.$ajax = Axios; //挂载原型

import x2js from 'x2js' //xml数据处理插件
Vue.prototype.$x2js = new x2js() //创建x2js对象，挂到vue原型上

Vue.config.productionTip = false


import './style/mudh/js/jquery-1.11.0.js'
import './style/mudh/js/init.js'
import './style/mudh/css/common.css'

//时间戳转时间过滤器
Vue.filter("formatDateTime", function (date) {
  if(date!=null&&date!=''){
    let d = new Date(parseInt(date/1000) * 1000)
    return (d.getFullYear()) + '.' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '.' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())+' '+(d.getHours() > 9 ? d.getHours() : '0' + d.getHours())+':'+(d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes())+':'+(d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
  }else{
    return date
  }
});

//提货单状态过滤器
Vue.filter("formatStatusBilllading", function (status) {
  if(status == null || status == ''){
    return ''
  }else if(status == 0){
    return '待审核'
  }else if(status == 1){
    return '审核预通过'
  }else if(status == 2){
    return '审核驳回'
  }else if(status == 3){
    return '审核通过'
  }else if(status == 4){
    return '已申请验收'
  }
});

//验收单过滤器
Vue.filter("formatStatusAcceptance", function (status) {
  if(status == null || status == ''){
    return ''
  }else if(status == 1){
    return '待审核'
  }else if(status == 2){
    return '审核通过'
  }else if(status == 3){
    return '审核驳回'
  }
});

//非空过滤器
Vue.filter("formatNull", function (val) {
  if(val == null || val == ''){
    return '--'
  }else{
    return val
  }
});

//数字格式化过滤器
Vue.filter("formatNumber", function (val) {
  if(val != null || val != ''){
    var num = parseFloat(val)
    return num.toFixed(2)
  }else{
    return val
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//时间戳转时间过滤器
Vue.filter("formatDateTime", function (date) {
  if(date!=null&&date!=''){
    let d = new Date(parseInt(date/1000) * 1000)
    return (d.getFullYear()) + '.' + (d.getMonth() + 1 > 9 ? d.getMonth() + 1 : '0' + (d.getMonth() + 1)) + '.' + (d.getDate() > 9 ? d.getDate() : '0' + d.getDate())+' '+(d.getHours() > 9 ? d.getHours() : '0' + d.getHours())+':'+(d.getMinutes() > 9 ? d.getMinutes() : '0' + d.getMinutes())+':'+(d.getSeconds() > 9 ? d.getSeconds() : '0' + d.getSeconds())
  }else{
    return date
  }
  });