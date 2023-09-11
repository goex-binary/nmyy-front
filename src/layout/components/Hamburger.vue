<template>
  <div style="padding: 0 15px;"
       @click="toggleClick">
    <span :class="{'is-active':isActive}"
          class="hamburger"></span>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleClick () {
      this.$emit('toggleClick')
    }
  }
}
</script>

<style scoped lang="scss">
.hamburger {
  display: inline-block;
  vertical-align: middle;
  width: 20px;
  height: 20px;
}

.hamburger.is-active {
  transform: rotate(180deg);
}
.hamburger {
  display: inline-block;
  width: 100%;
  height: 100%;
  background: url(../../assets/images/home/right-default.png) no-repeat center
    center;
  background-size: 8px 15px;
  &:hover {
    background: url(../../assets/images/home/right-hover.png) no-repeat center
      center;
    background-size: 8px 15px;
  }
  &:active {
    background: url(../../assets/images/home/right-click.png) no-repeat center
      center;
    background-size: 8px 15px;
  }
}
</style>
