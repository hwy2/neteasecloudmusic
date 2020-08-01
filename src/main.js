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

import {
  Toast
} from "mint-ui";

// 引用手淘rem
import 'lib-flexible'

// 配置Axios
Vue.prototype.$axios = Axios
//配置公共url
Axios.defaults.baseURL = 'http://3dcw.cn:5005'
Axios.defaults.headers = {
  "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
}
Axios.defaults.withCredentials = true; //设置默认跨域，有可能出问题，后期有问题排查这里

Vue.config.productionTip = false

//弹出框禁止滑动
Vue.prototype.noScroll = function () {
  var mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = 'hidden'
  document.addEventListener('touchmove', mo, false) // 禁止页面滑动
}

//弹出框可以滑动
Vue.prototype.canScroll = function () {
  var mo = function (e) {
    e.preventDefault()
  }
  document.body.style.overflow = 'auto' // 出现滚动条
  document.removeEventListener('touchmove', mo, false)
}

//获取当前登录态
Vue.prototype.getLoginStatus = function () {

  return this.$axios
    .get("/login/status")
  // .then(res => {
  //   // window.console.log("登录状态:", res.data);
  //   if (res.data.code === 200) {
  //     this.$store.commit("setloginStatus", true);
  //   } else {
  //     this.$store.commit("setloginStatus", false);
  //   }
  // })
  // .catch(error => {
  //   window.console.log("获取登录态失败！", error);
  // });


}

// 获取音乐是否可以播放并获取相应的播放url
Vue.prototype.getplayMusic = function (songinfoId, songinfo) {
  // 根据id查看是否有权限播放
  this.$axios.
  get("/check/music", {
      params: {
        id: songinfoId
      }
    }).then(res => {
      window.console.log("音乐是否可用", res.data);
      if (res.data.success) {
        // 根据localStorage的歌曲id,获取详细歌曲的信息
        this.$axios
          .get("/song/url", {
            params: {
              id: songinfoId
            }
          })
          .then(res => {
            // window.console.log("歌曲详情：", res);
            if (res.data.data[0].url != null) {
              this.$store.commit("setsongInfo", JSON.stringify(songinfo));
              this.$store.commit("setsongPlayUrl", res.data.data[0].url);
              this.$store.commit("setisPlay", true);
              window.console.log("歌曲详情：", res.data);
            } else {
              Toast({
                message: "亲爱的,暂无版权，已为你播放下一首",
                position: "top",
                duration: 3000
              });
              this.nextSong(this.$store.getters.getserialNumber, this.$store.getters.getplaylist);
            }

          })
          .catch(error => {
            this.$store.commit("setisPlay", false);
            window.console.log("歌曲URL获取失败！", error);
          });
      } else {
        Toast({
          message: "亲爱的,暂无版权，已为你播放下一首",
          position: "top",
          duration: 3000
        });
        this.nextSong(this.$store.getters.getserialNumber, this.$store.getters.getplaylist);
      }
    })
    .catch(error => {
      // this.$store.commit("setisPlay", false);
      Toast({
        message: "亲爱的,暂无版权，已为你播放下一首",
        position: "top",
        duration: 3000
      });
      this.nextSong(this.$store.getters.getserialNumber, this.$store.getters.getplaylist);
      window.console.log("歌曲URL获取失败！", error);
    });


}

// 下一首
Vue.prototype.nextSong = function (number, songlist) {
  // window.console.log("aa", this.$store.getters.getserialNumber)
  // window.console.log(number, songlist);
  if (songlist.length > 1 && number < songlist.length - 1) {
    this.$store.commit("setserialNumber", number + 1);
    if (!songlist[number + 1].picUrl) {
      songlist[number + 1]["picUrl"] = songlist[number + 1].al.picUrl;
    }
    this.getplayMusic(songlist[number + 1].id ? songlist[number + 1].id : songlist[number + 1].resourceId, songlist[number + 1]);
  } else {
    this.$store.commit("setisPlay", false);
    Toast({
      message: "列表已播放完",
      position: "center",
      duration: 3000
    });
  }
}

// 上一首
Vue.prototype.lastSong = function (number, songlist) {
  if (songlist.length > 1 && number < songlist.length - 1 && number != 0) {
    this.$store.commit("setserialNumber", number - 1);
    songlist[number - 1]["picUrl"] = songlist[number - 1].al.picUrl;
    this.getplayMusic(songlist[number - 1].id, songlist[number - 1]);
  } else {
    // this.$store.commit("setisPlay", false);
    if (number == 0) {
      Toast({
        message: "这是第一首哦！",
        position: "center",
        duration: 3000
      });
    } else {
      this.$store.commit("setisPlay", false);
      Toast({
        message: "列表已播放完",
        position: "center",
        duration: 3000
      });
    }

  }
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')