<template>
  <el-table v-if="height"
            stripe
            :ref="key"
            :data="tableData"
            :height="height"
            :show-header="showHeader"
            :key="key"
            :class="{'has-padding': hasPadding}"
            class="i-table"
            style="width: 100%">
    <slot></slot>
  </el-table>
  <el-table v-else
            stripe
            :data="tableData"
            :show-header="showHeader"
            :ref="key"
            row-key="id"
            :key="key"
            :class="{'has-padding': hasPadding}"
            class="i-table"
            style="width: 100%">
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  name: 'ITable',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    height: {
      type: String
    },
    hasPadding: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    key () {
      return `key_${this._uid}`
    }
  },
  methods: {
    getSelection () {
      this.$emit('emitSelection', this.$refs[this.key].selection);
    }
  }

}
</script>
<style lang="scss" scoped>
.i-table.el-table ::v-deep .el-table--border::after,
.i-table.el-table ::v-deep .el-table--group::after,
.el-table::before {
  display: none;
}
.i-table.el-table ::v-deep .el-checkbox__inner {
  background-color: #08151f !important;
  border: 1px solid #072d3e !important;
  width: 22px;
  height: 22px;
}

.i-table.el-table ::v-deep .el-checkbox__inner::after {
  border: 2px solid #00c5ff;
  border-left: 0;
  border-top: 0;
  height: 12px;
  left: 6px;
  position: absolute;
  top: 1px;
  width: 6px;
  transform-origin: center;
  transition: none;
}

.i-table.el-table
  ::v-deep
  .el-checkbox__input.is-indeterminate
  .el-checkbox__inner::before {
  content: "";
  position: absolute;
  display: block;
  background-color: #00c5ff;
  height: 5px;
  transform: scale(0.5);
  left: 0px;
  right: 0;
  top: 8px;
}

.i-table.el-table.el-table--striped
  ::v-deep
  .el-table__body
  tr.el-table__row--striped
  td {
  background: rgba($color: #fff, $alpha: 0.02);
}
.el-table__expanded-cell,
.i-table.el-table,
.i-table.el-table ::v-deep th,
.i-table.el-table ::v-deep tr {
  background-color: transparent;
}
.i-table.el-table ::v-deep td {
  border-bottom: none;
  height: 66px;
  padding: 0;
  font-size: 14px;
  color: #fff;
}
.i-table.el-table ::v-deep th.is-leaf {
  border-bottom: 1px solid #072c3d;
  border-top: none;
  height: 66px;
  padding: 0;
  background: #091c27;
  color: #5b6e6f;
  font-size: 14px;
}
.i-table.el-table ::v-deep .el-table__body tr:hover > td {
  background-color: transparent;
}
.i-table.has-padding ::v-deep td,
.i-table.has-padding ::v-deep th {
  padding-left: 40px !important;
}
.i-table.has-padding ::v-deep .el-table__body tr.current-row > td {
  background-color: transparent;
}
</style>
