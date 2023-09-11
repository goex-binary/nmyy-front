<template>
  <div class="record-table-con">
    <i-table :tableData="tableData"
             ref="iTable"
             @emitSelection="getSelection">
      <el-table-column v-if="false"
                       type="selection"
                       width="44">
      </el-table-column>
      <el-table-column label="序号"
                       align="center"
                       width="76">
        <template v-slot="scoped">
          {{ scoped.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="description"
                       :show-overflow-tooltip="true"
                       min-width="20%"
                       label="名称">
      </el-table-column>
      <el-table-column label="状态"
                       min-width="9%">
        <template v-slot="scoped">
          <span :class="'origin-icon origin-icon-' + scoped.row.value">{{ scoped.row.value == 0 ? '关闭' : '开启' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="updatedAt"
                       min-width="49%"
                       label="更新时间">
      </el-table-column>
      <el-table-column min-width="22%"
                       align="right">
        <template slot="header">
          <span class="left-padding">操作</span>
        </template>
        <template v-slot="scoped">
          <div class="btns-con left-padding">
            <span @click="handleModify(scoped.row)">编辑</span>
            <el-divider direction="vertical"></el-divider>
            <span @click="handleDelete(scoped.row)">删除</span>
          </div>
        </template>
      </el-table-column>
    </i-table>
  </div>
</template>
<script>
import ITable from '@/components/ITable.vue'
export default {
  name: 'RecordTable',
  components: {
    ITable
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handleModify (row) {
      this.$emit('modifyRow', row)
    },
    getAll () {
      this.$refs.iTable.getSelection()
    },
    getSelection (val) {
      this.$emit('getSelection', val)
    },
    handleDelete (row) {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('deleteRow', row)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

}
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";
.origin-icon:before {
  content: "";
  display: inline-block;
  vertical-align: middle;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #8ea8b2;
  margin-right: 10px;
}
.origin-icon-1:before {
  background-color: #1cbf86;
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
    font-size: 14px;
    color: #1271e5;
    cursor: pointer;
  }
}
.left-padding {
  padding-right: 26px;
}
</style>
