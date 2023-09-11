<template>
  <div style="background: #0a1c27;">
    <div class="record-header">
      <span class="new-btn"
            @click="showAddForm">新建</span>
      <div class="r-header-right"
           v-if="false">
        <el-select v-model="selectedYear"
                   class="year-select"
                   placeholder="请选择">
          <el-option v-for="item in enterpriseIdOptions"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
        <el-input ref="username"
                  class="key-input"
                  v-model="keyword"
                  placeholder="关键字 / 标题"
                  suffix-icon="el-icon-search"
                  type="text" />
      </div>
    </div>
    <fuel-table :tableData="tableData"
                :typeList="typeList"
                ref="fuelTable"
                @modifyRow="handleModify"
                @toDetail="toDetail"
                @getSelection="getSelection"
                @deleteRow="handleDelete" />
    <div class="record-footer">
      <div class="r-f-left">
        <!-- <span class="m-txt">勾选激活</span>
          <span class="m-btn"
                @click="deleteAll">删除</span> -->
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
                      :typeList="typeList"
                     :industryId="industryId"
                     @refreshList="refreshList"
                     :rowData="rowData" />
    <fuel-modify-dialog ref="ModifyDialog"
                        :typeList="typeList"
                        :industryId="industryId"
                        @refreshList="refreshList"
                        :rowData="rowData" />
    <detail-dialog ref="detailDialog"
                   @refreshList="refreshList"
                   :rowData="rowData" />
  </div>
</template>
<script>
import FuelTable from './record-table.vue'
import FuelAddDialog from './add-dialog.vue'
import FuelModifyDialog from './doc-modify-dialog.vue'
import DetailDialog from './detail-dialog.vue'

import {
  usersList,
  typeList,
  deleteUsers
 } from '@/api/hjy'


import { Message } from 'element-ui'

export default {
  components: {
    FuelTable,
    FuelAddDialog,
    FuelModifyDialog,
    DetailDialog
  },
  props: {
    industryId: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      typeList: [],
      enterpriseIdOptions: [],
      selectedYear: -1,
      activeIndex: -1,
      options: [],
      propertiesOption: [],
      rowData: {},
      tableData: [],
      keyword: '',
      type: '',
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  created () {
    this.initTable()
  },
  watch: {
    keyword (val) {
      this.debounce(this.initTable, 700)
    },
    industryId (val) {
      this.initTable()
    },
    selectedYear (val) {
      this.initTable()
    }
  },
  methods: {
    debounce (func, wait) {
      if (this.timeout) clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        func()
      }, wait)
    },
    switchId (id) {
      this.activeIndex = id
      this.initTable()
    },
    deleteAll () {
      this.$refs.fuelTable.getAll();
    },
    getSelection (val) {
      if (val.length) {
        this.$confirm('确认删除?', '提示', {
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
    toDetail (row) {
      this.rowData = row
      this.$refs.detailDialog.show()
    },
    handleModify (row) {
      this.rowData = row
      this.$refs.ModifyDialog.show()
    },
    handleDelete (row) {
      deleteUsers(row).then((res) => {
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
      usersList({ page: this.currentPage, pageSize: this.pageSize }).then((res) => {
        if (res.code === 0 && res.data) {
          let data = res.data ? res.data : {}
          this.currentPage = data.page
          this.total = data.total
          this.tableData = res.data.record || []
        }
      })
    },
    showAddForm () {
      this.$refs.addDialog.show()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.currentPage = 1
      this.initTable();
    },
    handleCurrentChange (val) {
      this.currentPage = val;
      this.initTable();
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }

}
</script>
<style>
.el-pager li {
    background-color: #0a2634;
    color: #fff;
    border-color: transparent;
}
.el-pager li.active {
    background-color: #00c5ff;
    color: #ffffff;
    border-color: #00c5ff;
}
.el-pagination__total, .el-pagination__jump .el-input__inner{
    background-color: #0a2634;
    color: #fff;
}
.el-pagination__editor.el-input .el-input__inner {
    height: 28px;
}
.el-pagination button:disabled {
    color: #fff!important;
    background-color: #0a2634!important;
    cursor: not-allowed;
}
.el-pagination button {
    color: #ffffff!important;
    background-color: #007599!important;
}
.el-pagination .el-select .el-input .el-input__inner {
    background: #0a2634;
    color: #fff;
}
</style>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";
.year-select {
  margin-right: 20px;
  width: 260px;
}
.first-left-tab {
  width: 200px;
  flex: none;
  border-right: 1px solid #e8ecef;
  overflow-y: auto;
  align-self: stretch;
}
.right-panel {
  width: calc(100% - 200px);
}
.panel-container {
  @include flex(flex-start, flex-start);
}
.left-top-con {
  @include flex(center, center);
}
.new-btn {
  width: 70px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #ffffff;
  background-color: #007599;
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
    border: 1px solid #093d51;
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
