<template>
  <div class="manager-con">
    <LeafMap />
  </div>
</template>

<script>
import LeafMap from "./components/map.vue";

export default {
  components: {
    LeafMap,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.manager-con {
  width: 100%;
  height: calc(100vh - 100px);
}
</style>
