<template>
  <div class="register-container">
    <div class="register-header">
      <a @click="toLogin"
         href=""
         class="login-btn">
        <img src="../../assets/images/home/user-login-icon.png"
             alt="icon">
        用户登录</a>
    </div>
    <p class="register-title">新用户注册</p>
    <div class="register-form-con"
         v-if="!isRegister">
      <el-form ref="registerForm"
               :model="registerForm"
               :rules="registerRules"
               class="register-form"
               auto-complete="on"
               label-position="left">
        <p class="item-title">账号信息</p>
        <div class="item-group">
          <div class="r-f-item">
            <label for="username">用户名：</label>
            <el-form-item prop="username">
              <el-input ref="username"
                        clearable
                        v-model="registerForm.username"
                        placeholder="请输入正确的邮箱"
                        name="username"
                        type="text"
                        tabindex="1"
                        auto-complete="on" />
            </el-form-item>
            <el-tooltip class="item"
                        effect="dark"
                        content="用户名为邮箱"
                        placement="bottom-start">
              <img src="../../assets/images/home/info.png"
                   alt="icon">
            </el-tooltip>
          </div>
          <div class="r-f-item">
            <label for="username">密码：</label>
            <el-form-item prop="password">
              <el-input :key="passwordType"
                        ref="password"
                        v-model="registerForm.password"
                        :type="passwordType"
                        placeholder="密码长度不少于8个字符"
                        name="password"
                        tabindex="2"
                        auto-complete="on" />
            </el-form-item>
            <el-tooltip class="item"
                        effect="dark"
                        content="密码长度不少于八个字符，且包括字母和数字组合"
                        placement="bottom-start">
              <img src="../../assets/images/home/info.png"
                   alt="icon">
            </el-tooltip>
          </div>
          <div class="strength-con"
               :class="strestrength">
            <div class="strength-item">
              <span class="s-bar"></span>
              <span>弱</span>
            </div>
            <div class="strength-item">
              <span class="s-bar"></span>
              <span>中</span>
            </div>
            <div class="strength-item">
              <span class="s-bar"></span>
              <span>强</span>
            </div>
          </div>
          <div class="r-f-item">
            <label for="username">确认密码：</label>
            <el-form-item prop="comfirmPassword">
              <el-input :key="passwordType"
                        ref="comfirmPassword"
                        v-model="registerForm.comfirmPassword"
                        :type="passwordType"
                        placeholder="请再次确认密码进行验证"
                        name="comfirmPassword"
                        tabindex="2"
                        auto-complete="on" />
            </el-form-item>
          </div>
        </div>
        <div class="r-f-footer">
          <div class="forget-con">
            <el-checkbox v-model="remember">我已阅读并同意</el-checkbox>
            <router-link to="forget">《账号注册协议》</router-link>
          </div>
          <el-button :loading="loading"
                     type="primary"
                     class="submit-btn"
                     @click.native.prevent="handleregister">注册</el-button>
        </div>
      </el-form>
    </div>
    <div v-else
         class="succ-con">
      <div class="succe-tip">
        <img src="../../assets/images/home/ico_succeed.png"
             alt="icon">
        您已顺利完成账户注册，是否直接进入企业认证
      </div>
      <div class="succ-btns-con">
        <router-link class="aut-btn"
                     to="authentication">企业认证</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { Message } from 'element-ui'
import store from '@/store'
import Cookies from 'js-cookie'

