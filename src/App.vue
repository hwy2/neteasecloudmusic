<template>
  <div id="app">
    <router-view />
    <div class="tabbar">
      <div class="left">
        
      </div>
      <div class="right">
        <i class="iconfont icontubiaozhizuomoban"></i>
         <i class="iconfont iconbofangliebiao"></i>
      </div>
    </div>
  </div>
</template>


<style lang="less">
* {
    margin: 0;
    padding: 0;
    html {
        overflow: hidden;
        body {
            overflow: hidden;
        }
    }
}

.tabbar{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 106px;
  border-top: 2PX solid #f0f0f0;

  .left{
    float: left;
    width: 604px;
    height: 100%;
  }
  .right{
    float: left;
    width: 146px;
    height: 100%;
    padding-right: 22px;
    box-sizing: border-box;

    .icontubiaozhizuomoban{
      font-size: 48px;
      line-height: 106px;
      padding-right: 38px;
    }

    .iconbofangliebiao{
      font-size: 44px;
      line-height: 106px;
    }
  }
}


</style>
