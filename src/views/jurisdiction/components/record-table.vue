<template>
    <div class="record-table-con">
        <i-table :tableData="tableData">
            <el-table-column v-if="false" type="selection" width="44">
            </el-table-column>
            <el-table-column label="序号" align="center" width="76">
                <template v-slot="scoped">
                    {{ scoped.$index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="roleName" :show-overflow-tooltip="true" min-width="12%" label="角色名">
            </el-table-column>
            <el-table-column prop="roleCode" :show-overflow-tooltip="true" min-width="12%" label="角色编码">
            </el-table-column>
            <el-table-column prop="txtName" min-width="35%" label="权限">
                <template v-slot="scoped">
                    <div class="tag-con" v-if="scoped.row.permissions && !scoped.row.more">
                        <span class="jur-tag" v-for="(item, index) in scoped.row.permissions.slice(0, 3)"
                            :key="index">{{ item.permName }}</span>
                        <span class="more-btns" @click="handleMore(scoped.row)">更多<i
                                class="el-icon-arrow-down"></i></span>
                    </div>
                    <div class="tag-con" v-else-if="scoped.row.permissions && scoped.row.more">
                        <span class="jur-tag" v-for="(item, index) in scoped.row.permissions" :key="index">{{
                            item.permName
                        }}</span>
                        <span class="more-btns" @click="scoped.row.more = false">收起<i
                                class="el-icon-arrow-up"></i></span>
                    </div>
                    <span v-else>-</span>
                </template>
            </el-table-column>
            <el-table-column label="状态" min-width="9%">
                <template v-slot="scoped">
                    <span :class="'origin-icon origin-icon-' + scoped.row.status">{{
                        scoped.row.status === 2 ? '禁用' : '正常'
                    }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="updatedAt" min-width="19%" label="更新时间">
            </el-table-column>
            <el-table-column min-width="22%" align="right">
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
        }
    },
    data () {
        return {

        }
    },
    methods: {
        handleMore (row) {
            this.$set(row, 'more', true);
        },
        handleModify (row) {
            this.$emit('modifyRow', row)
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
    },

}
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";

.more-btns {
    color: #1271e5;
    margin-left: 10px;
    cursor: pointer;
}

.tag-con {
    padding: 10px 0;
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
    background-color: #f4ad30;
}

.origin-icon-2:before {
    background-color: #dadfe5 !important;
}

.jur-tag {
    display: inline-block;
    vertical-align: middle;
    padding: 0 6px;
    height: 22px;
    line-height: 22px;
    border-radius: 3px;
    border: 1px solid #1cbf87;
    background-color: #d2f1e7;
    color: #1dbf86;
    box-sizing: content-box;
    margin-right: 4px;
}
</style>
