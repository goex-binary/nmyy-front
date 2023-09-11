<template>
  <div>
    <el-menu-item :index="itemData.path"
                  v-if="(!itemData.children) && itemData.flag == 0">
      <img class="menu-icon"
           v-if="itemData.icon"
           :src="iconMap[itemData.icon]">
      <span slot="title">{{ itemData.label }}</span>
    </el-menu-item>
    <el-submenu :index="'index' + parentIndex"
                v-else-if="itemData.children  && itemData.flag == 0">
      <template slot="title">
        <img class="menu-icon"
             v-if="itemData.icon"
             :src="iconMap[itemData.icon]">
        <span slot="title">{{ itemData.label }}</span>
      </template>

      <template v-for="(item, index) in itemData.children">
        <menu-item :itemData="item"
                   :parentIndex="index"
                   :key="parentIndex + '-'+ index"></menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  data () {
    return {
      iconMap: [
        require('../../assets/images/home/ico_user.png'),
        require('../../assets/images/home/ico_config.png'),

        require('../../assets/images/home/home.png'),
        require('../../assets/images/home/user.png'),
        require('../../assets/images/home/msg.png'),
        require('../../assets/images/home/work.png'),
        require('../../assets/images/home/serveice.png'),
        require('../../assets/images/home/static.png'),
        require('../../assets/images/home/config.png'),
      ],
    }
  },
  props: {
    itemData: {
      type: Object,
      default: () => ({})
    },
    parentIndex: [Number]
  }
}
</script>

<style lang="scss" scoped>
.el-menu--collapse > div > .el-submenu > .el-submenu__title span {
  height: 0;
  width: 0;
  overflow: hidden;
  visibility: hidden;
  display: inline-block;
}
.el-menu--collapse
  > div
  > .el-submenu
  > .el-submenu__title
  .el-submenu__icon-arrow {
  display: none;
}
.menu-icon {
  margin-right: 8px;
}
.el-submenu .el-menu-item {
  padding-left: 55px !important;
}
</style>
