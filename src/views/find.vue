<template>
  <div class="find">
    <!-- 顶部banner轮播 -->
    <div class="topSwipe">
      <mt-swipe :auto="3000" :speed="500">
        <mt-swipe-item v-for="item in swipeList " :key="item.bannerId">
          <img :src="item.pic" :alt="item.typeTitle" :bannerId="item.bannerId" />
          <span :style="{background:item.titleColor}">{{item.typeTitle}}</span>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 二级导航栏 -->
    <div class="navigation">
      <ul class>
        <li v-for="(item,index) in iconList" :key="index" @click="middleMethods(index)">
          <div class>
            <img :src="item.iconUrl" :alt="item.name" />
            <span v-if="index===0">{{day}}</span>
          </div>
          <p>{{item.name}}</p>
        </li>
      </ul>
    </div>

    <!-- 推荐歌单 -->
    <div class="recommendation" v-if="contentShow">
      <div class="topTile">
        <div class="left">
          <p>{{personalizedList.uiElement.subTitle.title}}</p>
        </div>
        <div class="right">
          <a href="javascript:void(0)" @click="openSongsheetDialog('推荐')">查看更多</a>
        </div>
      </div>

      <div class="concentration">
        <ul>
          <li
            v-for="item in personalizedList.creatives"
            :key="item.creativeId"
            @click="openSongListDialog(item.creativeId)"
          >
            <img :src="item.uiElement.image.imageUrl" :alt="item.uiElement.mainTitle.title" />
            <span>
              <i class="iconfont iconicon--"></i>
              {{item.resources[0].resourceExtInfo.playCount|retainDoubleDigit}}
            </span>
            <p>{{item.uiElement.mainTitle.title}}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 歌曲推荐 -->
    <div class="recommendation songNew" v-if="contentShow">
      <div class="topTile">
        <div class="left">
          <p>{{newsongList.uiElement.subTitle.title}}</p>
        </div>
        <div class="right">
          <a href="javascript:void(0)" @click="playMusicAll()">
            <i class="iconfont iconbofang"></i>播放全部
          </a>
        </div>
      </div>

      <div class="concentration">
        <ul class="topUl">
          <li v-for="(item,index) in newsongList.creatives" :key="index">
            <ul class="smallList">
              <li
                v-for="(song,indexs) in item.resources"
                :key="indexs"
                @click="playMusic(song.resourceExtInfo.songData,song.uiElement.image.imageUrl)"
              >
                <div class="left">
                  <img :src="song.uiElement.image.imageUrl" alt="d" />
                </div>
                <div class="center">
                  <p>
                    <span>{{song.uiElement.mainTitle.title}}</span>&nbsp;
                  </p>
                  <p>{{song.resourceExtInfo.artists[0].name}}</p>
                </div>
                <div class="right">
                  <div class="icon">
                    <i class="iconfont iconbofang"></i>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- 场景推荐 -->
    <div class="recommendation" v-if="contentShow">
      <div class="topTile">
        <div class="left">
          <p>{{sceneList.uiElement.subTitle.title}}</p>
        </div>
        <div class="right">
          <a href="javascript:void(0)" @click="openSongsheetDialog('官方')">查看更多</a>
        </div>
      </div>

      <div class="concentration">
        <ul>
          <li
            v-for="(item,index) in sceneList.creatives"
            :key="index"
            @click="openSongListDialog(item.creativeId)"
          >
            <img :src="item.uiElement.image.imageUrl" :alt="item.uiElement.mainTitle.title" />
            <p>{{item.uiElement.mainTitle.title}}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 云村精选 -->
    <div class="recommendation cloudVillage" v-if="contentShow">
      <div class="topTile">
        <div class="left">
          <p>{{cloudVillage.uiElement.subTitle.title}}</p>
        </div>
        <div class="right">
          <a href="javascript:void(0)">查看更多</a>
        </div>
      </div>

      <div class="concentration">
        <ul>
          <li v-for="(item,index) in cloudVillage.extInfo.squareFeedViewDTOList" :key="index" @click="openCloudVillagedialog()">
            <img :src="item.resource.mlogBaseData.coverUrl" :alt="item.resource.mlogBaseData.text" />
            <p>{{item.resource.mlogBaseData.text}}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 每日推荐弹出层 -->
    <daily-recommendation @close="closeDialog" v-if="dailyVisible"></daily-recommendation>

    <!-- 人气歌单弹出层 -->
    <song-listdetails :songListId="songListId" @shut="closeSongListDialog" v-if="songListVisible"></song-listdetails>

    <!-- 歌单列表弹出层 -->
    <song-sheet
      :songSheetType="songSheetType"
      @shutdown="closeSongsheetDialog"
      v-if="songSheetVisible"
    ></song-sheet>

    <!-- 歌单列表弹出层 -->
    <cloud-villagedetails @CloudVillagedown="closeCloudVillagedialog" v-if="cloudVillageVisible"></cloud-villagedetails>
  </div>
