<template>
  <transition name="fade">
    <div class="dialog-mask">
      <div class="dialog-wrapper animated fadeInUp" ref="dialogWrapper">
        <div class="dialog-container" ref="viewBox">
          <div class="containerDiaLog" v-if="rendering">
            <!-- song banner -->
            <div class="topBanner songListTopBanner songSheetTopBanner">
              <div class="topnarBar">
                <div id="back" @click="songListClose()">
                  <i class="iconfont iconfanhui"></i>
                  <span>歌单广场</span>
                </div>
              </div>

              <div class="navbarSorll">
                <ul class="clearfix">
                  <li
                    :class="{active:item.activity}"
                    id="item.id"
                    v-for="(item,index) in categoryHot"
                    :key="item.id"
                    @click="gethighquality(index,item.name)"
                  >{{item.name}}</li>
                </ul>
              </div>
            </div>

            <!-- song LIST -->
            <div class="sheet">
              <mt-loadmore
                :bottomMethod="loadBottom"
                :bottom-all-loaded="allLoaded"
                :auto-fill="false"
                ref="loadmore"
              >
                <ul class="clearfix">
                  <li v-for="item in highqualityList" :key="item.id">
                    <img :src="item.coverImgUrl" alt="歌单封面" />
                    <span>
                      <i class="iconfont iconicon--"></i>
                      {{item.playCount|retainDoubleDigit}}
                    </span>
                    <p>{{item.name}}</p>
                  </li>
                </ul>
              </mt-loadmore>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script >
import "../assets/less/songSheet.less";
// import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";

export default {
  name: "SongSheet",
  data() {
    return {
      rendering: false,
      categoryHot: [],
      highqualityList: [],
      allLoaded: false,
      cat: ""
    };
  },
  filters: {
    //拦截器
    retainDoubleDigit: function(data) {
      // 将数据转万
      if (data > 100000000) {
        return (data / 100000000).toFixed(2) + "亿";
      } else {
        return (data / 10000).toFixed(2) + "万";
      }
    }
  },
  computed: {},
  methods: {
    songListClose: function() {
      this.$emit("shutdown");
    },
    getcategoryHot: function() {
      this.$axios
        .get("/playlist/hot")
        .then(res => {
          window.console.log("热门分类", res.data);
          this.categoryHot = res.data.tags;

          //添加推荐标签
          let arr = new Array();
          arr["activity"] = true;
          arr["name"] = "推荐";
          this.categoryHot.unshift(arr);
          this.gethighquality(0, "");
          this.rendering = true;
        })
        .catch(error => {
          window.console.log("热门分类获取失败", error);
        });
    },
    gethighquality: function(index, cat) {
      Indicator.open("加载中...");
      this.categoryHot.forEach(function(obj) {
        obj.activity = false;
      });
      this.categoryHot[index].activity = true;

      let params = {};
      this.cat = cat;
      params["limit"] = 20;
      if (cat != "" && cat != "推荐") {
        params["cat"] = cat;
      }

      // let defcat = "推荐";
      this.$axios
        .get("/top/playlist/highquality", {
          params: params
        })
        .then(res => {
          window.console.log("精品歌单", res.data);
          this.highqualityList = res.data.playlists;
          this.allLoaded = false;
          Indicator.close();
        })
        .catch(error => {
          Indicator.close();
          window.console.log("精品歌单获取失败", error);
        });
    },
    loadBottom: function() {
      let params = {};
      let last = this.highqualityList.pop();
      params["limit"] = 20;
      if (this.cat != "" && this.cat != "推荐") {
        params["cat"] = this.cat;
      }
      params["before"] = last.updateTime;

      this.$axios
        .get("/top/playlist/highquality", {
          params: params
        })
        .then(res => {
          if (res.data.code === 200) {
            window.console.log("精品歌单", res.data);
            // let temporary = [1,2,3];
            // let playlists = [4,5,6];
            let temporary = this.highqualityList;
            let playlists = res.data.playlists;
            this.highqualityList = [...temporary, ...playlists];

            window.console.log(this.highqualityList);

            if (!res.data.more) {
              this.allLoaded = true; // 若数据已全部获取完毕
            }
          }
          this.$refs.loadmore.onBottomLoaded();
          Indicator.close();
        })
        .catch(error => {
          Indicator.close();
          window.console.log("精品歌单获取失败", error);
        });
    }
  },
  created() {
    this.noScroll(); //禁止主页面滚动
    this.getcategoryHot();
  },
  destroyed() {
    //主页面可滑动
    this.canScroll();
  }
};
</script>
<style>
</style>