<template>
  <div class="record-table-con">
    <i-table :tableData="planList" height="200" style="width: 100%">
      <el-table-column prop="planName" label="预案名称" width="180"></el-table-column>
      <el-table-column prop="planLevel" label="预案等级" width="180"></el-table-column>
      <el-table-column prop="planDescription" label="预案说明" width="180"></el-table-column>
      <el-table-column prop="actionType" label="预案动作" width="180">
        <template v-slot="scoped">
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in actionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="planTarget" label="动作目标"></el-table-column>
      <el-table-column label="操作" align="right" width="200">
        <template v-slot="scoped">
          <span @click="modifyPlan(scoped.row)" class="cancel-btn">修改</span>
          <span @click="deletePlan(scoped.row)" class="cancel-btn">删除</span>
          <span @click="viewDetail(scoped.row)" class="cancel-btn">详情</span>
        </template>
      </el-table-column>
    </i-table>
    <add-dialog ref="addDialog" />
  </div>
</template>

<script>
import ITable from "@/components/ITable1.vue";
import AddDialog from "./components/add-dialog.vue";
export default {
  components: {
    ITable,
  },
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: "",
      planList: [
        {
          planName: "预案1",
          planLevel: "一级",
          planDescription: "预案说明",
          actionType: "动作类型",
          planTarget: "动作目标",
        },
        {
          planName: "预案2",
          planLevel: "二级",
          planDescription: "预案说明",
          actionType: "动作类型",
          planTarget: "动作目标",
        },
        {
          planName: "预案3",
          planLevel: "三级",
          planDescription: "预案说明",
          actionType: "动作类型",
          planTarget: "动作目标",
        },
      ],
      actionOptions: [
        {
          label: "动作类型1",
          value: "动作类型1",
        },
        {
          label: "动作类型2",
          value: "动作类型2",
        },
        {
          label: "动作类型3",
          value: "动作类型3",
        },
      ],
    };
  },
  methods: {
    modifyPlan(row) {
      console.log("modify row: ", row);
      this.$refs.addDialog.showDialog(row);
    },
    deletePlan(row) {
      this.$confirm("此操作将永久删除该预案, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    viewDetail(row) {
      this.$router.push({
        path: "/art-college/manager/plan/detail",
        query: {
          id: row.id,
        },
      });
    },
    refreshList() {
      this.$refs.addDialog.dialogVisible = false;
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
