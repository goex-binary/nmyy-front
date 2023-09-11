<template>
  <el-dialog title="添加"
             width="670px"
             class="add-dialog"
             top="20vh"
             @close="handleClose"
             @open="handleOpen"
             :visible.sync="dialogFormVisible">
    <el-form :model="ruleForm"
             ref="addForm1"
             :rules="loginRules">

      <div class="a-form-item">
        <label for="">名称：</label>
        <el-form-item prop="name">
          <el-input class="filename-input"
                    v-model="ruleForm.name"
                    placeholder="请输入"
                    autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="a-form-item">
        <label for="">描述：</label>
        <el-form-item prop="description">
          <el-input class="filename-input"
                    v-model="ruleForm.description"
                    placeholder="请输入"
                    autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="a-form-item">
        <label for="">状态：</label>
        <el-form-item prop="value">
          <el-radio-group v-model="ruleForm.value"
                          size="small">
            <el-radio :label="1"
                      border>开启</el-radio>
            <el-radio :label="0"
                      border>关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button type="primary"
                 :loading="loading"
                 @click="confirm">确 定</el-button>
      <el-button @click="dialogFormVisible = false">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { addConfigItem } from '@/api/knowledge'
import { Message } from 'element-ui'

export default {
  name: 'FuelAddDialog',
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
      loginRules: {
        name: [{ required: true, validator: validateRequired }],
        description: [{ required: true, validator: validateRequired }],
        parentId: [{ required: true, validator: validateRequired }],
        value: [{ required: true, validator: validateRequired }]
      },
      dialogFormVisible: false,
      formLabelWidth: '120px',
      ruleForm: {
        value: 1
      },
      options: [],
    }
  },
  methods: {
    handleClose () {
      this.ruleForm = {}
      this.$refs.addForm1.clearValidate()
    },
    handleOpen () {
      this.$nextTick(() => {
        this.$refs.addForm1.clearValidate()
        this.loading = false
      })
    },
    confirm () {
      this.$refs.addForm1.validate(valid => {
        if (valid) {
          this.loading = true
          let params = _.cloneDeep(this.ruleForm)
          addConfigItem(params).then((res) => {
            // 添加成功 更新列表
            this.$emit('refreshList')
            Message({
              message: '添加成功',
              type: 'success',
              duration: 2 * 1000
            })
            this.dialogFormVisible = false
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
.company-name {
  font-size: 14px;
  color: #141414;
}
.b-form-right {
  ::v-deep .el-upload-list {
    display: none;
  }
  border-radius: 3px;
  border: 1px solid #dcdfe6;
  height: 32px;
  overflow: hidden;

  ::v-deep .el-input__inner {
    border: 0 !important;
  }
  width: 480px;
  @include flex(flex-start, center);
  .upload-btn {
    width: 70px;
    display: block;
    background-color: #f6f7fa;
    border-left: 1px solid #dcdfe6;
  }
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
    width: 260px;
    flex: none;
  }
  margin-bottom: 20px;
  @include flex(flex-start, flex-start);
  height: 32px;
  line-height: 32px;
  label {
    width: 237px;
    flex: none;
    text-align: right;
    font-size: 14px;
    color: #141414;
  }
  ::v-deep .el-select {
    width: 260px;
  }
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
