<template>
  <div class="part-con scale">
    <div class="part-head"></div>
    <div class="part-main">
      <LeafMap />

      <div class="park-info-overview">
        <p class="park-i-o-title">园区概况</p>
        <div class="park-i-o-detail">
          <div class="p-i-o-item">
            <span class="p-i-o-label">总面积：</span>
            <span class="p-i-o-val">40000</span>
            <span class="p-i-o-uni">m²</span>
          </div>
          <div class="p-i-o-item">
            <span class="p-i-o-label">楼宇数：</span>
            <span class="p-i-o-val">10</span>
            <span class="p-i-o-uni">栋</span>
          </div>
        </div>

        <div class="p-i-info-list">
          <div class="p-i-info-item">
            <img class="p-i-info-icon" src="../../../../assets/neimeng/info1.png" />
            <div class="p-i-info-right">
              <div class="p-i-info-outer">
                <p class="p-i-info-label">人员总数</p>
              </div>
              <p class="p-i-info-val">2890</p>
            </div>
          </div>
          <div class="p-i-info-item">
            <img class="p-i-info-icon" src="../../../../assets/neimeng/info2.png" />
            <div class="p-i-info-right">
              <div class="p-i-info-outer">
                <p class="p-i-info-label">学生总数</p>
              </div>
              <p class="p-i-info-val">1800</p>
            </div>
          </div>
          <div class="p-i-info-item">
            <img class="p-i-info-icon" src="../../../../assets/neimeng/info3.png" />
            <div class="p-i-info-right">
              <div class="p-i-info-outer">
                <p class="p-i-info-label">教师总数</p>
              </div>
              <p class="p-i-info-val">340</p>
            </div>
          </div>
          <div class="p-i-info-item">
            <img class="p-i-info-icon" src="../../../../assets/neimeng/info4.png" />
            <div class="p-i-info-right">
              <div class="p-i-info-outer">
                <p class="p-i-info-label">安防设备</p>
              </div>
              <p class="p-i-info-val">540</p>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="bs-footer">
        <div class="nav-con">
          <router-link to="/overview-part2">园区总览</router-link>
          <router-link to="/overview-part1">智能巡检</router-link>
          <router-link to="/overview-part1">设备运维</router-link>
          <router-link to="/overview-part1">车辆管理</router-link>
          <router-link to="/overview-part3">网格管理</router-link>
        </div>
      </div>-->
      <router-link to="/layout">
        <img src="../../../../assets/neimeng/setting.png" class="setting-icon" />
      </router-link>
    </div>
  </div>
</template>

<script>
import LeafMap from "./components/map.vue";

export default {
  components: {
    LeafMap,
  },
  data() {
    return {
      scale: "1,1",
    };
  },
  methods: {
    resize() {
      let e = window.innerWidth;
      let o = window.innerHeight;
      let i = (e / 1920).toFixed(2) + "," + (o / 1080).toFixed(2);
      let scaleDom = document.querySelector(".scale");
      scaleDom.style.transform = "scale(" + i + ")";
      this.scale = i;
    },
  },
  mounted() {
    this.resize();
    window.addEventListener("resize", this.resize);
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.setting-icon {
  position: absolute;
  z-index: 9999;
  right: 50px;
  top: 120px;
  cursor: pointer;
}

.p-i-info-outer {
  width: 106px;
  height: 16px;
  background: url(../../../../assets/neimeng/overview-bg.png) no-repeat center
    center;
  background-size: 100% 100%;
  margin-bottom: 8px;
}

.p-i-info-val {
  height: 37px;
  font-size: 32px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #e5fafd;
  line-height: 37px;
  background: linear-gradient(180deg, #eeeeee 0%, #68dbff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.p-i-info-label {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  line-height: 20px;
  text-shadow: 0px 4px 3px rgba(0, 0, 0, 0.5);
  background: linear-gradient(360deg, #86dffb 0%, #d1e9f1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  top: -12px;
  padding-left: 12px;
}

.p-i-info-item {
  width: 50%;
  @include flex(flex-start, center);
}

.p-i-info-list {
  @include flex(space-between, center);
  width: 410px;
  padding-top: 30px;
  flex-wrap: wrap;
  gap: 40px 0;
}

.p-i-o-uni {
  height: 45px;
  font-size: 26px;
  font-family: PingFangSC-Semibold, PingFang SC;
  color: #19d8ff;
  line-height: 45px;
}

.p-i-o-val {
  height: 47px;
  font-size: 40px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #19d8ff;
  line-height: 47px;
  margin-right: 8px;
}

p {
  margin: 0;
}

.park-i-o-detail {
  @include flex(flex-start, center);
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  line-height: 22px;
  gap: 50px;
}

.park-i-o-title {
  height: 33px;
  font-size: 24px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  line-height: 33px;
  margin-bottom: 28px;
}

.park-info-overview {
  position: absolute;
  left: 40px;
  top: 120px;
  z-index: 9999;
}

.nav-con {
  width: 840px;
  margin: 0 auto;
  @include flex(space-between, center);
  font-size: 18px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #ffffff;

  a {
    width: 115px;
    text-align: center;
    height: 36px;
    line-height: 42px;
    background: linear-gradient(180deg, #084263 0%, #041f34 100%);

    &.router-link-exact-active,
    &.router-link-active {
      background: linear-gradient(
        180deg,
        rgba(75, 143, 238, 0) 0%,
        #45baec 100%
      );
    }

    position: relative;

    &:last-child {
      width: 130px;
      background: url(../../../../assets/neimeng/nav2.png) no-repeat center
        center;
      background-size: 100% 100%;

      &.router-link-active {
        background: url(../../../../assets/neimeng/nav2-active.png) no-repeat
          center center;
        background-size: 100% 100%;
      }
    }

    &:first-child {
      width: 130px;
      background: url(../../../../assets/neimeng/nav1.png) no-repeat center
        center;
      background-size: 100% 100%;

      &.router-link-active {
        background: url(../../../../assets/neimeng/nav1-active.png) no-repeat
          center center;
        background-size: 100% 100%;
      }
    }
  }
}

.bs-footer {
  width: 1920px;
  height: 61px;
  left: 0;
  bottom: 0;
  position: absolute;
  z-index: 9999;
  background: url(../../../../assets/neimeng/footer-bg.png) no-repeat center
    center;
  background-size: 100% 100%;
  padding-top: 6px;
}

.part-main {
  height: 100%;
  position: relative;
}

.part-con {
  width: 1920px;
  height: 1080px;
  transform-origin: top left;
}

.part-head {
  position: absolute;
  width: 1920px;
  height: 100px;
  background: linear-gradient(
    180deg,
    rgba(34, 146, 235, 0) 0%,
    rgba(28, 156, 255, 0.5) 100%
  );
  backdrop-filter: blur(10px);

  background-image: url(../../../../assets/neimeng/title.png);
  background-position: center -73px;
  z-index: 9999;
}
</style>
