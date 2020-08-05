<template>
  <div class="home">
    <!-- 左侧抽屉 -->
    <div class="leftDrawer">
      <mt-popup v-model="popupVisible" position="left">
        <div class="content">
          <div class="upperPart">
            <div class="vip">
              <p>
                <span>开通黑胶VIP</span>
                <a href="javascript:void();">会员中心</a>
              </p>
              <p>
                <span>加入黑胶VIP，立享超17项专属特权</span>
              </p>
            </div>
            <div class="discount">
              <p>
                <span>领券首开会员仅1.8元，仅限两天!</span>
              </p>
              <p>
                <span>尊享海量会员曲库等超17项特权</span>
              </p>
              <a href="javascript:void();">
                会员
                <br />1.8元
              </a>
              <i class="iconfont iconzuojiantou-cu"></i>
            </div>
          </div>
          <div class="lowerPart">
            <div class="userProfile">
              <div class="top clearfix">
                <div class="left">
                  <img :src="profile.avatarUrl" alt="头像" />
                  <span>{{profile.nickname}}</span>
                </div>
                <div class="right clearfix">
                  <a href="javascript:void(0)">
                    <i class="iconfont iconqiandao"></i>签到
                  </a>
                </div>
              </div>

              <div class="bottomBar">
                <div>
                  <i class="iconfont iconyoujian"></i>
                  <p>我的消息</p>
                </div>
                <div>
                  <i class="iconfont iconhaoyou"></i>
                  <p>我的好友</p>
                </div>
                <div>
                  <i class="iconfont iconzhuye"></i>
                  <p>个人主页</p>
                </div>
                <div>
                  <i class="iconfont iconquanmianshidai-"></i>
                  <p>个性装扮</p>
                </div>
              </div>
            </div>

            <div class="creator">
              <div>
                <i class="iconfont iconbulb"></i>
                <span>创作者中心</span>
              </div>
            </div>

            <div class="listeningMusic">
              <ul>
                <li>
                  <div class="left">
                    <i class="iconfont iconmaikefeng"></i>
                    <span>听歌识曲</span>
                  </div>
                  <div class="right">
                    <p>可识别其他app歌曲</p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconpiaoquan"></i>
                    <span>演出</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont icongouwuchezhengpin"></i>
                    <span>商城</span>
                  </div>
                  <div class="right">
                    <p>影院级tws 5折</p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont icondingwei"></i>
                    <span>附近的人</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconyouxi"></i>
                    <span>游戏推荐</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconlingdang"></i>
                    <span>口袋彩铃</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="listeningMusic otherFunctions">
              <ul>
                <li>
                  <div class="left">
                    <i class="iconfont icondingdan"></i>
                    <span>我的订单</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont icondingshi"></i>
                    <span>定时停止播放</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconsaoyisao"></i>
                    <span>扫一扫</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont icondingshi1"></i>
                    <span>音乐闹钟</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconV"></i>
                    <span>音乐云盘</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconqianbao"></i>
                    <span>在线听歌免流量</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconyouhuiquan"></i>
                    <span>优惠券</span>
                  </div>
                  <div class="right">
                    <p></p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="iconfont iconanquanzhuye"></i>
                    <span>青少年模式</span>
                  </div>
                  <div class="right">
                    <p>未开启</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div class="barBotm">
            <div>
              <i class="iconfont iconyueliang"></i>
              <span>夜间模式</span>
            </div>
            <div>
              <i class="iconfont iconshezhi"></i>
              <span>设置</span>
            </div>
            <div>
              <i class="iconfont icontuichu"></i>
              <span>退出</span>
            </div>
          </div>
        </div>
      </mt-popup>
    </div>

    <!-- 顶部导航栏 -->
    <div class="navbarWarp">
      <div class="drawer">
        <i class="iconfont icongengduo" @click="ListenDrawer()"></i>
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item id="me">我的</mt-tab-item>
        <mt-tab-item id="find">发现</mt-tab-item>
        <mt-tab-item id="yuncun">云村</mt-tab-item>
        <mt-tab-item id="videoY">视频</mt-tab-item>
      </mt-navbar>
      <div class="search">
        <i class="iconfont iconsousuo"></i>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import "../assets/less/home.less";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      popupVisible: false,
      selected: "find"
    };
  },
  computed: {
    profile: {
      //播放状态
      get() {
        return this.$store.state.profile;
      },
      set(v) {
        // 使用vuex中的mutations中定义好的方法来改变
        this.$store.commit("setprofile", v);
      }
    }
  },
  methods: {
    ListenDrawer: function() {
      this.popupVisible = true;
    }
  },
  watch: {
    selected: function(newV, oldV) {
      window.console.log("当前选择：" + newV);
      window.console.log("上一个选择：" + oldV);
      this.$router.push({ name: newV });
      // this.$store.commit("setSelected", newV);
    },
    popupVisible: function(newV) {
      if (newV) {
        this.noScroll(); //禁止主页面滚动
        let styleLang= document.getElementById("playArea");
        styleLang.style.zIndex = 2000;
      } else {
        //主页面可滑动
        this.canScroll();
        let styleLang= document.getElementById("playArea");
        styleLang.style.zIndex = 2002;
      }
    }
  },
  created() {}
};
</script>
