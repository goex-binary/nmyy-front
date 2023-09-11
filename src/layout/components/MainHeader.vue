<template>
  <div class="main-header-inner">
    <div class="logo-con">
      <router-link to="/">
        <div class="main-m-title">艺术学院综合管控平台</div>
      </router-link>
    </div>

    <!-- <div class="broadcose">
      <img src="../../assets/images/home/broadcost.png"
           alt="broadcose">
      <span class="broad-txt">基本数据录入未完成，请尽快完成数据录入！</span>
      <router-link to="/layout/crew-manage/crew-index"
                   class="key-in-btn"></router-link>
    </div> -->
    <!-- <div class="uer-info-con">
      <img src="../../assets/images/home/user-icon.png"
           alt="user-icon">
      <span class="user-name">{{ companyData[0] }}</span>
      <el-divider direction="vertical"
                  class="divider-line"></el-divider>
    </div> -->
    <!-- <el-dropdown trigger="click"
                 class="config-dropdown">
      <span class="el-dropdown-link">
        <img src="../../assets/images/home/conf-icon.png"
             alt="broadcose">
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item icon="el-icon-user">
          <span @click="handleLoginout">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
  </div>
</template>

<script>
import Cookies from "js-cookie";
import store from "@/store";

export default {
  name: "MainHeader",
  data() {
    return {
      companyData: store.state.user.companyData || [],
      // companyData: {
      //   email: '1234@163.com'
      // }
    };
  },
  methods: {
    handleMdify() {
      this.$router.push("/modify-password");
    },
    handleLoginout() {
      this.$confirm("确认退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          Cookies.remove("Admin-Token");
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.logo-con {
  position: absolute;
  height: 100%;
  left: 0;
  display: flex;
  align-items: center;
  padding-left: 20px;

  .main-m-title {
    padding-left: 80px;
    font-size: 30px;
    font-family: PangMenZhengDao;
    color: #ffffff;
    text-shadow: 0px 6px 16px rgba(0, 0, 0, 0.5);
    background: linear-gradient(180deg, #ffffff 0%, #00e2ff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
.divider-line {
  margin-left: 20px;
  background-color: #3f4d5c;
}
.uer-info-con {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  right: 90px;
  img {
    vertical-align: middle;
    margin-right: 10px;
  }
  .user-name {
    color: #ffffff;
    font-size: 14px;
  }
}
.main-header-inner {
  position: relative;
  height: 100%;
  background-image: url(../../assets/images/home/main-header-bg.png);
  background-position: left top;
  background-repeat: no-repeat;
}
.broadcose {
  position: absolute;
  width: 575px;
  height: 36px;
  line-height: 36px;
  border-radius: 18px;
  background: rgba(0, 0, 0, 0.5);
  padding: 0 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  img {
    vertical-align: middle;
    margin-right: 10px;
  }
}
.broad-txt {
  color: #14b7ff;
}
.key-in-btn {
  position: absolute;
  width: 70px;
  height: 24px;
  background: url(../../assets/images/btn.png) no-repeat center center;
  background-size: 100% 100%;
  right: 18px;
  top: 6px;
}
.config-dropdown {
  position: absolute;
  right: 50px;
  top: 17px;
}
</style>
