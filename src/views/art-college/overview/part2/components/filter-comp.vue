<template>
  <div class="filter-comp-box">
    <el-cascader
      v-if="allDevicesData && allDevicesData.length"
      :options="cascaderData"
      popper-class="filter-comp-pop"
      filterable
      @change="handleChange"
      v-model="filterVal"
    ></el-cascader>
  </div>
</template>
<script>
import { Building, DEVICE_CONSTANTS } from "@/config/constants";
export default {
  props: {
    allDevicesData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      cascaderData: [],
      filterVal: null,
    };
  },
  watch: {
    allDevicesData(newVal) {
      if (newVal && newVal.length) {
        // 根据 newVal 更新级联选择器的数据
        console.log("newVal:", newVal);
        this.cascaderData = this.processData(newVal);
      }
    },
  },
  methods: {
    getFilterVal() {
      return this.filterVal;
    },
    handleChange(val) {
      this.filterVal = val;
      console.log("filterVal", this.filterVal);
      this.$emit("focusDeviceChange", val[2]);
    },
    processData(allDevicesData) {
      const cascaderData = [
        {
          value: 0,
          label: "设备",
          children: this.generateDeviceData(allDevicesData),
        },
        {
          value: 1,
          label: "区域",
          children: this.generateAreaData(allDevicesData),
        },
      ];
      return cascaderData;
    },

    generateDeviceData(allDevicesData) {
      return Object.entries(DEVICE_CONSTANTS.DEVICE_TYPES).map(
        ([key, typeLabel]) => {
          const devices = allDevicesData.filter(
            device => device.type === parseInt(key)
          );
          return {
            value: parseInt(key),
            label: typeLabel,
            children: devices.map(device => ({
              value: device.code,
              label: device.name,
              leaf: true,
            })),
          };
        }
      );
    },

    generateAreaData(allDevicesData) {
      return Object.entries(Building).map(([key, buildingInfo]) => {
        const devicesInBuilding = allDevicesData.filter(
          device => device.building === buildingInfo.id
        );
        return {
          value: buildingInfo.id,
          label: buildingInfo.text,
          children: devicesInBuilding.map(device => ({
            value: device.code,
            label: device.name,
            leaf: true,
          })),
        };
      });
    },
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
