<template>
  <transition name="fade">
    <div class="dialog-mask">
      <div class="dialog-wrapper animated fadeInUp" ref="dialogWrapper">
        <div class="dialog-container" ref="viewBox">
          <div class="containerDiaLog" v-if="rendering">
            <!-- song banner -->
            <div class="topBanner songListTopBanner">
              <div class="topnarBar">
                <div id="back" @click="songListClose()">
                  <i class="iconfont iconfanhui"></i>
                  <span>{{songInformation.name}}</span>
                </div>
                <div class="more">
                  <i class="iconfont iconwenhao1"></i>
                </div>
              </div>

              <div class="information">
                <div class="left">
                  <img :src="songInformation.coverImgUrl" alt="封面" />
                  <span>
                    <i class="iconfont iconicon--"></i>
                    {{songInformation.playCount|retainDoubleDigit}}
                  </span>
                </div>
                <div class="rigth">
                  <div class="topTitle">
                    <p>{{songInformation.name}}</p>
                  </div>
                  <div class="user">
                    <img :src="songInformation.creator.avatarUrl" alt="头像" />
                    <span>{{songInformation.creator.nickname}}</span>
                  </div>
                  <div class="details">
                    <p>{{songInformation.description}}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- song 列表 -->
            <div class="bottomContainer">
              <div class="bgc">
                <!-- song 顶部装饰 -->
                <div class="topStyle">
                  <div class="le">
                    <div class>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                  <div class="ri">
                    <div class>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
                <!-- song 工具栏 -->
                <div class="songsBar">
                  <div class="left" @click="getplayMusicAll()">
                    <i class="iconfont iconbofang-"></i>
                    <span>播放全部 (共{{songInformation.trackCount}}首)</span>
                  </div>
                  <div class="right">
                    <i class="iconfont icongengduo1"></i>
                    <span>多选</span>
                  </div>
                </div>

                <!-- song 详情 -->
                <div class="songWarp">
                  <ul>
                    <li v-for="item in songplayList" :key="item.id" @click="playMusic(item)">
                      <div class="left">
                        <img :src="item.al.picUrl" :alt="item.al.name" />
                      </div>
                      <div class="center">
                        <p>
                          <span>{{item.name}}</span>&nbsp;
                          <span class="popularity">{{item.alia[0]}}</span>
                        </p>
                        <p>{{item.ar[0].name}}</p>
                      </div>
                      <div class="right">
                        <div class="icon">
                          <i class="iconfont iconbofang"></i>
                          <i class="iconfont iconziyuan"></i>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script >
import "../assets/less/songListDetails.less";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";

export default {
  name: "SongListdetails",
  data() {
    return {
      backgroudURl: "",
      songplayList: [],
      trackIds: [],
      songInformation: [],
      rendering: false
    };
  },
  filters: {
    //拦截器
    retainDoubleDigit: function(data) {
      // 将数据转万
      if (data > 100000000) {
        return (data / 100000000).toFixed(2)+"亿";
      } else {
        return (data / 10000).toFixed(2)+"万";
      }
    }
  },
  props: ["songListId"],
  computed: {
    playlist: {
      //
      get() {
        return this.$store.state.playlist;
      },
      set(v) {
        // 使用vuex中的mutations中定义好的方法来改变
        this.$store.commit("setplaylist", v);
      }
    }
  },
  methods: {
    songListClose: function() {
      this.$emit("shut");
    },
    getPlaylistMusic: function() {
      Indicator.open("加载中...");
      let that = this;
      // 获取歌单歌曲
      this.$axios
        .get("/playlist/detail?id=" + this.songListId)
        .then(res => {
          window.console.log("歌单歌曲", res.data);
          if (res.data.code === 200) {
            let trackSongId = [];
            let trackSongIdString = "";
            that.trackIds = res.data.playlist.trackIds;
            that.songInformation = res.data.playlist;
            that.rendering = true;

            for (let i = 0; i < that.trackIds.length; i++) {
              trackSongId.push(that.trackIds[i].id);
            }
            trackSongIdString = trackSongId.toString();
            this.$axios
              .get("/song/detail?ids=" + trackSongIdString)
              .then(res => {
                window.console.log("获取歌曲", res);
                if (res.data.code == 200) {
                  that.songplayList = res.data.songs;
                } else {
                  Toast({
                    message: "获取失败",
                    position: "top",
                    duration: 3000
                  });
                }

                Indicator.close();
              })
              .catch(error => {
                window.console.log("获取歌曲失败！/n" + error);
                Indicator.close();
              });
          }
        })
        .catch(error => {
          window.console.log("歌单获取失败！/n" + error);
        });
    },
    playMusic: function(songInfo) {
      songInfo["picUrl"] = songInfo.al.picUrl;
      this.getplayMusic(songInfo.id, songInfo);
    },
    getplayMusicAll: function() {
      let that = this;
      that.$store.commit("setplaylist", that.songplayList);
      let songlist = that.songplayList;
      that.playMusic(songlist[0]);
    }
  },
  created() {
    this.noScroll(); //禁止主页面滚动
    this.getPlaylistMusic(); //获取歌单
  },
  destroyed() {
    //主页面可滑动
    this.canScroll();
  }
};
</script>
<style>
</style>