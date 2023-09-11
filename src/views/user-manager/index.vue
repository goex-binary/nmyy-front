<template>
  <div class="record-container">
    <div class="white-bg">
      <el-tabs v-model="activeName">
        <el-tab-pane label="轮播图设置"
                     name="first">
          <!-- <document-library v-if="activeName === 'first'" /> -->
        </el-tab-pane>
        <el-tab-pane label="功能开关"
                     name="second">
          <!-- <document-type v-if="activeName === 'second'" /> -->
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
import DocumentLibrary from './components/document-library.vue'
import DocumentType from './components/document-type.vue'
import store from '@/store'

export default {
  components: {
    DocumentLibrary,
    DocumentType
  },
  data () {
    return {
      node: store.state.user.node,
      activeName: 'first',
    }
  },
  methods: {
  }

}
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";
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
  background-color: 0a1620;
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
