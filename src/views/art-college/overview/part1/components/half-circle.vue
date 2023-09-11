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
            let arrName = getArrayValue(this.chartData, "name");
            let arrValue = getArrayValue(this.chartData, "value");
            let sumValue = eval(arrValue.join('+'));
            let objData = array2obj(this.chartData, "name");
            let optionData = getData(this.chartData)
            function getArrayValue (array, key) {
                var key = key || "value";
                var res = [];
                if (array) {
                    array.forEach(function (t) {
                        res.push(t[key]);
                    });
                }
                return res;
            }

            function array2obj (array, key) {
                var resObj = {};
                for (var i = 0; i < array.length; i++) {
                    resObj[array[i][key]] = array[i];
                }
                return resObj;
            }

            function getData (data) {
                var res = {
                    series: [],
                    yAxis: []
                };
                for (let i = 0; i < data.length; i++) {
                    let gap = 33 - (data.length * 3);
                    res.series.push({
                        name: '',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [82 - i * gap + '%', 75 - i * gap + '%'],
                        center: ["25%", "50%"],
                        label: {
                            show: false
                        },
                        itemStyle: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false
                            },
                            borderWidth: 5,
                        },
                        data: [{
                            value: data[i].value,
                            name: data[i].name
                        }, {
                            value: sumValue - data[i].value,
                            name: '',
                            itemStyle: {
                                color: "rgba(0,0,0,0)",
                                borderWidth: 0
                            },
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        }]
                    });
                    res.series.push({
                        name: '',
                        type: 'pie',
                        silent: true,
                        z: 1,
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [82 - i * gap + '%', 75 - i * gap + '%'],
                        center: ["25%", "50%"],
                        label: {
                            show: false
                        },
                        itemStyle: {
                            label: {
                                show: false,
                            },
                            labelLine: {
                                show: false
                            },
                            borderWidth: 5,
                        },
                        data: [{
                            value: 7.5,
                            itemStyle: {
                                color: "#123354",
                                borderWidth: 0
                            },
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        }, {
                            value: 2.5,
                            name: '',
                            itemStyle: {
                                color: "rgba(0,0,0,0)",
                                borderWidth: 0
                            },
                            tooltip: {
                                show: false
                            },
                            hoverAnimation: false
                        }]
                    });
                    // res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + "%");
                }
                return res;
            }

            let a = {
                backgroundColor: 'transparent',
                legend: {
                    orient: 'vertical',
                    show: true,
                    icon: "circle",
                    top: "center",
                    left: '55%',
                    data: arrName,
                    itemWidth: 8,
                    itemHeight: 8,
                    // padding: [0, 5],
                    itemGap: 20,
                    formatter: function (name) {
                        return "{title|" + name + "} {title|" + (objData[name].value / sumValue * 100).toFixed(2) + "%} {value|" + (objData[name].value) + "}  {title|人}"
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
                tooltip: {
                    show: true,
                    trigger: "item",
                    formatter: "{a}<br>{b}:{c}({d}%)"
                },
                color: [
                    '#4689ec',
                    '#18d8ff',
                    '#39ffc9',
                    '#fee676',
                    '#ed9315'
                ],
                grid: {
                    top: '16%',
                    bottom: '53%',
                    left: "30%",
                    containLabel: false
                },
                yAxis: [{
                    type: 'category',
                    inverse: true,
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,
                        inside: true,
                        textStyle: {
                            color: "#fff",
                            fontSize: 16,
                        },
                        show: true
                    },
                    data: optionData.yAxis
                }],
                xAxis: [{
                    show: false
                }],
                series: optionData.series
            };
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
