<template>
  <div id="app">
    <router-view />

    <!-- 底部播放区 -->
    <div class="tabbar clearfix">
      <div class="left clearfix" @click="openPanelDialog()">
        <div class="musicImg">
          <span>
            <img :src="song.picUrl" alt="歌曲封面" id="musicImg" />
          </span>
        </div>
        <div class="details">
          <p class="songTitle">{{song.name}}</p>
          <p>横滑可以切换上下首哦</p>
        </div>
        <audio
          :autoplay="isPlay"
          ref="audio"
          @ended="palyNextSong()"
          :src="songPlayUrl"
          id="audioPlayer"
        >您的浏览器不支持 audio 标签。</audio>
      </div>
      <div class="right">
        <i class="iconfont icontubiaozhizuomoban" @click="playAudio()" v-if="!isPlay"></i>
        <i class="iconfont icontubiaozhizuomoban1" @click="pauseAudio()" v-if="isPlay"></i>
        <i class="iconfont iconbofangliebiao"></i>
      </div>
    </div>

    <!-- 登录层 -->
    <mt-popup
      class="loginUp"
      v-model="popupVisible"
      position="center"
      :closeOnClickModal="clickFalse"
    >
      <div class="login">
        <div class="bgc">
          <div class="toptitle">
            <p>网抑云音乐</p>
          </div>
          <div class="row">
            <mt-field
              label="手机号"
              placeholder="请输入手机号"
              type="tel"
              v-model="userPhone"
              autocomplete="off"
            ></mt-field>
          </div>
          <div class="row">
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model="userPasswid"></mt-field>
          </div>
          <div class="btn">
            <mt-button type="danger" @click="loginOperation()">登录</mt-button>
          </div>
        </div>
      </div>
    </mt-popup>

    <!-- 播放详情 -->
    <panel-play @panelClose="closePanelDialog" v-if="panelVisible" :appthat="that"></panel-play>
  </div>
</template>

<script>
import "./assets/less/app.less";
import { Indicator } from "mint-ui";
import { Toast } from "mint-ui";
import PanelPlay from "./components/playPanel";

