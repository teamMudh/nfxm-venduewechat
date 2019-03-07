import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
 const RECORD_USERINFO = 'RECORD_USERINFO'//记录用户信息
 const IS_LOGIN = 'IS_LOGIN'//退出登录
 const RECORD_PID = 'RECORD_PID'//记录板块id信息

export default new Vuex.Store({
  state: {
    firmId:"",
    sessionId:"",
    pid:-1,
    isLogin:false
  },
  mutations: {
    [IS_LOGIN](state,val) {
      state.isLogin = val;
    },
    [RECORD_USERINFO](state, map) {
      state.firmId = map.firmId;
      state.sessionId = map.sessionId;
    },
    [RECORD_PID](state, pid) {
      state.pid = pid;
    },
  },
  actions: {

  }
})
