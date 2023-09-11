<template>
    <div class="record-container">
        <div class="white-bg">
            <div class="record-header">
                <div class="btns-con">
                    <span class="new-btn" @click="showAddForm">新建</span>
                    <!-- <span class="new-btn export-btn">导出</span> -->
                </div>
                <div class="r-header-right" v-if="false">
                    <el-select v-model="type" class="key-select" placeholder="请选择">
                        <el-option v-for="item in propertiesOption" :key="item.value" :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-input ref="username" class="key-input" v-model="keyword" placeholder="角色名 / 权限名"
                        suffix-icon="el-icon-search" type="text" />
                    <span class="refresh-btn">
                    </span>
                </div>
            </div>
            <record-table :tableData="tableData" @deleteRow="handleDelete" @modifyRow="handleModify" />
            <div class="record-footer">
                <div class="r-f-left">
                    <!-- <span class="m-txt">勾选激活</span>
        <span class="m-btn">删除</span> -->
                </div>
                <div class="r-f-right">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                        :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
            <add-dialog ref="addDialog" :nodeOptions="nodeOptions" @refreshList="refreshList" />
            <role-modify-dialog ref="ModifyDialog" :nodeOptions="nodeOptions" @refreshList="refreshList"
                :rowData="rowData" />
        </div>
    </div>
</template>

<script>
import AddDialog from './jur-add-dialog.vue'
import RoleModifyDialog from './jur-modify-dialog'
import RecordTable from './juri-table.vue'
import { nodeList, deleteNode } from '@/api/user'
import { Message } from 'element-ui'

export default {
    components: {
        RecordTable,
        AddDialog,
        RoleModifyDialog
    },
    data () {
        return {
            rowData: {},
            nodeOptions: [],
            keyword: '',
            propertiesOption: [],
            type: "",
            currentPage: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
        }
    },
    mounted () {
        this.initTable();
    },
    methods: {
        handleDelete (row) {
            deleteNode(row).then((res) => {
                if (res.code === "00000") {
                    Message({
                        message: '删除成功',
                        type: 'success',
                        duration: 2 * 1000
                    })
                    this.initTable()
                }
            })
        },
        handleModify (row) {
            this.rowData = row
            this.$refs.ModifyDialog.show()
        },
        refreshList () {
            this.initTable();
        },
        initTable () {
            nodeList({ page: this.currentPage, pageSize: this.pageSize }).then((res) => {
                if (res.code === "00000" && res.data) {
                    let data = res.data || {}
                    this.currentPage = data.page
                    this.total = data.total
                    this.tableData = res.data.record
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

.btns-con {
    @include flex(flex-start, center);
}

.btns-con .export-btn {
    margin-left: 10px;
    border: 1px solid #b6babe;
    background-color: #fff !important;
    color: #141414 !important;
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

.refresh-btn {
    flex: none;
    width: 32px;
    margin-left: 10px;
    height: 32px;
    background: url(../../../assets/images/home/refresh-icon.png) no-repeat center center;
    background-size: 100% 100%;
    cursor: pointer;
}

.record-header {
    height: 62px;
    padding: 0 20px;
    @include flex(space-between, center);

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
    }

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
        padding-left: 20px;
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
