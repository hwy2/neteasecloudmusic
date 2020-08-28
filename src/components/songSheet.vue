<template>
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
              <div class="more">
                <i class="iconfont icongengduo3" @click="openPopup()"></i>
              </div>
            </div>
          </div>

          <!-- song LIST -->
          <div class="sheet">
            <mt-loadmore
              :bottomMethod="loadBottom"
              :bottom-all-loaded="allLoaded"
              :auto-fill="false"
              ref="loadmore"
              id="loadmore"
            >
              <ul class="clearfix">
                <li
                  v-for="(item,i) in highqualityList"
                  :key="i"
                  @click="openSongListDialog(item.id)"
                >
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

    <!-- 歌单详情弹出层 -->
    <song-listdetails :songListId="songListId" @shut="closeSongListDialog" v-if="songListVisible"></song-listdetails>

    <!-- 歌单分类 -->
    <mt-popup
      class="categories"
      v-model="popupSongVisible"
      position="right"
      :closeOnClickModal="clickSongFalse"
    >
      <div class="categories-warp">
        <ul class="bigcategories">
          <li v-for="(item,index) in categorieList" :key="index">
            <p>{{item.name}}</p>

            <ul class="smallcategories clearfix">
              <li
                v-for="(items,i) in item.sub"
                :key="i"
                @click="subSelect(items.name)"
              >{{items.name}}</li>
            </ul>
          </li>
        </ul>
      </div>
    </mt-popup>
  </div>
</template>
<script >
import "../assets/less/songSheet.less";
// import { Toast } from "mint-ui";
import { Indicator } from "mint-ui";
import SongListdetails from "../components/songListDetails";

export default {
  name: "SongSheet",
  components: {
    SongListdetails,
  },
  data() {
    return {
      rendering: false,
      categoryHot: [],
      highqualityList: [],
      allLoaded: false,
      cat: "",
      songListVisible: false,
      songListId: "",
      categorieList: [],
      popupSongVisible: false,
      clickSongFalse: true,
    };
  },
  props: ["songSheetType"],
  filters: {
    //拦截器
    retainDoubleDigit: function (data) {
      // 将数据转万
      if (data > 100000000) {
        return (data / 100000000).toFixed(2) + "亿";
      } else {
        return (data / 10000).toFixed(2) + "万";
      }
    },
  },
  computed: {},
  methods: {
    songListClose: function () {
      this.$emit("shutdown");
    },
    getcategoryHot: function () {
      this.$axios
        .get("/playlist/hot")
        .then((res) => {
          // window.console.log("热门分类", res.data);
          this.categoryHot = res.data.tags;

          //添加推荐标签
          let arr2 = new Array();
          arr2["activity"] = false;
          arr2["name"] = "官方";
          this.categoryHot.unshift(arr2);
          let arr = new Array();
          arr["activity"] = false;
          arr["name"] = "推荐";
          this.categoryHot.unshift(arr);
          this.rendering = true;

          if (this.songSheetType !== "") {
            this.categoryHot[0].activity = false;
            this.categoryHot.forEach((item, index) => {
              if (item.name === this.songSheetType) {
                item.activity = true;
                this.gethighquality(index, this.songSheetType);
              }
            });
          } else {
            this.gethighquality(0, "");
          }
        })
        .catch((error) => {
          window.console.log("热门分类获取失败", error);
        });
    },
    getcategory: function () {
      this.$axios
        .get("/playlist/catlist")
        .then((res) => {
          // window.console.log("分类", res.data);
          // let "语种","风格","场景","情感","主题"
          let languages = [];
          let style = [];
          let scene = [];
          let emotion = [];
          let theme = [];

          //小类
          res.data.sub.forEach((item) => {
            var arr = [];
            switch (item.category) {
              case 0:
                arr["name"] = item.name;
                languages.push(arr);
                break;
              case 1:
                arr["name"] = item.name;
                style.push(arr);
                break;
              case 2:
                arr["name"] = item.name;
                scene.push(arr);
                break;
              case 3:
                arr["name"] = item.name;
                emotion.push(arr);
                break;
              case 4:
                arr["name"] = item.name;
                theme.push(arr);
                break;
            }
          });
          //大类
          for (let a = 0; a < 5; a++) {
            var arr = [];
            switch (a) {
              case 0:
                arr = { name: "语种", sub: languages };
                this.categorieList.push(arr);
                break;
              case 1:
                arr = { name: "风格", sub: style };
                this.categorieList.push(arr);
                break;
              case 2:
                arr = { name: "场景", sub: scene };
                this.categorieList.push(arr);
                break;
              case 3:
                arr = { name: "情感", sub: emotion };
                this.categorieList.push(arr);
                break;
              case 4:
                arr = { name: "主题", sub: theme };
                this.categorieList.push(arr);
                break;
            }
          }
        })
        .catch((error) => {
          window.console.log("分类获取失败", error);
        });
    },
    gethighquality: function (index, cat) {
      //获取精品歌单
      Indicator.open("加载中...");
      this.categoryHot.forEach(function (obj) {
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
        .get("/top/playlist", {
          params: params,
        })
        .then((res) => {
          // window.console.log("精品歌单", res.data);
          this.highqualityList = res.data.playlists;
          this.allLoaded = false;
          Indicator.close();
        })
        .catch((error) => {
          Indicator.close();
          window.console.log("精品歌单获取失败", error);
        });
    },
    loadBottom: function () {
      let params = {};
      // let last = this.highqualityList.pop();
      params["limit"] = 20;
      if (this.cat != "" && this.cat != "推荐") {
        params["cat"] = this.cat;
      }
      params["before"] = this.highqualityList[
        this.highqualityList.length - 1
      ].updateTime;

      this.$axios
        .get("/top/playlist", {
          params: params,
        })
        .then((res) => {
          if (res.data.code === 200) {
            // window.console.log("精品歌单", res.data);
            let temporary = this.highqualityList;
            let playlists = res.data.playlists;
            this.highqualityList = [...temporary, ...playlists];

            // window.console.log("合并后", this.highqualityList);

            if (!res.data.more) {
              this.allLoaded = true; // 若数据已全部获取完毕
            }
          }
          this.$refs.loadmore.onBottomLoaded();
          Indicator.close();
        })
        .catch((error) => {
          Indicator.close();
          window.console.log("精品歌单获取失败", error);
        });
    },
    openSongListDialog: function (id) {
      // dialog开关
      this.songListVisible = true;
      this.songListId = id;
    },
    closeSongListDialog: function () {
      this.songListVisible = false;
    },
    openPopup: function () {
      this.popupSongVisible = true;
    },
    closePopup: function () {
      this.popupSongVisible = false;
    },
    subSelect: function (name) {
      //添加标签
      if (this.categoryHot[0].name === "推荐") {
        let arr2 = new Array();
        arr2["activity"] = true;
        arr2["name"] = name;
        this.categoryHot[0].activity = false;
        this.categoryHot.unshift(arr2);
      } else {
        this.categoryHot[0].name = name;
      }

      this.gethighquality(0, name);
      this.popupSongVisible = false;
    },
  },
  watch: {
    popupSongVisible: function (newV) {
      window.console.log("当前播放状态：", newV);
      if (newV) {
        this.noScroll(); //禁止主页面滚动
      }
    },
  },
  created() {
    this.noScroll(); //禁止主页面滚动
    this.getcategoryHot();
    this.getcategory(); //获取分类
  },
  destroyed() {
    //主页面可滑动
    this.canScroll();
  },
};
</script>
<style>
</style>