export default {
  commonCof: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: params => {
        let dataStr = `<div style="width:200px"><p style="font-weight:bold;margin:0 8px 15px;margin-bottom:2px">${params[0].name}</p></div>`
        params.forEach(item => {
          dataStr += `<div>
            <div style="margin: 0 8px;">
              <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color};"></span>
              <span>${item.seriesName}</span>
              <span style="float:right;color:#000000;margin-left:20px;">${item.data}</span>
            </div>
          </div>`
        })
        return dataStr
      }
    },
    grid: {
      top: '10%',
      left: '3%',
      right: '3%',
      bottom: '5%'
    },
    legend: {
      top: 0
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      nameTextStyle: {
        color: '#000'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#3D3D3D'],
          width: 1,
          type: 'solid'
        }
      }, // 网格线设置
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#3D3D3D', // 左边线的颜色
          width: '2' // 坐标线的宽度
        }
      },
      axisTick: { show: false, length: 0 },
      axisLabel: {
        show: true
      }
    },
    yAxis: {
      name: '(吨)',
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#3D3D3D'],
          width: 1,
          type: 'solid'
        }
      }, // 网格线设置
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#3D3D3D', // 左边线的颜色
          width: '2' // 坐标线的宽度
        }
      },
      axisTick: {
        // y轴刻度线
        show: false
      },
      axisLabel: {
        show: true
      }
    }

  },
  doubleY: {
    yAxis: [{
      name: '(吨)',
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#3D3D3D'],
          width: 1,
          type: 'solid'
        }
      }, // 网格线设置
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#3D3D3D', // 左边线的颜色
          width: '2' // 坐标线的宽度
        }
      },
      axisTick: {
        // y轴刻度线
        show: false
      },
      axisLabel: {
        show: true
      }
    }, {
      name: '%',
      type: 'value',
      splitLine: {
        show: true,
        lineStyle: {
          color: ['#3D3D3D'],
          width: 1,
          type: 'solid'
        }
      }, // 网格线设置
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#3D3D3D', // 左边线的颜色
          width: '2' // 坐标线的宽度
        }
      },
      axisTick: {
        // y轴刻度线
        show: false
      },
      axisLabel: {
        show: true,
        formatter: '{value}'
      }
    }]
  }
}
