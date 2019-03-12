import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
 const RECORD_USERINFO = 'RECORD_USERINFO'//记录用户信息
 const IS_LOGIN = 'IS_LOGIN'//退出登录
 const RECORD_PID = 'RECORD_PID'//记录板块id信息

export default new Vuex.Store({
  state: {
    firmId:window.localStorage.getItem('firmId')==null?"":window.localStorage.getItem('firmId'),
    sessionId:window.localStorage.getItem('sessionId')==null?"":window.localStorage.getItem('sessionId'),
    pid:window.localStorage.getItem('pid')==null?-1:window.localStorage.getItem('pid'),
    isLogin:window.localStorage.getItem('isLogin')==null?false:window.localStorage.getItem('isLogin')
  },
  mutations: {
    [IS_LOGIN](state,val) {
      state.isLogin = val;
      window.localStorage.setItem('isLogin',state.isLogin)
    },
    [RECORD_USERINFO](state, map) {
      state.firmId = map.firmId;
      state.sessionId = map.sessionId;
      window.localStorage.setItem('firmId',state.firmId)
      window.localStorage.setItem('sessionId',state.sessionId)
    },
    [RECORD_PID](state, pid) {
      state.pid = pid;
      window.localStorage.setItem('pid',state.pid)
    },
  },
  actions: {

  }
})
