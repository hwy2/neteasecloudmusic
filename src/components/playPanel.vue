<template>
  <transition name="fade">
    <div class="panelDialog">
      <div class="container">
        <!-- banner -->
        <div class="topBanner">
          <div class="topnarBar">
            <div id="back" @click="panelClose()">
              <i class="iconfont iconfanhui"></i>
              <div class="right">
                <p>{{songInfo.name}}</p>
              </div>
            </div>
            <div class="more">
              <i class="iconfont iconwenhao1"></i>
            </div>
          </div>
        </div>

        <!-- Rolling plate -->
        <div class="disc">
          <div class="cantilever">
            <img v-show="!isPlay" src="../assets/images/play.png" alt="cantilever" />
            <img v-show="isPlay" src="../assets/images/playAuto.png" alt="cantilever" />
          </div>
          <div class="diskConater">
            <div class="disk" id="diskRotate">
              <div class="songPic">
                <img :src="songInfo.picUrl" alt="songPic" />
              </div>
            </div>
          </div>
        </div>

        <!-- 歌词 -->
        <div class="lyric-conater" id="lyric-conater">
          <scroll class="lyric-wrapper" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div>
              <div class="lyric">
                <p
                  v-for="(line,index) in currentLyric.lines"
                  ref="lyricLine"
                  :key="index"
                  :class="{'current':currentLineNum===index}"
                  class="text"
                >{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>

        <!-- 操作区 -->
        <div class="operation">
          <div class="tool">
            <i class="iconfont iconshoucang"></i>
            <i class="iconfont iconxiazai"></i>
            <i class="iconfont iconktv"></i>
            <i class="iconfont iconpinglun"></i>
            <i class="iconfont icongengduo2"></i>
          </div>
          <div class="progress">
            <mt-progress :value="percentage">
              <div slot="start">{{currentTimes|formatDateTime(that)}}</div>
              <div slot="end">{{durations|formatDateTime(that)}}</div>
            </mt-progress>
          </div>
          <div class="roadcast">
            <i class="iconfont iconliebiaoxunhuan"></i>
            <i class="iconfont iconshangyishoushangyige" @click="playlast()"></i>
            <i v-if="!isPlay" class="iconfont iconbofang1" @click="playMusic()"></i>
            <i v-if="isPlay" class="iconfont iconzanting" @click="pauseMusic()"></i>
            <i class="iconfont iconxiayigexiayishou" @click="playnext()"></i>
            <i class="iconfont iconbofangliebiao"></i>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import "../assets/less/playPanel.less";
import Scroll from "./scroll";
import Lyric from "lyric-parser";

export default {
  name: "PlayPanel",
  data() {
    return {
      that: this,
      percentage: 0,
      currentTimes: 0,
      durations: 0,
      currentLyric: [],
      currentLineNum: 0,
      playingLyric: "",
    };
  },
  props: ["appthat"],
  components: {
    Scroll,
  },
  filters: {
    //拦截器
    formatDateTime: function (data, that) {
      return that.formatMilliseconds(data);
    },
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
    songInfo: {
      //歌曲信息
      get() {
        // window.console.log(JSON.stringify(this.$store.state.songInfo));
        return this.$store.state.songInfo;
      },
      set(v) {
        this.$store.commit("setsongInfo", v);
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
  },
  watch: {
    isPlay: function (newV) {
      window.console.log("当前播放状态：", newV);
      if (newV) {
        this.playMusic();
        this.currentLyric.play();
      } else {
        this.pauseMusic();
        this.currentLyric.stop();
      }
    },
  },
  methods: {
    panelClose: function () {
      this.$emit("panelClose");
    },
    formatMilliseconds: function (value) {
      var second = parseInt(value) / 1000; // second
      var minute = 0; // minute
      var hour = 0; // hour
      if (second > 60) {
        minute = parseInt(second / 60);
        second = parseInt(second % 60);
        if (minute > 60) {
          hour = parseInt(minute / 60);
          minute = parseInt(minute % 60);
        }
      }
      var result;
      if (second >= 10) {
        result = "" + parseInt(second);
      } else {
        result = "" + "0" + parseInt(second);
      }
      if (minute >= 10) {
        result = "" + parseInt(minute) + ":" + result;
      } else {
        result = "" + "0" + parseInt(minute) + ":" + result;
      }
      if (hour >= 10) {
        result = "" + parseInt(hour) + ":" + result;
      } else {
        if (hour > 0) {
          result = "" + "0" + parseInt(hour) + ":" + result;
        }
      }
      return result;
    },
    currentProgress: function () {
      let playTime = this.appthat.$refs.audio.duration * 1000;
      let currentTime = this.appthat.$refs.audio.currentTime;
      let that = this;
      this.currentTimes = currentTime * 1000;
      this.percentage = parseInt(((currentTime * 1000) / playTime) * 100);

      if (this.isPlay) {
        setTimeout(function () {
          that.currentProgress();
        }, 30);
      }
    },
    playMusic: function () {
      this.$store.commit("setisPlay", true);
      this.currentProgress();

      let musicrotateAn = document.getElementById("diskRotate");
      musicrotateAn.setAttribute(
        "style",
        "-webkit-animation: rollingPlate 8s linear infinite; animation: rollingPlate 8s linear infinite;"
      );
    },
    pauseMusic: function () {
      this.$store.commit("setisPlay", false);
      let musicrotateAn = document.getElementById("diskRotate");
      musicrotateAn.setAttribute("style", "");
    },
    playnext: function () {
      this.nextSong(this.serialNumber, this.playlist);
    },
    playlast: function () {
      this.lastSong(this.serialNumber, this.playlist);
    },
    getlyric: function () {
      // 根据音乐id获取歌词
      // window.console.log(this.songInfo)
      this.$axios
        .get("/lyric", {
          params: {
            id: this.songInfo.id?this.songInfo.id:this.songInfo.resourceId,
          },
        })
        .then((res) => {
          // window.console.log("详细歌词信息", JSON.stringify(res));

          // 新建歌词对象
          this.currentLyric = new Lyric(res.data.lrc.lyric, this.handleLyric);
          // 跳转到相应位置
          this.currentLyric.seek(this.currentTimes);
          // 判断是否播放
          if (this.isPlay) {
            this.currentLyric.play();
          } else {
            this.currentLyric.stop();
          }

          window.console.log("详细歌词信息格式化：", this.currentLyric);
        })
        .catch((error) => {
          window.console.log("歌词获取失败！", error);
        });
    },
    handleLyric({ lineNum, txt }) {
      this.currentLineNum = lineNum;
      window.console.log(lineNum);
      if (lineNum > 2) {
        let lineEl = this.$refs.lyricLine[lineNum - 2];
        window.console.log(lineEl);
        // this.$refs.lyricList.scrollTop = 200;

        var musicrotateAn = document.getElementById("lyric-conater");
        musicrotateAn.scrollTop = 25 * (lineNum - 2);
        // this.$refs.lyricList.scrollToElement(lineEl, 500); // 滚动到元素
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000); // 滚动到顶部
      }
      this.playingLyric = txt;
    },
  },

  created() {
    let that = this;
    that.getlyric();
    that.noScroll(); //禁止主页面滚动
    setTimeout(function () {
      that.currentTimes = that.appthat.$refs.audio.currentTime * 1000;
      if (that.isPlay) {
        that.playMusic();
      } else {
        that.pauseMusic();
      }
    }, 500);

    that.durations = that.appthat.$refs.audio.duration * 1000;
  },
  destroyed() {
    //主页面可滑动
    this.canScroll();
  },
};
</script>

<style>
</style>