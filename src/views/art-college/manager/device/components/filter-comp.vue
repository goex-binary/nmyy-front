<template>
  <div class="filter-comp-box">
    <el-cascader
      :props="props"
      popper-class="filter-comp-pop"
      filterable
      v-model="filterVal"
    ></el-cascader>
  </div>
</template>
<script>
let id = 0;
export default {
  data() {
    return {
      filterVal: null,
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          console.log("node:", node);
          const { level } = node;
          let nodes = [];
          if (level == 0) {
            nodes = [
              {
                value: 0,
                label: `设备`,
                leaf: false,
              },
              {
                value: 1,
                label: `区域`,
                leaf: false,
              },
            ];
          } else if (level == 1) {
            if (node.value === 0) {
              // 设备
              nodes = [
                {
                  value: 2,
                  label: `枪机摄像头`,
                  leaf: false,
                },
                {
                  value: 3,
                  label: `球机摄像头`,
                  leaf: false,
                },
                {
                  value: 4,
                  label: `卡口`,
                  leaf: false,
                },
                {
                  value: 5,
                  label: `速通门`,
                  leaf: false,
                },
                {
                  value: 6,
                  label: `人脸识别`,
                  leaf: false,
                },
              ];
            } else {
              // 区域
              nodes = [
                {
                  value: 7,
                  label: `区域1`,
                  leaf: false,
                },
                {
                  value: 8,
                  label: `区域2`,
                  leaf: false,
                },
                {
                  value: 9,
                  label: `区域3`,
                  leaf: false,
                },
                {
                  value: 10,
                  label: `区域4`,
                  leaf: false,
                },
                {
                  value: 11,
                  label: `区域5`,
                  leaf: false,
                },
              ];
            }
          }
          resolve(nodes);
        },
      },
    };
  },
};
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";
::v-deep.filter-comp-box {
  .el-input__inner {
    width: 335px;
    height: 40px;
    background: #051e35;
    border-radius: 4px;
    border: 1px solid #19d8ff;
    font-size: 14px;
    color: #8da9bf;
  }
}
</style>

<style lang="scss">
@import "~@/styles/mixin.scss";
.filter-comp-pop {
  background: #051e35;
  border-radius: 4px;
  border: 1px solid #414f64;

  .popper__arrow {
    display: none;
  }

  .el-cascader-menu {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8da9bf;
    border-right: 1px solid #414f64;
  }
  .el-cascader-node:not(.is-disabled):focus,
  .el-cascader-node:not(.is-disabled):hover {
    background: #0f3251;
    color: #ffffff;
  }

  .el-cascader-node.in-active-path,
  .el-cascader-node.is-active,
  .el-cascader-node.is-selectable.in-checked-path {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #ffffff;
    background: #0f3251;
  }
}
</style>
