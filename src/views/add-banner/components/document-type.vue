<template>
  <div>
    <div class="record-header">
      <span class="new-btn"
            @click="showAddForm">新建</span>
    </div>
    <fuel-table :tableData="tableData"
                ref="fuelTable"
                @modifyRow="handleModify"
                @getSelection="getSelection"
                @deleteRow="handleDelete" />
    <div class="record-footer">
      <div class="r-f-left">
      </div>
      <div class="r-f-right">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 30, 40]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="total">
        </el-pagination>
      </div>
    </div>
    <fuel-add-dialog ref="addDialog"
                     @refreshList="refreshList" />
    <fuel-modify-dialog ref="ModifyDialog"
                        @refreshList="refreshList"
                        :rowData="rowData" />
  </div>
</template>
<script>
import FuelTable from './doc-type-table.vue'
import FuelAddDialog from './doc-type-add-dialog.vue'
import FuelModifyDialog from './doc-type-modify-dialog.vue'

import { fetchConfigList, deleteConfigItem } from '@/api/knowledge'
import { Message } from 'element-ui'

export default {
  components: {
    FuelTable,
    FuelAddDialog,
    FuelModifyDialog
  },
  props: {
    industryId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      rowData: {},
      tableData: [],
      keyword: '',
      type: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  mounted () {
    this.initTable()
  },
  methods: {
    deleteAll () {
      this.$refs.fuelTable.getAll();
    },
    getSelection (val) {
      if (val.length) {
        this.$confirm('确认删除燃料类型?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          let industryId = '';
          val.forEach(item => {
            industryId = item.industryId
            ids.push(item.id);
          });
          this.handleDelete({ id: ids.join(','), industryId: industryId });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '请先勾选选要删除的'
        })
      }
    },
    handleModify (row) {
      this.rowData = row
      this.$refs.ModifyDialog.show()
    },
    handleDelete (row) {
      deleteConfigItem(row).then((res) => {
        if (res.code === 0) {
          Message({
            message: '删除成功',
            type: 'success',
            duration: 2 * 1000
          })
          this.initTable()
        }
      })
    },
    refreshList () {
      this.initTable()
    },
    initTable () {
      fetchConfigList({ name: '', page: this.currentPage, pageSize: this.pageSize }).then((res) => {
        if (res.code === 0 && res.data) {
          let data = res.data ? res.data : {}
          this.currentPage = data.page
          this.total = data.total
          this.tableData = data.record
        }
      })
    },
    showAddForm () {
      this.$refs.addDialog.show()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.initTable()
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.initTable()
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }

}
</script>

<style scoped lang="scss">
@import "~@/styles/mixin.scss";
.left-top-con {
  @include flex(center, center);
}
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
  display: block;
}
.left-tab-select {
  width: 140px;
  height: 32px;
  margin: 10px;
  ::v-deep .el-input__inner {
    border-radius: 3px;
    border: 1px solid #dadfe6;
    color: #141414;
    height: 32px;
    line-height: 32px;
    padding: 0 15px;
  }
  ::v-deep .el-icon-search {
    line-height: 32px;
  }
}
.first-left-tab {
  li {
    height: 42px;
    line-height: 42px;
    font-size: 14px;
    color: #141414;
    padding-left: 30px;
    cursor: pointer;
    position: relative;
    &.active {
      color: #1271e5;
    }
    &.active:before {
      content: "";
      position: absolute;
      height: 15px;
      border-left: 3px solid #127dff;
      left: 15px;
      top: 14px;
    }
  }
}
.first-panel-con {
  @include flex(flex-start, flex-start);
  .first-left {
    width: 250px;
    flex: none;
  }
  .first-right {
    width: calc(100% - 160px);
  }
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
.record-header {
  height: 62px;
  padding: 0 20px;
  @include flex(space-between, center);
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
    padding-left: 0 !important;
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
