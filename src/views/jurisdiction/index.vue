<template>
  <div class="record-container">
    <div class="white-bg">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理"
                     name="first">
          <role-page v-if="activeName === 'first'" />
        </el-tab-pane>
        <el-tab-pane label="账号管理"
                     name="second">
          <user-page v-if="activeName === 'second'" />
        </el-tab-pane>
        <el-tab-pane label="权限管理"
                     name="third">
          <jur-page v-if="activeName === 'third'" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import RolePage from './components/role-page.vue'
import JurPage from './components/jur-page.vue'
import UserPage from './components/user-page.vue'
import store from '@/store'

export default {
  components: {
    RolePage,
    JurPage,
    UserPage
  },
  data () {
    return {
      node: store.state.user.node,
      activeName: 'first',
      keyword: '',
      type: '',
    }
  },
  methods: {
  }

}
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";
.btns-con {
  @include flex(flex-start, center);
}
.btns-con .export-btn {
  margin-left: 10px;
  border: 1px solid #b6babe;
  background-color: #fff !important;
  color: #141414 !important;
}
.m-btn {
  height: 32px;
  line-height: 32px;
  padding: 0 20px;
  font-size: 14px;
  color: #141414;
  border: 1px solid #b5b9bf;
  border-radius: 3px;
  margin-left: 20px;
  cursor: pointer;
}
.m-txt {
  font-size: 14px;
  color: #656870;
}
.r-f-left {
  @include flex(flex-start, center);
}
.record-footer {
  padding: 0 30px 0 12px;
  @include flex(space-between, center);
  height: 60px;
}
.key-select {
  width: 100px;
  margin-right: 10px;
  flex: none;
}
.key-input {
  width: 260px;
  flex: none;
}
.refresh-btn {
  flex: none;
  width: 32px;
  margin-left: 10px;
  height: 32px;
  background: url(../../assets/images/home/refresh-icon.png) no-repeat center
    center;
  background-size: 100% 100%;
  cursor: pointer;
}
.record-header {
  height: 62px;
  padding: 0 20px;
  @include flex(space-between, center);
  .new-btn {
    width: 70px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #ffffff;
    background-color: #1ebe86;
    text-align: center;
    border-radius: 3px;
    cursor: pointer;
  }
  ::v-deep .el-input__inner {
    border-radius: 3px;
    border: 1px solid #dadfe6;
    color: #141414;
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
    &::-webkit-input-placeholder {
      color: #c2c6cc;
    }
  }
  ::v-deep .el-input__icon {
    line-height: 32px;
  }
}
.r-header-right {
  @include flex(space-between, center);
}
.record-container {
  padding: 20px;
  background-color: #dadfe5;
  ::v-deep .el-tabs__nav-wrap::after {
    height: 1px;
    background-color: #d9dee5;
    z-index: 1;
  }
  ::v-deep .el-tabs__nav-scroll {
    padding-left: 20px;
  }
  ::v-deep .el-tabs__item {
    font-size: 14px;
    font-weight: 400;
    color: #141414;
  }
  ::v-deep .el-tabs__item.is-active {
    color: #1271e5;
  }
  ::v-deep .el-tabs__active-bar {
    background-color: #157dfe;
  }
  ::v-deep .el-tabs__header {
    margin: 0;
  }
}
.white-bg {
  background-color: #fff;
}
</style>
