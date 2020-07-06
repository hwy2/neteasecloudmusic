<template>
  <transition name="fade">
    <div class="dialog-mask">
      <div class="dialog-wrapper animated fadeInUp" ref="dialogWrapper">
        <div class="dialog-container" ref="viewBox">
          <!-- song banner -->
          <div class="topBanner" :style="{background:backgroudURl}">
            <div class="topnarBar">
              <div id="back" @click="dialogClose()">
                <i class="iconfont iconfanhui"></i>
              </div>
              <div class="more">
                <i class="iconfont iconwenhao1"></i>
              </div>
            </div>

            <div class="dateTime">
              <p>
                <span>{{day}}</span>
                /{{month}}
              </p>
              <a href="javascript:void(0)">历史日推</a>
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
                <div class="left">
                  <i class="iconfont iconbofang-"></i>
                  <span>播放全部</span>
                </div>
                <div class="right">
                  <i class="iconfont icongengduo1"></i>
                  <span>多选</span>
                </div>
              </div>

              <!-- song 详情 -->
              <div class="songWarp">
                <ul>
                  <li v-for="item in dailySongs" :key="item.id" @click="playMusic(item)">
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
  </transition>
</template>
<script >
import "../assets/less/recommendation.less";
import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";

export default {
  name: "DailyRecommendation",
  data() {
    return {
      month: "",
      day: "",
      backgroudURl: ""
    };
  },
  computed: {
    dailySongs: {
      //播放状态
      get() {
        return this.$store.state.dailySongs;
      },
      set(v) {
        // 使用vuex中的mutations中定义好的方法来改变
        this.$store.commit("setdailySongs", v);
      }
    }
  },
  methods: {
    dialogClose: function() {
      this.$emit("close");
    },
    getDailyMusic: function() {
      Indicator.open("加载中...");
      let that = this;
      // 获取每日推荐歌曲
      this.$axios
        .get("/recommend/songs")
        .then(res => {
          // window.console.log("每日推荐", JSON.stringify(res.data));
          if (res.data.code === 200) {
            this.backgroudURl =
              "url(" +
              res.data.data.dailySongs[0].al.picUrl +
              ") no-repeat center center";
            that.$store.commit(
              "setdailySongs",
              JSON.stringify(res.data.data.dailySongs)
            );
            Indicator.close();
          }
        })
        .catch(error => {
          window.console.log("每日推荐获取失败！/n" + error);
        });
    },
    playMusic: function(songInfo) {
      songInfo["picUrl"] = songInfo.al.picUrl;
      this.getplayMusic(songInfo.id, songInfo);
    }
  },
  created() {
    this.noScroll(); //禁止主页面滚动
    let data = new Date();
    this.month =
      data.getMonth() < 9 ? "0" + (data.getMonth() + 1) : data.getMonth() + 1;
    this.day = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
    if (this.dailySongs) {
      this.getDailyMusic(); //获取每日推荐
    } else {
      Toast({
        message: "请登录后再查看",
        position: "top",
        duration: 3000
      });
      this.dialogClose();
    }
  },
  destroyed() {
    //主页面可滑动
    this.canScroll();
  }
};
</script>
<style>
</style>