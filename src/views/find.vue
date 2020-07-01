<template>
  <div class="find">
    <div class="topSwipe">
      <mt-swipe :auto="5000" :speed="800">
        <mt-swipe-item v-for="item in swipeList " :key="item.bannerId">
          <img v-lazy="item.pic" :alt="item.typeTitle" :bannerId="item.bannerId" />
          <span :style="{background:item.titleColor}">{{item.typeTitle}}</span>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <div class="navigation">
      <ul class>
        <li>
          <div class>
            <i class="iconfont iconrili"></i>
          </div>
          <p>每日推荐</p>
        </li>
        <li>
          <div class>
            <i class="iconfont icongedan"></i>
          </div>
          <p>歌单</p>
        </li>
        <li>
          <div class>
            <i class="iconfont iconpaixingbang"></i>
          </div>
          <p>排行榜</p>
        </li>
        <li>
          <div class>
            <i class="iconfont icondiantai"></i>
          </div>
          <p>电台</p>
        </li>
        <li>
          <div class>
            <i class="iconfont iconicon_zhibo-mian"></i>
          </div>
          <p>直播</p>
        </li>
        <li>
          <div class>
            <i class="iconfont iconhuoremen"></i>
          </div>
          <p>火前留名</p>
        </li>
        <li>
          <div class>
            <i class="iconfont iconzhuanji-"></i>
          </div>
          <p>数字专辑</p>
        </li>
        <li>
          <div class>
            <i class="iconfont icongechang"></i>
          </div>
          <p>唱聊</p>
        </li>
        <li>
          <div class>
            <i class="iconfont iconyanchu"></i>
          </div>
          <p>线上演出</p>
        </li>
      </ul>
    </div>

    <div class="recommendation">
      <div class="topTile">
        <div class="left">
          <p>人气歌单推荐</p>
        </div>
        <div class="right">
          <a href="javascript:void(0)">查看更多</a>
        </div>
      </div>

      <div class="concentration">
        <ul>
          <li v-for="item in personalizedList" :key="item.id" :personalized="item.id">
            <img :src="item.picUrl" :alt="item.name" />
            <span>
              <i class="iconfont iconicon--"></i>
              {{item.playCount|retainDoubleDigit}}万
            </span>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="recommendation songNew">
      <div class="topTile">
        <div class="left">
          <p>新歌推荐</p>
        </div>
        <div class="right">
          <a href="javascript:void(0)">查看更多</a>
        </div>
      </div>

      <div class="concentration">
        <ul>
          <li v-for="item in newsongList" :key="item.id" :newsong="item.id" >
            <img :src="item.picUrl" :alt="item.name" />
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>

    <div class="recommendation djprogram">
      <div class="topTile">
        <div class="left">
          <p>电台推荐</p>
        </div>
        <div class="right">
          <a href="javascript:void(0)">查看更多</a>
        </div>
      </div>

      <div class="concentration">
        <ul>
          <li v-for="item in djprogramList" :key="item.id" :djprogram="item.id" >
            <img :src="item.picUrl" :alt="item.name" />
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/find.less";
import { Indicator } from "mint-ui";

export default {
  name: "find",
  components: {},
  data() {
    return {
      swipeList: [],
      personalizedList: [],
      newsongList: [],
      djprogramList: []
    };
  },
  filters: {
    //拦截器
    retainDoubleDigit: function(data) {
      return Math.floor(data / 10000);
    }
  },
  methods: {
    getpersonalized: function() {
      this.$axios
        .get("/personalized?limit=6")
        .then(res => {
          this.personalizedList = res.data.result;
          // window.console.log("歌单推荐", JSON.stringify(res));
          Indicator.close();
          this.getnewsong();
        })
        .catch(error => {
          window.console.log("轮播图获取失败！/n" + error);
          Indicator.close();
        });
    },
    getnewsong: function() {
      this.$axios
        .get("/personalized/newsong")
        .then(res => {
          this.newsongList = res.data.result;
          // window.console.log("新歌推荐", JSON.stringify(res));
          Indicator.close();
          this.getdjprogram();
        })
        .catch(error => {
          window.console.log("轮播图获取失败！/n" + error);
          Indicator.close();
        });
    },
    getdjprogram: function() {
      this.$axios
        .get("/personalized/djprogram")
        .then(res => {
          this.djprogramList = res.data.result;
          // window.console.log("电台推荐", JSON.stringify(res));
          Indicator.close();
        })
        .catch(error => {
          window.console.log("轮播图获取失败！/n" + error);
          Indicator.close();
        });
    }
  },
  created() {
    Indicator.open("加载中...");
    this.$axios
      .get("/banner?type=2")
      .then(res => {
        this.swipeList = res.data.banners;
        Indicator.close();
        this.getpersonalized();
      })
      .catch(error => {
        window.console.log("轮播图获取失败！/n" + error);
        Indicator.close();
      });
  }
};
</script>

<style>
</style>