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
      <el-table-column prop="name"
                       :show-overflow-tooltip="true"
                       min-width="12%"
                       label="标识">
      </el-table-column>
      <!-- <el-table-column prop="path"
                       min-width="12%"
                       label="图片">
        <template v-slot="scoped">
          <span class="pic-con">
            <img :src="scoped.row.path"
                 @click="handlePictureCardPreview1(scoped.row.path)"
                 alt="">
          </span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="状态"
                       min-width="12%">
        <template v-slot="scoped">
          <span :class="'origin-icon origin-icon-' + scoped.row.state">{{ scoped.row.state == 0 ? '关闭' : '开启' }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="val"
        :show-overflow-tooltip="true"
        min-width="12%"
        label="值域">
      </el-table-column>
      <el-table-column prop="description"
                       :show-overflow-tooltip="true"
                       min-width="18%"
                       label="描述">
      </el-table-column>
      <el-table-column prop="description"
                       :show-overflow-tooltip="true"
                       min-width="18%"
                       label="类型">
        <template v-slot="scoped">
        {{
          typeList.filter(item => item.id == scoped.row.type)[0].name
        }}
        </template>
      </el-table-column>
      <el-table-column prop="createdAt"
                       min-width="19%"
                       label="创建时间">
      </el-table-column>
      <el-table-column min-width="18%"
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
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="dialogImageUrl"
           alt="">
    </el-dialog>
  </div>
</template>
<script>
import ITable from '@/components/ITable1.vue'
export default {
  name: 'RecordTable',
  components: {
    ITable
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    typeList: {
      type: Array,
      default: () => []
    },
  },
  data () {
    return {
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    handlePictureCardPreview1 (url) {
      this.dialogImageUrl = url
      this.dialogVisible = true
    },
    dowload (row) {

    },
    handleDetail (row) {
      this.$emit('toDetail', row)
    },
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
    font-size: 14px;
    color: #00c5ff;
    cursor: pointer;
  }
}
.left-padding {
  padding-right: 26px;
}
</style>