export default {
  name: "App",
  data() {
    return {
      that: this,
      popupVisible: false,
      topFloor: "2002 !important",
      clickFalse: false,
      userPhone: "",
      userPasswid: "",
      panelVisible: false,
    };
  },
  components: {
    PanelPlay,
  },
  computed: {
    isPlay: {
      //播放状态
      get() {
        return this.$store.state.isPlay;
      },
      set(v) {
        // 使用vuex中的mutations中定义好的方法来改变
        this.$store.commit("setisPlay", v);
      },
    },
    loginStatus: {
      //登录状态
      get() {
        return this.$store.state.loginStatus;
      },
      set(v) {
        this.$store.commit("setloginStatus", v);
      },
    },
    song: {
      //歌曲信息
      get() {
        return this.$store.state.songInfo;
      },
      set(v) {
        this.$store.commit("setsongInfo", v);
      },
    },
    songPlayUrl: {
      //歌曲URL
      get() {
        return this.$store.state.songPlayUrl;
      },
      set(v) {
        this.$store.commit("setsongPlayUrl", v);
      },
    },
    serialNumber: {
      //播放列表序号
      get() {
        return this.$store.state.serialNumber;
      },
      set(v) {
        this.$store.commit("setserialNumber", v);
      },
    },
    playlist: {
      //歌曲列表
      get() {
        return this.$store.state.playlist;
      },
      set(v) {
        this.$store.commit("setplaylist", v);
      },
    },
    profile: {
      //歌曲列表
      get() {
        return this.$store.state.profile;
      },
      set(v) {
        this.$store.commit("setprofile", v);
      },
    },
  },
  watch: {
    isPlay: function (newV) {
      window.console.log("当前播放状态：", newV);
      if (newV) {
        this.playAudio();
      } else {
        this.pauseAudio();
      }
    },
    popupVisible: function (newV) {
      if (newV) {
        this.noScroll(); //禁止主页面滚动
      } else {
        //主页面可滑动
        this.canScroll();
      }
    },
  },
  methods: {
    getnewsong: function () {
      let that = this;
      // 获取播放记录歌曲
      that
        .$axios({
          url: "/user/record",
          params: {
            uid: that.profile.userId,
            type: 1,
          },
        })
        .then((res) => {
          // window.console.log("播放记录", JSON.stringify(res));
          res.data.weekData[res.data.weekData.length - 1].song["picUrl"]=res.data.weekData[res.data.weekData.length - 1].song.al.picUrl
          that.$store.commit(
            "setsongInfo",
            JSON.stringify(res.data.weekData[res.data.weekData.length - 1].song)
          );
          that.getMusicUrl();
        })
        .catch((error) => {
          window.console.log("播放记录获取失败！", error);
        });
    },
    getMusicUrl: function () {
      // 根据localStorage的歌曲id,获取详细歌曲的信息
      this.$axios
        .get("/song/url", {
          params: {
            id: this.song["song"].id,
          },
        })
        .then((res) => {
          this.$store.commit("setsongPlayUrl", res.data.data[0].url);
          this.pauseAudio();
          // window.console.log("详细歌曲的信息", JSON.stringify(res));
        })
        .catch((error) => {
          window.console.log("歌曲URL获取失败！", error);
        });
    },
    playAudio: function () {
      // 播放音乐，并修改状态
      // window.console.log(document.getElementById("audioPlayer"));
      this.$refs.audio.play();
      this.$store.commit("setisPlay", true);
      let musicrotateAn = document.getElementById("musicImg");
      musicrotateAn.setAttribute(
        "style",
        "-webkit-animation: rotateAn 8s linear infinite; animation: rotateAn 8s linear infinite;"
      );
    },
    pauseAudio: function () {
      // 暂停音乐，并修改状态
      this.$refs.audio.pause();
      this.$store.commit("setisPlay", false);
      let musicrotateAn = document.getElementById("musicImg");
      musicrotateAn.setAttribute("style", "");
    },
    loginOperation: function () {
      const phone = this.userPhone;
      const password = this.userPasswid;
      let that = this;
      // 登录网易云
      if (this.userPhone == "" || this.password == "") {
        Toast({
          message: "请填写你的手机号码和密码",
          position: "top",
          duration: 3000,
        });
        throw new Error("请设置你的手机号码和密码");
      }
      Indicator.open("登录中...");

      this.$axios({
        url: `/login/cellphone?phone=${phone}&password=${password}`,
      })
        .then(function (res) {
          console.log("登录信息", res.data);
          Indicator.close();
          if (res.data.code == 200) {
            that.$store.commit("setcookie", JSON.stringify(res.data.cookie));
            that.$store.commit("setprofile", JSON.stringify(res.data.profile));
            that.$store.commit("setaccount", JSON.stringify(res.data.account));
            that.popupVisible = false;
            localStorage["profile"] = JSON.stringify(res.data.profile);
            Toast({
              message: "登录成功",
              position: "top",
              duration: 3000,
            });
          }
        })
        .catch((error) => {
          window.console.log("登录信息获取失败！/n" + error);
          Indicator.close();
        });
    },
    palyNextSong: function () {
      this.nextSong(this.serialNumber, this.playlist);
    },
    closePanelDialog: function () {
      this.panelVisible = false;
    },
    openPanelDialog: function () {
      // dialog开关
      this.panelVisible = true;
    },
  },
  created() {
    let that = this;
    // 暂停0.8s,等待loginStatus状态更新
    setTimeout(function () {
      // 判断是否需要弹出登录窗，弹出即禁止主页面滚动
      if (that.loginStatus) {
        that.popupVisible = false;
        that.canScroll(); //主页面可滑动
        that.getnewsong(); //获取新歌推荐
        // that.gethomedata();//获取首页-发现内容
      } else {
        that.popupVisible = true;
        that.noScroll(); //禁止主页面滚动
      }
    }, 800);
  },
  beforeCreate() {
    let res = new Promise((resolve) => {
      resolve(this.getLoginStatus());
    }); //获取登录态

    res.then(
      (data) => {
        //执行代码逻辑
        window.console.log("登录状态:", data.data);
        this.$store.commit("setloginStatus", data.data.code);
      },
      (err) => {
        window.console.log("登录状态获取失败！:", err);
      }
    );

    this.$store.commit("setprofile", localStorage.getItem("profile")); //获取localStorage里的登录信息
  },
};
</script>

<style lang="less">
</style>
