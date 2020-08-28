<template>
  <div class="search">
    <div class="dialog-mask">
      <div class="dialog-wrapper animated fadeInUp" ref="dialogWrapper">
        <div class="dialog-container" ref="viewBox">
          <div class="topSearchBar">
            <div class="left" @click="dialogClose()">
              <i class="iconfont iconfanhui"></i>
            </div>

            <div class="right">
              <form action target="frameFile">
                <mt-search v-model="searchvalue" id="minsearch" @keyup.enter.native="getSearch()">
                  <mt-cell
                    v-for="(item,i) in resultSong"
                    :key="i"
                    :title="item.name"
                    :value="item.value"
                    @click.native="select(item.name)"
                  ></mt-cell>
                </mt-search>
              </form>
              <iframe name="frameFile" style="display: none;"></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/search.less";
export default {
  name: "search",
  data() {
    return {
      searchvalue: "",
      resultSong: [],
    };
  },
  methods: {
    dialogClose: function () {
      this.$emit("searchdown");
    },
    getSearch: function () {
      this.$axios
        .get("/search", {
          params: {
            keywords: this.searchvalue,
          },
        })
        .then((res) => {
          window.console.log("搜索", res.data);
          this.resultSong = res.data.result.songs;
          document.activeElement.blur();
        })
        .catch((error) => {
          window.console.log("分类获取失败", error);
        });
    },
    select(val) {
      this.searchvalue = val;
    },
  },
  created() {
    this.noScroll(); //禁止主页面滚动
  },
  destroyed() {
    //主页面可滑动
    this.canScroll();
  },
};
</script>

<style>
</style>