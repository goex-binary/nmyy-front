<template>
  <el-dialog title="修改"
             width="670px"
             class="add-dialog"
             top="20vh"
             @open="handleOpen"
             :visible.sync="dialogFormVisible">
    <el-form :model="ruleForm"
             ref="addForm1"
             :rules="loginRules">
      <div class="a-form-item">
        <label for="">标识：</label>
        <el-form-item prop="name">
          <el-input class="filename-input"
                    v-model="ruleForm.name"
                    placeholder="请输入"
                    autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="a-form-item">
        <label for="sort">值域：</label>
        <el-form-item prop="val">
          <el-input class="filename-input"
                    v-model="ruleForm.val"
                    placeholder="请输入"
                    autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="a-form-item" style="height: auto">
        <label for="sort">描述：</label>
        <el-form-item prop="description" style="margin-bottom: 0">
          <el-input class="filename-input"
                    style="width: 260px"
                    v-model="ruleForm.description"
                    placeholder="请输入"
                    type="textarea"
                    :rows="4"
                    autocomplete="off"></el-input>
        </el-form-item>
      </div>
      <div class="a-form-item">
        <label for="">类型：</label>
        <el-form-item prop="type">
          <el-select v-model="ruleForm.type"
                     placeholder="请选择">
            <el-option v-for="item in typeList"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
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
import {
  modifyCfg
 } from '@/api/hjy'

import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import uploadApi from '@/config'

export default {
  name: 'FuelModifyDialog',
  props: {
    rowData: {
      type: Object,
      default: () => ({})
    },
    industryId: {
      type: Number,
      default: 0
    },
    typeList: {
      type: Array,
      default: () => []
    },
  },
  data () {
    const validateRequired = (rule, value, callback) => {
      if (value !== 0 && !value) {
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    }
    const validateState = (rule, value, callback) => {
      if (value !== 0 && !value) {
        callback(new Error('请输入内容'))
      } else {
        callback()
      }
    }
    return {
      actionApi: uploadApi,
      importHeaders: { Authorization: `Bearer ${getToken()}` },
      loadProgress: 0, // 动态显示进度条
      progressFlag: false, // 关闭进度条
      loadProgress1: 0, // 动态显示进度条
      progressFlag1: false, // 关闭进度条
      loading: false,
      documetName: '',
      documetName1: '',
      loginRules: {
        name: [{ required: true, validator: validateRequired }],
        val: [{ required: true, validator: validateRequired }],
        sort: [{ required: true, validator: validateRequired }],
        type: [{ required: true, validator: validateRequired }],
        author: [{ required: true, validator: validateRequired }],
        content: [{ required: true, validator: validateRequired }],
        title: [{ required: true, validator: validateRequired }],
        description: [{ required: true, validator: validateRequired }],
        category: [{ required: true, validator: validateRequired }],
        docAuth: [{ required: true, validator: validateRequired }]
      },
      options: [],
      fileList: [],
      dialogFormVisible: false,
      formLabelWidth: '120px',
      ruleForm: {
      }
    }
  },
  created () {
    // 初始化跳转链接
    // doc().then(res => {
    //   if (res.code === 0 && res.data) {
    //     this.options = res.data || []
    //   }
    // });
  },
  methods: {
    //  文件上传成功
    uploadVideoProcess (event, file, fileList) {
      this.progressFlag = true; // 显示进度条
      this.loadProgress = parseInt(event.percent); // 动态获取文件上传进度
      if (this.loadProgress >= 100) {
        this.loadProgress = 100
        setTimeout(() => { this.progressFlag = false }, 1000) // 一秒后关闭进度条
      }
    },
    uploadVideoProcess1 (event, file, fileList) {
      this.progressFlag1 = true; // 显示进度条
      this.loadProgress1 = parseInt(event.percent); // 动态获取文件上传进度
      if (this.loadProgress1 >= 100) {
        this.loadProgress1 = 100
        setTimeout(() => { this.progressFlag1 = false }, 1000) // 一秒后关闭进度条
      }
    },
    //  文件上传成功
    handleSucc (response) {
      if (response.code === 0 && response.data) {
        this.ruleForm.attached = response.data
      }
    },
    handleSucc1 (response) {
      if (response.code === 0 && response.data) {
        this.ruleForm.thumb = response.data
      }
    },
    handleChange (file, fileList) {
      this.documetName = file.name
      console.log(file, fileList);
    },
    handleChange1 (file, fileList) {
      this.documetName1 = file.name
      console.log(file, fileList);
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleOpen () {
      this.ruleForm = _.cloneDeep(this.rowData)
      this.loadProgress = 0 // 动态显示进度条
      this.progressFlag = false // 关闭进度条
      this.documetName = ''
      this.loadProgress1 = 0 // 动态显示进度条
      this.progressFlag1 = false // 关闭进度条
      this.documetName1 = ''
      this.loading = false
    },
    confirm () {
      this.$refs.addForm1.validate(valid => {
        if (valid) {
          let params = _.cloneDeep(this.ruleForm)
          params.path = params.thumb ? params.thumb : params.path
          modifyCfg(params).then((res) => {
            // 添加成功 更新列表
            this.$emit('refreshList')
            Message({
              message: '修改成功',
              type: 'success',
              duration: 2 * 1000
            })
            this.dialogFormVisible = false
          }, () => {
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
::v-deep.add-dialog {
  .el-dialog, .el-pager li {
    background: #0a1c27;
  }
  .el-dialog__header {
    border-bottom: 1px solid #0a2532!important;
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
  height: 32px;
  overflow: hidden;

  ::v-deep .el-input__inner {
    border: 0 !important;
  }
  width: 260px;
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
  height: 32px;
  line-height: 32px;
  label {
    width: 237px;
    flex: none;
    text-align: right;
    font-size: 14px;
    color: #ffffff;
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
      color: #00c5ff;
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
