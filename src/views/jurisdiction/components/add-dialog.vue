<template>
    <el-dialog title="新建" width="670px" class="add-dialog" top="15vh" @close="handleClose" @open="handleOpen"
        :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="addForm1" :rules="formRules">
            <div class="a-form-item">
                <label for="">角色名：</label>
                <el-form-item prop="roleName">
                    <el-input class="rolename-input" v-model="form.roleName" placeholder="请输入"
                        autocomplete="off"></el-input>
                </el-form-item>
            </div>
            <div class="a-form-item">
                <label for="">状态：</label>
                <el-form-item prop="status">
                    <el-radio-group v-model="form.status" size="small">
                        <el-radio :label="1" border>正常</el-radio>
                        <el-radio :label="2" border>禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <div class="a-form-item">
                <label for="">角色编码：</label>
                <el-form-item prop="roleCode">
                    <el-input class="filename-input" v-model="form.roleCode" placeholder="请输入"
                        autocomplete="off"></el-input>
                </el-form-item>
            </div>
            <div class="b-form-item">
                <label for="">权限：</label>
                <div class="b-form-right">
                    <div class="b-left">
                        <el-checkbox-group v-model="jurValue">
                            <el-checkbox v-for="item in nodeOptions" :key="item.permId" :label="item.permId">{{
                                item.permName
                            }}</el-checkbox>
                        </el-checkbox-group>
                    </div>
                    <img class="logo" src="../../../assets/images/home/change-icon.png">
                    <div class="b-right">
                        <div class="selecte-item" v-for="item in selectedJur" :key="item.permId">
                            <el-tooltip class="item" effect="dark" :content="item.permName" placement="top-start">
                                <span class="name-nowarp">{{ item.permName }}</span>
                            </el-tooltip>
                            <i @click="removeSelected(item.permId)" class="el-icon el-icon-close"></i>
                        </div>
                    </div>
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
import { addRole } from '@/api/user'
import { Message } from 'element-ui'

export default {
    name: 'AddDialog',
    props: {
        nodeOptions: {
            type: Array,
            default: () => []
        }
    },
    data () {
        const validateRequired = (rule, value, callback) => {
            if (value !== 0 && !value) {
                callback(new Error('请输入内容'))
            } else {
                callback()
            }
        }
        return {
            loading: false,
            formRules: {
                roleName: [{ required: true, validator: validateRequired }],
                roleCode: [{ required: true, validator: validateRequired }],
                calc: [{ required: true, validator: validateRequired }],
                status: [{ required: true, validator: validateRequired }]
            },
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {},
            jurValue: []
        }
    },
    computed: {
        selectedJur () {
            return this.nodeOptions.filter(item => {
                return this.jurValue.indexOf(item.permId) !== -1
            })
        }
    },
    methods: {
        handleClose () {
            this.form = {}
            this.jurValue = []
            this.$refs.addForm1.clearValidate()
        },
        handleOpen () {
            this.$nextTick(() => {
                this.loading = false
                this.$refs.addForm1.clearValidate()
            })
        },
        removeSelected (key) {
            this.jurValue = this.jurValue.filter(item => {
                return item !== key
            })
        },
        confirm () {
            this.$refs.addForm1.validate(valid => {
                if (valid) {
                    if (!this.jurValue.length) {
                        Message({
                            message: '请设置权限',
                            type: 'info',
                            duration: 2 * 1000
                        })
                        return
                    }
                    let params = _.cloneDeep(this.form)
                    params.permissions = this.selectedJur
                    params.roleType = 0
                    this.loading = true
                    addRole(params).then((res) => {
                        // 添加成功 更新列表
                        this.$emit('refreshList')
                        Message({
                            message: '添加成功',
                            type: 'success',
                            duration: 2 * 1000
                        })
                        this.dialogFormVisible = false
                        this.loading = false
                    }, err => {
                        this.loading = false
                    })
                } else {
                    return false
                }
            })
        },
        show () {
            this.dialogFormVisible = true
        }
    }
}
</script>
<style scoped lang="scss">
@import "~@/styles/mixin.scss";

.name-nowarp {
    @include ellipsis();
}

.b-form-right {
    height: 340px;
    @include flex(space-between, center);

    .b-right {
        padding: 10px 6px;

        .selecte-item {
            height: 30px;
            line-height: 30px;
            background-color: #e7f2ff;
            font-size: 14px;
            color: #141414;
            border-radius: 2px;
            margin-bottom: 6px;
            padding: 0 8px;
            @include flex(space-between, center);

            i {
                color: #b7bbc2;
                cursor: pointer;
                font-weight: 700;

                &:hover {
                    color: #141414;
                }
            }
        }
    }

    .b-left {
        padding: 10px;
        text-align: left;

        ::v-deep label {
            text-align: left;
            width: 100%;
            margin-right: 0;
        }

        ::v-deep .el-checkbox__label {
            font-size: 14px;
            color: #141414;
        }

        ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
        ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #167dff;
            border-color: #167dff;
        }
    }

    .b-left,
    .b-right {
        width: 200px;
        height: 340px;
        border: 1px solid #dbe0e6;
        border-radius: 4px;
        flex: none;
        overflow-y: auto;
    }
}

.rolename-input {
    width: 260px;
}

.company-name {
    font-size: 14px;
    color: #141414;
}

.b-form-right {
    width: 480px;
}

.a-form-item {
    height: 32px;
}

.a-form-item,
.b-form-item {
    ::v-deep .el-radio {
        color: #141414;
        font-weight: 400;
        font-size: 14px;
        margin-right: 0;
        width: 70px;
        padding: 0;
        text-align: center;
        line-height: 32px;
        border-color: #b5b9bf;

        .el-radio__input {
            display: none;
        }

        .el-radio__label {
            padding-left: 0;
        }
    }

    ::v-deep .el-radio.is-bordered.is-checked {
        border-color: #157dfe;
        background-color: #e7f2ff;

        .el-radio__label {
            color: #1271e5;
        }
    }

    ::v-deep .el-input.filename-input {
        width: 480px;
        flex: none;
    }

    margin-bottom: 20px;
    @include flex(flex-start, flex-start);
    line-height: 32px;

    label {
        width: 116px;
        flex: none;
        text-align: right;
        font-size: 14px;
        color: #141414;
    }

    ::v-deep .el-select {
        width: 150px;
    }
}

.add-dialog {
    ::v-deep .el-dialog__footer {
        height: 62px;
        line-height: 32px;
        padding: 0;
        padding-bottom: 30px;
        padding-left: 136px;
        text-align: left;

        .el-button {
            height: 32px;
            line-height: 32px;
            width: 70px;
            padding: 0;
            font-size: 14px;
            color: #141414;
            border: 1px solid #b5b9bf;
        }

        .el-button.el-button--primary {
            color: #fff;
            border: 1px solid #1cbf86;
            background-color: #1cbf86;
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
        border: 1px solid #dcdfe6;
        color: #141414;
        height: 32px;
        line-height: 32px;
        padding: 0 10px;

        &::-webkit-input-placeholder {
            color: #c2c6cc;
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
            color: #141414;
        }

        .el-dialog__headerbtn {
            top: 13px;
        }

        .el-dialog__close {
            color: #c3c7cd;
            font-weight: 700;
        }
    }
}
</style>
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
  overflow: hidden;

  ::v-deep .el-input__inner {
    border: 0 !important;
  }
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
  //   width: 260px;
  // }
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