export default {
  name: 'register',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (this.strestrength === '' || this.strestrength === 'strength1') {
        callback(new Error('密码强度太低'))
      } else {
        callback()
      }
    }
    const validateComfirmPassword = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次密码输入不一致'))
      } else {
        callback()
      }
    }

    return {
      isRegister: false,
      registerForm: {},
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        comfirmPassword: [{ required: true, trigger: 'blur', validator: validateComfirmPassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      remember: false
    }
  },
  computed: {
    strestrength () {
      let pwd = this.registerForm.password ? _.trim(this.registerForm.password) : ''
      let className = ''
      if (!pwd || pwd.length < 8) {
        return ''
      }
      let patrn = /^[0-9]*$/
      let patrn1 = /^[a-z0-9]*(([a-z][a-z0-9]*\d)|(\d[a-z0-9]*[a-z]))[a-z0-9]*$/g
      let patrn2 = /^[A-Z0-9]*(([A-Z][A-Z0-9]*\d)|(\d[A-Z0-9]*[A-Z]))[A-Z0-9]*$/g
      let patrn3 = /^[a-z0-9]*(([a-z][a-z0-9]*\d)|(\d[a-z0-9]*[a-z]))[a-z0-9]*$/ig
      if (pwd.length >= 8 && patrn.test(pwd)) {
        // 8位数以上纯数字
        className = 'strength1'
      } else if (patrn1.test(pwd) || patrn2.test(pwd)) {
        // 8位数字和大写或者小写字母
        className = 'strength2'
      } else if (patrn3.test(pwd)) {
        // 8位数字和大写和者小写字母
        className = 'strength3'
      }
      return className
    }
  },
  watch: {
  },
  methods: {
    toLogin () {
      Cookies.remove('Admin-Token'),
        this.$router.replace('/login')
    },
    handleregister () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          // 登录成功， 记住密码， 记得调整位置
          if (!this.remember) {
            Message({
              message: '请仔细阅读并同意《账号注册协议》',
              type: 'error',
              duration: 2 * 1000
            })
            return
          }
          this.loading = true
          this.$store.dispatch('user/register', this.registerForm).then(async () => {
            await store.dispatch('user/registerStatus')
            this.loading = false
            this.isRegister = true
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style>
html,
body {
  background: #fff;
}
</style>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.succ-con {
  @include flex(center, center);
  flex-direction: column;
  padding-top: 15vh;

  .succ-btns-con a {
    display: inline-block;
    text-align: center;
    background: #fff;
    border: 1px solid #dadfe5;
    cursor: pointer;
    color: #141414;
    padding: 0;
    font-size: 14px;
    border-radius: 3px;
    width: 155px;
    height: 42px;
    line-height: 42px;
    &.aut-btn {
      margin-right: 20px;
      background: #1cbf86;
      border: 1px solid #1cbf86;
      color: #ffffff;
    }
  }
}
.succe-tip {
  margin-bottom: 70px;
  img {
    vertical-align: middle;
    margin-right: 20px;
  }
}
.register-container {
  padding-bottom: 20px;
}
.r-f-footer ::v-deep .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #141414;
  font-size: 14px;
}
.r-f-footer a {
  color: #1271e5;
  font-size: 14px;
}
.r-f-footer ::v-deep .el-checkbox__inner {
  border-radius: 0;
  border: 1px solid #d9dee5;
}
.r-f-footer ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
.r-f-footer ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #157dfe;
  border-color: #157dfe;
}
.strength1 {
  .strength-item:nth-child(1) .s-bar {
    background-color: #2dcb95;
  }
}
.strength2 {
  .strength-item:nth-child(1) .s-bar,
  .strength-item:nth-child(2) .s-bar {
    background-color: #2dcb95;
  }
}
.strength3 {
  .strength-item:nth-child(1) .s-bar,
  .strength-item:nth-child(2) .s-bar,
  .strength-item:nth-child(3) .s-bar {
    background-color: #2dcb95;
  }
}
.strength-con {
  margin-top: 22px;
  width: 260px;
  margin-left: 78px;
  margin-bottom: 26px;
  @include flex(space-between, center);
  padding: 0 8px;
  .strength-item {
    font-size: 12px;
    color: #c2c6cc;
    width: 30%;
    text-align: center;
    & + .strength-item {
      margin-left: 8px;
    }
  }
  .s-bar {
    display: block;
    width: 100%;
    height: 8px;
    background-color: #eaecef;
    margin-bottom: 6px;
  }
}
.margin-top-30 {
  margin-top: 30px;
}
.forget-con {
  text-align: center;
  margin: 50px 0 20px 0;
}
.submit-btn {
  width: 100%;
  height: 42px;
  line-height: 42px;
  padding: 0;
  color: #ffffff;
  background-color: #1ebe86;
  border-radius: 3px;
  border: 0;
  outline: 0;
}
.r-f-footer {
  width: 316px;
  margin: 0 auto;
}
.el-form-item ::v-deep .el-input__inner {
  border-radius: 3px;
  border: 1px solid #dcdfe6;
  color: #141414;
  height: 30px;
  line-height: 30px;
  outline: 0;
  padding: 0 15px;
  &::-webkit-input-placeholder {
    color: #c2c6cc;
  }
}
.el-form-item ::v-deep .el-form-item__error {
  color: #e51717;
  font-size: 12px;
}
.el-form-item {
  margin-bottom: 0;
  width: 260px;
  flex: none;
}
.item-group {
  width: 370px;
  margin: 0 auto;
}
.r-f-item {
  margin-bottom: 18px;
  @include flex(flex-start, center);
  img {
    vertical-align: middle;
    margin-left: 12px;
  }
  label {
    width: 78px;
    text-align: right;
    font-size: 14px;
    color: #141414;
    flex: none;
  }
}
.item-title {
  padding: 10px 12px;
  margin: 20px 0;
  font-size: 16px;
  color: #141414;
  border-bottom: 1px solid #dce1e8;
  position: relative;
  &::before {
    content: "";
    display: inline-block;
    width: 4px;
    height: 16px;
    vertical-align: middle;
    background-color: #157dfe;
    margin-right: 12px;
  }
}
.register-header {
  height: 91px;
  line-height: 91px;
  background: url(../../assets/images/home/main-header-bg.png) no-repeat left
    center;
  @include flex(flex-end, center);
  padding-right: 60px;
  img {
    vertical-align: middle;
    margin-right: 10px;
  }
  .login-btn {
    font-size: 14px;
    color: #147dff;
  }
}
.register-title {
  height: 60px;
  line-height: 60px;
  font-size: 20px;
  color: #141414;
  background-color: #e8ecef;
  text-align: center;
  margin: 0;
  padding: 0;
}
.register-form-con {
  width: 1000px;
  margin: 0 auto;
}
</style>
