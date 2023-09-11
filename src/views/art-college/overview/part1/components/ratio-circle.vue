<template>
    <div class="h-b-con">
        <line-chart :options="options"></line-chart>
    </div>
</template>
<script>
import LineChart from '@/components/LineChart'
import echarts from 'echarts'

export default {
    name: 'CircleChart',
    components: {
        LineChart
    },
    data () {
        return {
            startAngle: 0,
        }
    },
    mounted () {
        // setInterval(() => {
        //   this.startAngle += 5;
        // }, 200);
    },
    props: {
        pieData: {
            type: Array,
            default: () => []
        },
        titleTxt: {
            type: String,
            default: ''
        },
        sum: {
            type: [String, Number],
            default: '0'
        }
    },
    computed: {
        options () {
            let bgColor = 'transparent'
            let color = [new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#7d2fba" },
                { offset: 1, color: "#b453ff" }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#fd2502" },
                { offset: 1, color: "#b51a00" }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#03c3fc" },
                { offset: 1, color: "#017496" }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#fdd602" },
                { offset: 1, color: "#ba9f01" }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#7FC268" },
                { offset: 1, color: "#0BBBB7" }
            ]),
            new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#E7B115" },
                { offset: 1, color: "#F5814C" }
            ])]
            let echartData = this.pieData.map(item => {
                return {
                    name: item.name,
                    value: item.val
                }
            });

            let objData = array2obj(echartData, "name");
            function array2obj (array, key) {
                var resObj = {};
                for (var i = 0; i < array.length; i++) {
                    resObj[array[i][key]] = array[i];
                }
                return resObj;
            }

            let formatNumber = function (num) {
                let reg = /(?=(\B)(\d{3})+$)/g
                return num.toString().replace(reg, ',')
            }
            let total = echartData.reduce((a, b) => {
                return a + b.value * 1
            }, 0)

            return {
                backgroundColor: bgColor,
                color: color,
                tooltip: {
                    trigger: 'item',
                    formatter: "{b} <br/> {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    show: true,
                    icon: "circle",
                    top: "center",
                    left: '55%',
                    // data: arrName,
                    itemWidth: 8,
                    itemHeight: 8,
                    // padding: [0, 5],
                    itemGap: 20,
                    formatter: function (name) {
                        return "{title|" + name + "} {title|" + (objData[name].value / total * 100).toFixed(2) + "%} {value|" + (objData[name].value) + "}"
                    },

                    textStyle: {
                        rich: {
                            title: {
                                fontSize: 12,
                                color: "#fff",
                                width: 75,
                            },
                            value: {
                                fontSize: 12,
                                color: "#fff",
                            }
                        }
                    },
                },
                series: [{
                    startAngle: this.startAngle,
                    animation: false, //是否开启动画
                    type: 'pie', // 类型设置为饼图
                    radius: ['48%', '60%'], // 设置内圈与外圈的半径使其呈现为环形
                    center: ['25%', '50%'], // 圆心位置， 用于调整整个图的位置
                    data: echartData, // 数据
                    itemStyle: {
                        // borderRadius: 30, // 设置每一段子项目的圆角
                        borderColor: '#0a212d', // 设置成背景颜色
                        borderWidth: 6, // 子项目间距
                    },
                    labelLine: {
                        show: false,
                        length2: 50,
                        length: 15,
                        lineStyle: {
                            color: '#2E415D'
                        }
                    },
                    label: {
                        show: false,
                        position: 'outside',
                        distanceToLabelLine: -50,
                        rich: {
                            name: {
                                color: '#fff',
                                fontSize: 12,
                                fontWeight: 400,
                                padding: [0, 10, 30, 0]
                            },
                            zb: {
                                color: '#19D8FF',
                                fontWeight: 400,
                                fontSize: 18,
                                padding: [0, 0, 30, 0]
                            },
                            value: {
                                color: '#19D8FF',
                                fontWeight: 600,
                                fontSize: 24,
                                padding: [0, 0, 30, 0]
                            }
                        },
                        formatter: (params) => {
                            const x = params.dataIndex
                            return '{name' + '|' + params.data.name + '}' + '{value' + '|' + params.data.value + '}' + '{zb' + '|/' + params.percent + '%}'
                        }
                    },
                }]
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.h-b-con {
    height: 100%;
    width: 100%;
}
</style>
