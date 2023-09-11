<template>
  <el-dialog
    :modal="false"
    title="添加"
    width="900px"
    class="add-dialog"
    top="20vh"
    @close="handleClose"
    @open="handleOpen"
    :visible.sync="dialogFormVisible"
  >
    <el-form :model="ruleForm" ref="addForm1" :rules="loginRules">
      <div class="a-form-item">
        <label for>经度：</label>
        <el-form-item prop="longitude">
          <el-input class="filename-input" v-model="ruleForm.longitude" placeholder="请输入经度" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="a-form-item">
        <label for="sort">纬度：</label>
        <el-form-item prop="latitude">
          <el-input class="filename-input" v-model="ruleForm.latitude" placeholder="请输入纬度" autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="a-form-item">
        <label for>是否绑定到楼层：</label>
        <el-form-item prop="mode">
          <el-radio-group v-model="ruleForm.mode" size="small" @change="handleChange">
            <el-radio :label="1" border>是</el-radio>
            <el-radio :label="0" border>否</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="a-form-item">
        <label for="azimuth">设备方位角</label>
        <el-form-item prop="azimuth">
          <el-select v-model="ruleForm.azimuth" clearable placeholder="如果设备有朝向，请选择">
            <el-option v-for="item in azimuthOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="a-form-item" style="height: auto">
        <label for="deviceCode">选择摄像头：</label>
        <div style="width: 100%">
          <div class="filter-con" style="margin-bottom: 10px">
            <el-input class="filename-input" v-model="keyword" placeholder="请输入摄像头名称按回车搜索" autocomplete="off" @keyup.native.enter="search"></el-input>
          </div>
          <fuel-table v-if="showTable" :tableData="tableData" @emitSel="handleSel" ref="fuelTable" />
          <el-pagination
            style="margin-top: 20px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" :loading="loading" @click="confirm">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import FuelTable from "./record-table.vue";
import { cameraQuery, deviceLocation, deviceQuery } from "@/api/neimeng";
import { Azimuth } from "@/config/constants";
import { Message } from "element-ui";