</template>

<script>
import "../assets/less/find.less";
import { Indicator } from "mint-ui";
import DailyRecommendation from "../components/recommendation";
import SongListdetails from "../components/songListDetails";
import SongSheet from "../components/songSheet";
import CloudVillagedetails from "../components/cloudVillageDetails";

export default {
  name: "find",
  components: {
    DailyRecommendation,
    SongListdetails,
    SongSheet,
    CloudVillagedetails,
  },
  data() {
    return {
      swipeList: [], //轮播图list
      personalizedList: [], //人气歌单
      newsongList: [], //音乐推荐
      sceneList: [], //场景推荐
      cloudVillage: [], //云村精选
      iconList: [], //首页-发现-圆形图标入口列表
      dailyVisible: false, //每日推荐弹出层
      songListVisible: false, //人气歌单弹出层
      songListId: 0, //人气歌单ID
      songSheetVisible: false, //歌单列表弹出层
      contentShow: false, //数据渲染前不显示
      day: "", //当前日期
      songSheetType: "推荐", //默认打开歌单类型
      cloudVillageVisible: false, //云村精选详情
    };
  },
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
  methods: {
    playMusic: function (songinfos, songinfospicUrl) {
      // 根据localStorage的歌曲id,获取详细歌曲的信息
      window.console.log(songinfos);
      let songId = songinfos.id ? songinfos.id : songinfos.resourceId;
      songinfos["picUrl"] = songinfospicUrl;
      this.$store.commit("setsongInfo", JSON.stringify(songinfos));
      this.getplayMusic(songId, songinfos);
    },
    openDialog: function () {
      // dialog开关
      this.dailyVisible = true;
    },
    closeDialog: function () {
      this.dailyVisible = false;
    },
    openSongListDialog: function (id) {
      // dialog开关
      this.songListVisible = true;
      this.songListId = id;
    },
    closeSongListDialog: function () {
      this.songListVisible = false;
    },
    openSongsheetDialog: function (type) {
      // dialog开关
      this.songSheetVisible = true;
      this.songSheetType = type;
    },
    closeSongsheetDialog: function () {
      this.songSheetVisible = false;
    },
    gethomedata: function () {
      this.$axios({
        url: "/homepage/block/page",
        params: {
          refresh: true,
        },
      })
        .then((res) => {
          // window.console.log("首页", JSON.stringify( res.data));
          this.personalizedList = res.data.data.blocks[0];
          this.newsongList = res.data.data.blocks[1];
          this.sceneList = res.data.data.blocks[2];
          this.cloudVillage = res.data.data.blocks[3];
          this.contentShow = true;
          this.geticon();
        })
        .catch((err) => {
          window.console.log("获取首页数据失败！", err);
        });
    },
    geticon: function () {
      this.$axios({
        url: "/homepage/dragon/ball",
      })
        .then((res) => {
          // window.console.log("圆形图标入口列表", res.data);
          this.iconList = res.data.data;
        })
        .catch((err) => {
          window.console.log("圆形图标入口列表失败！", err);
        });
    },
    middleMethods: function (type) {
      switch (type) {
        case 0:
          this.openDialog();
          break;

        case 1:
          this.openSongsheetDialog("推荐");
          break;
      }
    },
    playMusicAll: function () {
      let that = this;
      let songAll = [];

      that.newsongList.creatives.forEach(function (item) {
        item.resources.forEach(function (i) {
          let images = i.uiElement.image.imageUrl;
          i.picUrl = images;
          i.name = i.uiElement.mainTitle.title;
          window.console.log(i);
          songAll.push(i);
        });
      });
      that.$store.commit("setplaylist", songAll);
      that.$store.commit("setserialNumber", 0);
      that.playMusic(songAll[0], songAll[0].picUrl);
    },
    closeCloudVillagedialog: function () {
      this.cloudVillageVisible = false;
    },
    openCloudVillagedialog: function () {
      this.cloudVillageVisible = true;
    },
  },
  created() {
    Indicator.open("加载中...");
    this.gethomedata(); //获取首页内容
    let data = new Date();
    this.day = data.getDate() <= 9 ? "0" + data.getDate() : data.getDate();
    // 获取banner图
    this.$axios
      .get("/banner?type=2")
      .then((res) => {
        this.swipeList = res.data.banners;
        Indicator.close();

        // window.console.log(res.data.banners);
      })
      .catch((error) => {
        window.console.log("轮播图获取失败！/n" + error);
        Indicator.close();
      });
  },
  beforeCreate() {},
};
</script>

<style>
</style>