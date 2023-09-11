<template>
    <div class="h-b-con">
        <line-chart :options="options"></line-chart>
    </div>
</template>
<script>
import LineChart from '@/components/LineChart'
import echarts from 'echarts'

export default {
    name: 'OneArea',
    components: {
        LineChart
    },
    props: {
        chartData: {
            type: Array,
            default: () => []
        },
    },
    methods: {
        trimNumber (str) {
            if (str[0] == 0) {
                return str[1]
            } else {
                return str
            }
        }
    },
    computed: {
        options () {
            let bgColor = 'transparent'
            let color = [
                "#4080de",
                '#39ffc9'
            ]
            const hexToRgba = (hex, opacity) => {
                let rgbaColor = ''
                let reg = /^#[\da-f]{6}$/i
                if (reg.test(hex)) {
                    rgbaColor = `rgba(${parseInt('0x' + hex.slice(1, 3))},${parseInt(
                        '0x' + hex.slice(3, 5)
                    )},${parseInt('0x' + hex.slice(5, 7))},${opacity})`
                }
                return rgbaColor
            }

            let categoryData = this.chartData.map((item) => {
                return item.time
            });
            let cdata = this.chartData.map((item) => {
                return item.in
            });
            let cdata1 = this.chartData.map((item) => {
                return item.out
            });

            let a = {
                backgroundColor: bgColor,
                color: color,
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        let html = `<div style='width: 200px;padding: 8px'><p style="font-size: 16px;margin: 0;padding:0;color: rgb(20, 183, 255)">${params[0].name}</p>`
                        params.forEach(v => {
                            html += `<div style="color: #666;font-size: 14px;line-height: 44px;">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]};"></span>
                <span style="color: rgb(255,255,255)">${v.seriesName}</span>
                <span style="color:rgb(44, 234, 163);font-weight:400;font-size: 18px;float:right">${v.value}</span>`
                        })
                        html += '</div>'
                        return html
                    },
                    extraCssText: 'border:1px solid rgb(24,108,153);background: rgb(0,10,20); border-radius: 4;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(225,225,225,0.1)',
                            shadowColor: 'rgba(225,225,225,0.1)',
                            shadowBlur: 5
                        }
                    }
                },
                legend: [{
                    orient: 'horizontal', // 'vertical', 'horizontal
                    x: 'center', // 'center' | 'left' | {number},
                    y: 'top', // 'center' | 'bottom' | {number}
                    // padding: 10, // [5, 10, 15, 20]
                    itemGap: 24,
                    textStyle: { color: '#ffffff', fontSize: 12 },
                    itemWidth: 10,
                    itemHeight: 10,
                    icon: 'circle',
                }],
                grid: {
                    left: '20px',
                    right: '20px',
                    bottom: '20px',
                    top: '40px',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: categoryData,
                    boundaryGap: false,
                    axisLabel: {
                        margin: 10,
                        formatter: '{value}',
                        textStyle: {
                            fontSize: 12,
                            color: '#8DA9BF'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            type: 'solid',
                            color: '#2E415D'
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#2E415D'
                        }
                    }
                }],
                title: {
                    left: 'center',
                    top: '6%',
                    textAlign: '50%',    //居左
                    textStyle: {         //样式
                        fontSize: 16,
                        color: '#ffffff'
                    }
                },
                yAxis: [{
                    name: '(次)',
                    nameTextStyle: {
                        color: '#8DA9BF',
                        fontSize: 12,
                        nameLocation: "center",
                        lineHeight: 18
                    },

                    splitNumber: 3,
                    type: 'value',
                    textAlign: 'left',
                    itemGap: 0,
                    axisLabel: {
                        textStyle: {
                            fontSize: 12,
                            color: '#8DA9BF'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            type: 'solid',
                            color: '#022f65'
                        }
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            type: 'solid',
                            color: '#2E415D'
                        }
                    },
                    axisTick: {
                        show: false
                    }
                }],
                series: [
                    {
                        name: '人员进',
                        type: 'line',
                        smooth: false,
                        showSymbol: true,
                        zlevel: 3,
                        lineStyle: {
                            normal: {
                                color: color[0]
                            }
                        },
                        itemStyle: { normal: { label: { show: false, position: 'top', fontSize: 10, color: "#87baf8" } } },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [{
                                        offset: 0,
                                        color: hexToRgba(color[0], 1)
                                    },
                                    {
                                        offset: 0.5,
                                        color: hexToRgba(color[0], 0.3)
                                    },
                                    {
                                        offset: 1,
                                        color: hexToRgba(color[0], 0.1)
                                    }
                                    ],
                                    false
                                ),
                                shadowColor: hexToRgba(color[0], 0.1),
                                shadowBlur: 10
                            }
                        },
                        data: cdata
                    },
                    {
                        name: '人员出',
                        type: 'line',
                        smooth: false,
                        showSymbol: true,
                        zlevel: 3,
                        lineStyle: {
                            normal: {
                                color: color[1]
                            }
                        },
                        itemStyle: { normal: { label: { show: false, position: 'top', fontSize: 10, color: "#87baf8" } } },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0,
                                    0,
                                    0,
                                    1,
                                    [{
                                        offset: 0,
                                        color: hexToRgba(color[1], 1)
                                    },
                                    {
                                        offset: 0.5,
                                        color: hexToRgba(color[1], 0.3)
                                    },
                                    {
                                        offset: 1,
                                        color: hexToRgba(color[1], 0.1)
                                    }
                                    ],
                                    false
                                ),
                                shadowColor: hexToRgba(color[1], 0.1),
                                shadowBlur: 10
                            }
                        },
                        data: cdata1
                    }
                ]
            }
            return a
        }
    },
}
</script>
<style lang="scss" scoped>
.h-b-con {
    height: 100%;
    width: 100%;
}
</style>
