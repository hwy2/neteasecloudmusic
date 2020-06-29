<template>
  <div id="app">
    <router-view />
    <div class="tabbar clearfix">
      <div class="left clearfix">
        <div class="musicImg">
          <span>
            <img src="./assets/images/lo.png" alt="歌曲封面" />
          </span>
        </div>
        <div class="details">
          <p class="songTitle">I Believe</p>
          <p>横滑可以切换上下首哦</p>
        </div>
      </div>
      <div class="right">
        <i class="iconfont icontubiaozhizuomoban"></i>
        <i class="iconfont iconbofangliebiao"></i>
      </div>
    </div>
  </div>
</template>


<style lang="less">

.tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 106px;
  border-top: 2px solid #f0f0f0;

  .left {
    float: left;
    width: 604px;
    height: 100%;
    box-sizing: border-box;
    padding-left: 10px;

    .musicImg {
      float: left;
      width: 80px;
      height: 100%;
      position: relative;
      span {
        width: 80px;
        height: 80px;
        display: inline-block;
        background-color: #eee;
        border-radius: 80px;
        box-sizing: border-box;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        img{
          width: 100%;
          height: 100%;
        }
      }
    }

    .details {
      float: left;
      width: 514px;
      height: 100%;
      box-sizing: border-box;
      padding-top: 8px;
      padding-left: 10px;

      p:nth-of-type(1){
        line-height: 1.8;
        font-size: 18px;
        font-weight: bold;
        color: #000;
      }

      p:nth-of-type(2){
        line-height: 1.8;
        font-size: 20px;
        color: #828282;
      }
    }
  }
  .right {
    float: left;
    width: 146px;
    height: 100%;
    padding-right: 22px;
    box-sizing: border-box;

    .icontubiaozhizuomoban {
      font-size: 48px;
      line-height: 106px;
      padding-right: 38px;
    }

    .iconbofangliebiao {
      font-size: 44px;
      line-height: 106px;
    }
  }
}
</style>
