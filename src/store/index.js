import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isPlay: false, //播放状态 
    songInfo: [], //音乐信息
    songPlayUrl: '', //音乐播放链接
    cookie: '', //登录信息
    account: '', //登录信息
    profile: [], //登录，返回的用户信息
    dailySongs: [], //每日推荐音乐
    loginStatus: false, // 登录状态
    playlist: [], //播放列表
    serialNumber: 0 //播放列表序号
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
    },
    getplaylist(state) {
      return state.playlist;
    },
    getserialNumber(state) {
      return state.serialNumber;
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
      if (status === 200) {
        state.loginStatus = true;
      } else {
        state.loginStatus = false;
      }

    },
    setplaylist(state, status) {
      state.playlist = status;
    },
    setserialNumber(state, status) {
      state.serialNumber = status;
    }
  },
  actions: {},
  modules: {}
})