<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        router
      >
        <template v-for="(item, index) in sideBarData">
          <menu-item :key="index" :parentIndex="index" :itemData="item"></menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import MenuItem from "./MenuItem";
import sideBarData from "@/dataHandle/sidebar";
import variables from "@/styles/variables.scss";
import { mapGetters } from "vuex";
// import { fetSideBar } from '@/api/companyMsg'

export default {
  name: "LeftMenu",
  components: {
    MenuItem,
  },
  data() {
    return {
      sideBarData: [],
    };
  },
  created() {
    this.sideBarData = [
      {
        flag: "0",
        icon: "1",
        id: 1,
        label: "设备管理",
        name: "设备管理",
        parentId: 0,
        path: "/layout/device-manager",
      },
      {
        flag: "0",
        icon: "1",
        id: 2,
        label: "联动预案管理",
        name: "联动预案管理",
        parentId: 0,
        path: "/layout/plan-manager",
      },
      {
        flag: "0",
        icon: "1",
        id: 2,
        label: "角色管理",
        name: "角色管理",
        path: "/base/role-management",
        slug: "default",
      },
      {
        flag: "0",
        icon: "1",
        id: 2,
        label: "权限管理",
        name: "权限管理",
        path: "/base/jur-management",
        slug: "default",
      },
      {
        flag: "0",
        icon: "1",
        id: 2,
        label: "管理员管理",
        name: "管理员管理",
        path: "/base/user-management",
        slug: "default",
      },
    ];

    // fetSideBar().then(res => {
    //   if (res.code === 0 && res.data && res.data.map) {
    //     this.sideBarData = res.data.map.authpath
    //   }
    // });
  },
  computed: {
    ...mapGetters(["sidebar"]),
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
  watch: {
    isCollapse(val) {
      this.$emit("menuToggleClose", val);
    },
  },
  methods: {},
};
</script>

<style lang="scss">
#app .sidebar-container .el-menu-item.is-active {
  background: #0b465f !important;
  color: #ffffff !important;
}
.el-menu-item:focus,
.el-menu-item:hover {
  outline: 0;
  background-color: #0b465f !important;
}
#app .hideSidebar .el-submenu > .el-submenu__title {
  padding: 0 12px !important;
}
.el-submenu__title {
  padding: 0 12px !important;
}
.el-menu-item .el-tooltip {
  padding: 0px 14px !important;
}
// .el-submenu.is-opened .el-submenu__title {
//   background-color: #1e3b4d !important ;
// }
// #app .sidebar-container .nest-menu .el-submenu > .el-submenu__title,
// #app .sidebar-container .el-submenu .el-menu-item {
//   background-color: #0e1e26 !important;
// }
.el-menu-item,
.el-submenu__title {
  height: 70px;
  line-height: 70px;
  padding-left: 12px !important;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
.el-submenu__icon-arrow {
  width: 15px;
  height: 8px;
  background: url(../../assets/images/home/down-arrow-default.png) no-repeat
    center center;
  background-size: 100% 100%;
  margin-top: -3px;
  &::before {
    display: none;
  }
}
.el-submenu__title:hover .el-submenu__icon-arrow {
  background: url(../../assets/images/home/down-hover.png) no-repeat center
    center;
  background-size: 100% 100%;
}
</style>
