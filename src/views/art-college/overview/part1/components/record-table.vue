<template>
  <div class="record-table-con">
    <i-table :tableData="tableData" ref="iTable" @emitSelection="getSelection" height="296px">
      <el-table-column type="selection" width="64" align="center"></el-table-column>
      <el-table-column prop="name" :show-overflow-tooltip="true" min-width="12%" label="园区"></el-table-column>
      <el-table-column prop="enventType" :show-overflow-tooltip="true" min-width="12%" label="事件类型"></el-table-column>
      <el-table-column prop="time" :show-overflow-tooltip="true" min-width="18%" label="时间"></el-table-column>
      <el-table-column prop="alermLevel" :show-overflow-tooltip="true" min-width="18%" label="报警级别"></el-table-column>

      <el-table-column min-width="22%">
        <template slot="header">
          <span class="left-padding">操作</span>
        </template>
        <template v-slot="scoped">
          <div class="btns-con">
            <span @click="handleModify(scoped.row)">确认</span>
            <!-- <el-divider direction="vertical"></el-divider> -->
            <span @click="handleDelete(scoped.row)">回查</span>
          </div>
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
      // this.$confirm('确认删除?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      // }).then(() => {
      this.$emit("backcallEvent", row);
      // }).catch(() => {
      //     this.$message({
      //         type: 'info',
      //         message: '已取消删除'
      //     })
      // })
    },
  },
};
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";

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
    width: 39px;
    text-align: center;
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
    display: inline-block;
    cursor: pointer;

    & + span {
      margin-left: 10px;
    }
  }
}

.left-padding {
  padding-right: 26px;
}
</style>
