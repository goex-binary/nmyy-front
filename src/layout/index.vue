<template>
  <div class="main-wrapper">
    <div class="main-header-con">
      <main-header />
    </div>
    <div :class="classObj"
         class="app-wrapper">
      <left-menu class="sidebar-container" />
      <div class="main-container" style="padding: 20px;background: #0a1620;">
        <!-- <div :class="{'fixed-header':fixedHeader}"> -->
          <!-- <navbar /> -->
        <!-- </div> -->
        <app-main />
      </div>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/LeftMenu'
import MainHeader from './components/MainHeader.vue'
import { Navbar, AppMain } from './components'

export default {
  name: 'Layout',
  components: {
    LeftMenu,
    Navbar,
    AppMain,
    MainHeader
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    fixedHeader () {
      return this.$store.state.settings.fixedHeader
    },
    classObj () {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation
      }
    }
  },
  methods: {
    handleClickOutside () {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";
.main-header-con {
  height: 60px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
}
.main-wrapper {
  height: 100%;
  background: #0a1620;
}
.app-wrapper {
  @include clearfix;
  position: relative;
  // height: calc(100% - 91px);
  height: 100%;
  width: 100%;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 60px;
  right: 0;
  z-index: 100;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 57px);
}
</style>
