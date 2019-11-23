import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    BASE_URL: 'http://localhost:3000',
    token: "",
    userInfo: {},//用户信息
    addressArr: [],//定位
    mapKey: 'MA7BZ-GYBWF-2FCJJ-NSTIG-RSEZV-WYBIP',
  },
  mutations: {
    setToken(state, payload = "") {
      state.token = payload
    },
    removeToken(state) {
      state.token = ""
    },
    setUserInfo(state, payload = {}) {
      state.userInfo = payload
    },
    removeUserInfo(state) {
      state.userInfo = {}
    },
    setAddress(state, payload = []) {
      state.addressArr = payload
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => () => { }
      }
    })
  ]

})

export default store
