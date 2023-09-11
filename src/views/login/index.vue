<template>
  <div class="login-container">
    <!-- <img class="logo"
         src="../../assets/images/logo.png"
         alt="logo"> -->
    <div class="login-form-con">
      <el-form ref="loginForm"
               :model="loginForm"
               :rules="loginRules"
               class="login-form"
               auto-complete="on"
               label-position="left">

        <el-form-item prop="username">
          <el-input ref="username"
                    v-model="loginForm.username"
                    placeholder="请输入账号"
                    name="username"
                    type="text"
                    tabindex="1"
                    auto-complete="on" />
        </el-form-item>

        <el-form-item prop="password"
                      :error="passwordErrorMsg">
          <el-input :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="请输入密码"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                    @keyup.enter.native="handleLogin" />
        </el-form-item>

        <el-button :loading="loading"
                   type="primary"
                   class="submit-btn"
                   @click.native.prevent="handleLogin">登录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'
export default {
  name: 'Login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!value || value.length < 2) {
        callback(new Error('请输入正确的账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value || value.length < 2) {
        callback(new Error('密码不正确'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {},
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordErrorMsg: null,
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      remember: false
    }
  },
  mounted () {
    // let cacheForm = Cookies.get('loginForm')
    // if (cacheForm) {
    //   this.remember = true
    //   this.loginForm = JSON.parse(cacheForm)
    // }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(async () => {
            Message({
              message: '登录成功',
              type: 'success',
              duration: 2 * 1000
            })

            // 重新登录后 重新请求用户权限，路由，菜单列表
            // await store.dispatch('user/registerStatus')
            // await store.dispatch('user/removeMenu')

            let timer = setTimeout(() => {
              clearTimeout(timer)
              timer = null
              this.$router.push({ path: this.redirect || '/' })
            }, 1000)
          }).catch((res) => {
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

<style lang="scss" scoped>
::v-deep.login-container .el-button .el-icon-loading {
  position: relative;
  top: -6px;
}
.el-button.is-loading:before {
  pointer-events: none;
  content: "";
  position: absolute;
  left: -1px;
  top: -1px;
  right: -1px;
  bottom: -1px;
  border-radius: inherit;
  background-color: transparent;
}
$bg: #0c181f;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-form-con {
  width: 474px;
  height: 474px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: url(../../assets/image/pc_login_bg.png) no-repeat center center;
  background-size: 100% 100%;
}
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: #0c181f;
  overflow: hidden;
  position: relative;

  .logo {
    position: absolute;
    left: 37px;
    top: 27px;
  }
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 360px;
    overflow: hidden;
    padding-top: 130px;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.login-container .el-form-item {
  height: 50px;
  line-height: 50px;
  // padding-left: 14px;
}
::v-deep.login-container .el-input input {
  background-color: #05121a !important;
  height: 50px;
  line-height: 50px;
  border-radius: 12px;
  border: 0;
  padding: 0 27px;
  color: #14b7ff;
  width: 360px;
  outline: none;
  border: 1px solid #044056;
  &:hover {
    border: 1px solid #14b7ff;
  }
  &::placeholder {
    color: #14b7ff;
    opacity: 0.5;
  }
}
::v-deep.el-form-item.is-error .el-input__inner {
  border-color: #044056;
}
::v-deep.el-form-item.is-error .el-input__inner:focus,
::v-deep.el-form-item.is-error .el-textarea__inner,
::v-deep.el-form-item.is-error .el-textarea__inner:focus,
::v-deep.el-message-box__input input.invalid,
::v-deep.el-message-box__input input.invalid:focus {
  border-color: #14b7ff;
}
.submit-btn {
  width: 160px;
  height: 50px;
  line-height: 50px;
  background: #007599;
  border: 0;
  outline: none;
  border-radius: 25px;
  ::v-deep span {
    position: relative;
    top: -10px;
  }
  display: block;
  margin: 0 auto;
}

::v-deep .el-checkbox__inner {
  border: 1px solid #0c181f;
  border-radius: 0;
  width: 14px;
  height: 14px;
  background-color: #0c181f;
  z-index: 1;
}
::v-deep .el-checkbox__input.is-focus .el-checkbox__inner {
  background-color: #0c181f;
  border-color: #0c181f;
  &::after {
    border-color: #14b7ff;
  }
}
::v-deep .el-checkbox:hover .el-checkbox__input .el-checkbox__inner {
  background-color: #0c181f;
  border-color: #14b7ff !important;
  &::after {
    border-color: #14b7ff;
  }
}
::v-deep .el-checkbox:active .el-checkbox__input .el-checkbox__inner {
  background-color: #123343;
  border-color: #14b7ff !important;
  &::after {
    border-color: #14b7ff;
  }
}
::v-deep .el-checkbox__input.is-checked .el-checkbox__inner,
::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #0c181f;
  border-color: #0c181f;
  &::after {
    border-color: #14b7ff;
  }
}
::v-deep .el-checkbox__input + .el-checkbox__label {
  color: #fff !important;
}
.forget-con {
  padding: 0 120px;
  display: flex;
  justify-content: space-between;
  ::v-deep a {
    color: #14b7ff;
  }
  margin-top: 32px;
}
.register-con {
  text-align: center;
  ::v-deep a {
    color: #14b7ff;
  }
  margin-top: 42px;
}
.el-form-item {
  margin-bottom: 30px;
}
.el-form-item ::v-deep input:-webkit-autofill {
  box-shadow: 0 0 0px 1000px #0c181f inset !important; //改成你想要的背景色
  -webkit-text-fill-color: #14b7ff !important;
}
</style>