export default {
  name: "FuelAddDialog",
  components: {
    FuelTable,
  },
  props: {
    currentBuild: {
      type: String,
      default: "",
    },
    currentLevel: {
      type: String,
      default: "",
    },
    latlng: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    const validateRequired = (rule, value, callback) => {
      if (value !== 0 && !value) {
        callback(new Error("请输入内容"));
      } else {
        callback();
      }
    };
    return {
      azimuthOptions: Object.entries(Azimuth).map(
        ([key, { code, degree, name }]) => {
          return {
            value: code,
            label: name,
          };
        }
      ),
      showTable: true,
      tableData: [],
      loading: false,
      loginRules: {
        deviceCode: [{ required: true, validator: validateRequired }],
        longitude: [{ required: true, validator: validateRequired }],
        latitude: [{ required: true, validator: validateRequired }],
      },
      dialogFormVisible: false,
      ruleForm: {
        longitude: "",
        latitude: "",
        deviceCode: "",
        mode: 0,
        azimuth: null,
      },
      keyword: "",
      currentPage: 1,
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    this.initTable();
  },
  methods: {
    handleChange() {
      // this.resetFetch();
    },
    search() {
      this.resetFetch();
    },
    resetFetch() {
      this.currentPage = 1;
      this.total = 0;
      this.tableData = [];
      this.initTable();
    },
    initTable() {
      let params = {
        page: this.currentPage,
        pageSize: this.pageSize,
        queryCondition: {
          name: this.keyword,
        },
      };
      console.log("dialog currentBuild:", this.currentBuild);
      // if (this.ruleForm.mode == 1) {
      //   // 绑定楼层测参数种加上楼层信息
      //   params.building = this.currentBuild;
      //   params.floor = this.currentLevel;
      // }

      deviceQuery(params).then(res => {
        if (res.data) {
          let data = res.data ? res.data : {};
          // this.currentPage = data.page;
          this.total = data.total;
          this.tableData = res.data.record || [];
        }
      });
    },
    handleSel(list) {
      let currentCarem = list[list.length - 1];
      if (currentCarem) {
        this.ruleForm.deviceCode = currentCarem.code;
      } else {
        this.ruleForm.deviceCode = "";
      }
    },
    handleClose() {
      // this.$emit("refreshList");
      (this.showTable = false),
        (this.ruleForm = {
          longitude: "",
          latitude: "",
          deviceCode: "",
          mode: 0,
        });
      this.$refs.addForm1.clearValidate();
    },
    handleOpen() {
      (this.showTable = true),
        this.$nextTick(() => {
          this.ruleForm = {
            longitude: `${this.latlng.lng}`,
            latitude: `${this.latlng.lat}`,
            deviceCode: "",
            mode: 0,
          };
          this.$refs.addForm1.clearValidate();
          this.loading = false;
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.initTable();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.initTable();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    confirm() {
      this.$refs.addForm1.validate(valid => {
        if (valid) {
          if (!this.ruleForm.deviceCode) {
            Message({
              message: "请选择摄像头",
              type: "info",
              duration: 2 * 1000,
            });
            return false;
          }

          if (this.ruleForm.mode) {
            if (
              typeof this.currentBuild !== "undefined" &&
              typeof this.currentLevel !== "undefined"
            ) {
              this.ruleForm.building = this.currentBuild;
              this.ruleForm.floor = this.currentLevel;
            }
          }
          console.log("this.ruleForm", this.ruleForm);
          this.loading = true;
          let params = _.cloneDeep(this.ruleForm);
          params.path = params.thumb;
          deviceLocation(params).then(
            res => {
              // 添加成功 更新列表
              this.$emit("refreshList");
              Message({
                message: "设置成功",
                type: "success",
                duration: 2 * 1000,
              });
              this.dialogFormVisible = false;
            },
            err => {
              this.loading = false;
            }
          );
        } else {
          return false;
        }
      });
    },
    show() {
      this.dialogFormVisible = true;
    },
  },
};
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";
::v-deep.add-dialog {
  .el-dialog,
  .el-pager li {
    background: #0a1c27;
  }
  .el-dialog__header {
    border-bottom: 1px solid #0a2532 !important;
  }
}
.company-name {
  font-size: 14px;
  color: #141414;
}
.b-form-right {
  ::v-deep .el-upload-list {
    display: none;
  }
  border-radius: 3px;
  border: 1px solid #09394c;
  height: 32px;
  overflow: hidden;

  ::v-deep .el-input__inner {
    border: 0 !important;
  }
  width: 260px;
  @include flex(flex-start, center);
  .upload-btn {
    width: 70px;
    display: block;
    background-color: #007599;
    color: #fff;
    border-left: 1px solid #092d3d;
  }
}
.a-form-item,
.b-form-item {
  ::v-deep .el-radio {
    color: #fff;
    font-weight: 400;
    font-size: 14px;
    margin-right: 0;
    width: 70px;
    padding: 0;
    text-align: center;
    line-height: 32px;
    border-color: #093d51;
    .el-radio__input {
      display: none;
    }
    .el-radio__label {
      padding-left: 0;
    }
  }
  ::v-deep .el-radio.is-bordered.is-checked {
    border-color: #007599;
    background-color: #007599;
    .el-radio__label {
      color: #fff;
    }
  }
  ::v-deep .el-input.filename-input {
    width: 260px;
    flex: none;
  }
  margin-bottom: 20px;
  @include flex(flex-start, flex-start);
  height: 32px;
  line-height: 32px;
  label {
    padding-right: 10px;
    width: 160px;
    flex: none;
    text-align: right;
    font-size: 14px;
    color: #ffffff;
  }
  // ::v-deep .el-select {
  //   width: 160px;
  // }
}
.el-select {
  width: 260px;
}
.add-dialog {
  ::v-deep .el-dialog__footer {
    height: 62px;
    line-height: 32px;
    padding: 0;
    padding-bottom: 30px;
    text-align: center;
    .el-button {
      height: 32px;
      line-height: 32px;
      width: 70px;
      padding: 0;
      font-size: 14px;
      color: #ffffff;
      background: #0a1c27;
      border: 1px solid #093243;
    }
    .el-button.el-button--primary {
      color: #fff;
      border: 1px solid #007599;
      background-color: #007599;
    }
  }
  ::v-deep .el-dialog__body {
    padding-bottom: 0;
  }
  ::v-deep .el-date-editor .el-input__inner {
    padding-left: 32px;
  }
  ::v-deep .el-input__inner {
    border-radius: 3px;
    border: 1px solid #093447;
    color: #00c5ff;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    background: #0a1620;
    &::-webkit-input-placeholder {
      color: rgba($color: #00c5ff, $alpha: 0.5);
    }
  }
  ::v-deep .el-textarea__inner {
    border-radius: 3px;
    border: 1px solid #093447;
    color: #00c5ff;
    padding: 0 10px;
    background: #0a1620;
    &::-webkit-input-placeholder {
      color: #00c5ff;
    }
  }
  ::v-deep .el-form-item__content {
    line-height: 30px;
  }
  ::v-deep .el-input__icon {
    line-height: 32px;
  }
  ::v-deep .el-dialog {
    border-radius: 0;
  }
  ::v-deep .el-dialog__header {
    height: 40px;
    line-height: 40px;
    margin: 0;
    padding: 0 20px;
    border-bottom: 1px solid #d9dee5;
    .el-dialog__title {
      font-size: 14px;
      color: #00c5ff;
    }
    .el-dialog__headerbtn {
      top: 13px;
    }
    .el-dialog__close {
      color: #00c5ff;
      font-weight: 700;
    }
  }
}
</style>
