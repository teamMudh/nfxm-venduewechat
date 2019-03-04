import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
 const RECORD_USERINFO = 'RECORD_USERINFO'//记录用户信息
 const IS_LOGIN = 'IS_LOGIN'//退出登录

export default new Vuex.Store({
  state: {
    firmId:"",
    sessionId:"",
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
  },
  actions: {

  }
})
