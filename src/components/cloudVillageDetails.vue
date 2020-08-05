<template>
  <div class="dialog-mask">
    <div class="dialog-wrapper animated fadeInUp" ref="dialogWrapper">
      <div class="dialog-container" ref="viewBox">
        <div class="containerDiaLog" >
          <!-- song banner -->
          <div class="topBanner songListTopBanner songSheetTopBanner">
            <div class="topnarBar">
              <div id="back" @click="songListClose()">
                <i class="iconfont iconfanhui"></i>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cloudVillageDetails",
  data() {
    return {};
  },
  methods: {
    cloudVillageClose: function () {
         this.$emit("CloudVillagedown");
    },
  },
};
</script>

<style>
</style>