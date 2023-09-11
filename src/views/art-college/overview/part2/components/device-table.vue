<template>
  <div class="record-table-con">
    <i-table
      :tableData="tableData"
      ref="iTable"
      :highlight-current-row="true"
      @emitSelection="getSelection"
      @emitSel="handleSel"
      height="200"
    >
      <el-table-column label align="center" width="40">
        <template v-slot="scoped">{{ scoped.$index + 1 }}</template>
      </el-table-column>
      <el-table-column prop="name" :show-overflow-tooltip="true" min-width="12%" label="名称"></el-table-column>
      <el-table-column prop="orgName" :show-overflow-tooltip="true" min-width="12%" label="所在组织"></el-table-column>
      <el-table-column label="操作" align="right" width="100">
        <template v-slot="scoped">
          <span @click="handleCancel(scoped.row)" class="cancel-btn">取消选择</span>
        </template>
      </el-table-column>
    </i-table>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>
<script>
import ITable from "@/components/ITable1.vue";
export default {
  name: "RecordTable",
  components: {
    ITable,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    typeList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
    };
  },
  methods: {
    handleCancel(row) {
      this.$emit("cancelSel", row);
    },
    handleSel(list) {
      this.$emit("emitSel", list);
    },
    handlePictureCardPreview1(url) {
      this.dialogImageUrl = url;
      this.dialogVisible = true;
    },
    dowload(row) {},
    handleDetail(row) {
      this.$emit("toDetail", row);
    },
    handleModify(row) {
      this.$emit("modifyRow", row);
    },
    getAll() {
      this.$refs.iTable.getSelection();
    },
    getSelection(val) {
      this.$emit("getSelection", val);
    },
    handleDelete(row) {
      this.$confirm("确认删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$emit("deleteRow", row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";
.cancel-btn {
  cursor: pointer;
  display: inline-block;
  width: 60px;
  height: 18px;
  line-height: 18px;
  background: linear-gradient(180deg, #0e3497 0%, rgba(85, 150, 205, 0) 100%);
  border-radius: 2px;
  border: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(85, 150, 205, 1),
      rgba(85, 150, 205, 0.59)
    )
    1 1;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #ffffff;
  text-align: center;
}
.pic-con {
  display: block;
  padding: 6px 0;
  img {
    height: 80px;
  }
}
.origin-icon:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #1cbf86;
  margin-right: 10px;
}
.origin-icon-1:before {
  background-color: #8ea8b2;
}
.origin-icon-2:before {
  background-color: #f4ad30;
}
.record-table-con {
  width: 100%;
  ::v-deep .el-checkbox__inner {
    border: 1px solid #dadfe5;
    width: 16px;
    height: 16px;
  }
  ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
  ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #167dff;
    border-color: #167dff;
  }
  ::v-deep .el-checkbox__inner::after {
    left: 5px;
    top: 2px;
  }
  ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
    top: 6px;
  }
}
.btns-con {
  padding-right: 26px;
  span {
    font-size: 14px;
    color: #00c5ff;
    cursor: pointer;
  }
}
.left-padding {
  padding-right: 26px;
}
</style>
