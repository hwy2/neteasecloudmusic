import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPlay: false,
    songInfo: [],
    songPlayUrl: '',
    cookie: '',
    account: '',
    profile: [],
    dailySongs: [],
    loginStatus: false
  },
  getters: {
    getisPlay(state) {
      return state.isPlay;
    },
    getsongInfo(state) {
      return state.songInfo;
    },
    getsongPlayUrl(state) {
      return state.songPlayUrl;
    },
    getcookie(state) {
      return state.cookie;
    },
    getaccount(state) {
      return state.account;
    },
    getprofile(state) {
      return state.profile;
    },
    getdailySongs(state) {
      return state.dailySongs;
    },
    getloginStatus(state) {
      return state.loginStatus;
    }
  },
  mutations: {
    // 修改VueX的内容只能使用这里面的方法
    setisPlay(state, status) {
      state.isPlay = status;
    },
    setsongInfo(state, status) {
      state.songInfo = JSON.parse(status);
    },
    setsongPlayUrl(state, status) {
      state.songPlayUrl = status;
    },
    setcookie(state, status) {
      state.cookie = status;
    },
    setaccount(state, status) {
      state.account = status;
    },
    setprofile(state, status) {
      state.profile = JSON.parse(status);
    },
    setdailySongs(state, status) {
      state.dailySongs = JSON.parse(status);
    },
    setloginStatus(state, status) {
      state.loginStatus = status;
    }
  },
  actions: {},
  modules: {}
})