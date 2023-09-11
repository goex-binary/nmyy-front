<template>
  <div :id="chartId"
       class="chart-inner-box"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'LineChart',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      chartId: `chart_${this._uid}`,
      myChart: null
    }
  },
  watch: {
    options () {
      this.$nextTick(() => {
        this.initChart()
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy () {
    this.destroyChart()
  },
  methods: {
    initChart () {
      this.myChart = this.$echarts5.init(document.getElementById(this.chartId))
      this.myChart.setOption(this.options)
    },
    destroyChart () {
      this.myChart && this.myChart.dispose()
    }
  }
}
</script>
<style lang="scss" scoped>
.chart-inner-box {
  width: 100%;
  height: 100%;
}
</style>
