<template>
  <div class="map-container">
    <div ref="container"
         class="peak-map"></div>
  </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'

export default {
  name: 'MapChart',
  props: ['mapData'],
  data () {
    return {
      map: null,
      AMap: null,
      district: null,
      clusterer: null
    }
  },
  beforeCreate () {
    AMapLoader.load({
      key: '4b780c844e1f8301cba3a722bc3c81c7', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ['AMap.MarkerClusterer', 'AMap.DistrictSearch', 'AMap.DistrictLayer'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      AMapUI: {
        // 是否加载 AMapUI，缺省不加载
        version: '1.1', // AMapUI 缺省 1.1
        plugins: [] // 需要加载的 AMapUI ui插件
      },
      Loca: {
        // 是否加载 Loca， 缺省不加载
        version: '1.3.2' // Loca 版本，缺省 1.3.2
      }
    })
      .then((AMap) => {
        this.AMap = AMap
        this.$nextTick(() => this.initMap(AMap))
      })
      .catch((e) => {
        console.error(e)
      })
  },
  computed: {
    markers: function () {
      let self = this
      let markerList = this.mapData.map((item) => {
        console.log('item:', item)
        let { longitude, latitude, customerId, customerName, actualEmissions, inspectEmissions, vouchQuota, ccer, predistributionQuota, companyName } = item
        return self.createMarker(longitude, latitude, customerId, customerName, actualEmissions, inspectEmissions, vouchQuota, ccer, predistributionQuota, companyName)
      })
      return markerList
    }
  },
  beforeDestroy () {
    this.map && this.map.destroy()
    console.log('地图已销毁')
  },
  methods: {
    handlePolygon (result) {
      let bounds = result.districtList[0].boundaries
      if (bounds) {
        for (let i = 0, l = bounds.length; i < l; i++) {
          new this.AMap.Polyline({
            map: this.map, // 指定地图对象
            strokeWeight: 2, // 轮廓线宽度
            fillOpacity: 0,
            path: bounds[i], // 轮廓线的节点坐标数组
            strokeColor: '#2CEAA3', // 线条颜色
            strokeOpacity: 1,
            isOutline: true,
            outlineWeight: 4,
            outlineColor: 'rgba(49, 101, 246,0.4)'
          })
        }
      }
    },
    initMap (AMap) {
      let self = this
      self.map = new AMap.Map(self.$refs.container, {
        resizeEnable: true,
        disableSocket: true,
        mapStyle: 'amap://styles/92889646e1235fcb544180a1cbdf5aab',
        center: [108.95119, 34.278319],
        zoom: 5,
        pinch: 1
      })
      let districtSearch = new AMap.DistrictSearch({
        // 关键字对应的行政区级别，共有5种级别
        level: 'province',
        //  是否显示下级行政区级数，1表示返回下一级行政区
        subdistrict: 0,
        // 返回行政区边界坐标点
        extensions: 'all'
      })

      // 搜索所有省/直辖市信息
      districtSearch.search('陕西', (status, result) => {
        // 查询成功时，result即为对应的行政区信息
        self.handlePolygon(result)
      })

      self.map.on('complete', function () {
        self.clusterer = new AMap.MarkerClusterer(self.map, self.markers, {
          renderClusterMarker: self.renderClusterMarker,
          gridSize: 80
        })
        console.log('地图加载完成！')
      })
    },
    renderClusterMarker (context) {
      let markesList = context.markers
      let loadSum = 0
      if (markesList && markesList.length > 0) {
        markesList.forEach((item) => {
          let currentLoad = Number(item.getExtData())
          if (!Number.isNaN(currentLoad)) {
            loadSum += currentLoad
          } else {
            loadSum += 0
          }
        })
      }
      let className = ''
      if (loadSum < 5000) {
        className = 'small'
      } else if (loadSum >= 5000 && loadSum <= 10000) {
        className = 'middle'
      } else {
        className = 'big'
      }
      let div = document.createElement('div')
      div.innerHTML = `<div class="map-mark-con ${className}">
        <div class="hover-con">
          <span class="border-dom"></span>
          <p class="hover-title">碳排放总量（吨）</p>
          <p class="item-info">${loadSum.toLocaleString()}</p>
        </div>
      </div>`
      context.marker.setOffset(new this.AMap.Pixel(-30, -20))
      context.marker.setContent(div)
    },
    createMarker (longitude, latitude, customerId, customerName, actualLoad, inspectEmissions, vouchQuota, ccer, predistributionQuota, companyName) {
      if (!window.AMap) {
        console.log('访问AMap发生错误。')
        return
      }
      // let AMap = window.AMap;
      let className = ''
      if (actualLoad < 5000) {
        className = 'small'
      } else if (actualLoad >= 5000 && actualLoad <= 10000) {
        className = 'middle'
      } else {
        className = 'big'
      }
      return new this.AMap.Marker({
        position: new this.AMap.LngLat(longitude || 0, latitude || 0),
        size: new this.AMap.Size(43, 41),
        offset: new this.AMap.Pixel(-30, -20),
        zIndex: 122,
        content: `<div class="map-mark-con ${className}">
        <div class="hover-con big-size">
          <span class="border-dom"></span>
          <p  class='item-value green'>${companyName}</p>
          <p class="hover-info-item">
            <span class="item-label">核查排放量</span>
            <span class='item-value red'>${inspectEmissions.toLocaleString()}</span>
          </p>
          <p class="hover-info-item">
            <span class="item-label">核定配额</span>
            <span class='item-value grey'>${vouchQuota.toLocaleString()}</span>
          </p>
          <p class="hover-info-item">
            <span class="item-label">CCER总量</span>
            <span class='item-value green'>${ccer.toLocaleString()}</span>
          </p>
          <p class="hover-info-item">
            <span class="item-label">预分配配额</span>
            <span class='item-value blue'>${predistributionQuota.toLocaleString()}</span>
          </p>
        </div>
      </div>`,
        extData: actualLoad,
        title: customerName
      })
    }
  }
}
</script>
<style lang="scss">
@import "~@/styles/mixin.scss";

.hover-info-item {
  @include flex(space-between, center);
  height: 30px;
  line-height: 30px;
  .item-label {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.5);
  }
  .item-value {
    font-size: 20px;
  }
  .red {
    color: #ff6333;
  }
  .grey {
    color: #ccf0ff;
  }
  .green {
    color: #00e599;
  }
  .blue {
    color: #00ccff;
  }
}
.green {
  color: #00e599;
}
.map-mark-con {
  width: 69px;
  height: 74px;
  position: relative;
  z-index: 9999;
  &:hover .hover-con {
    display: block;
  }
  &.small {
    background: url(../assets/images/big-screen/group-5-copy-2.png) no-repeat
      center center;
    background-size: 100% 100%;
  }
  &.middle {
    background: url(../assets/images/big-screen/group-5-copy-5.png) no-repeat
      center center;
    background-size: 100% 100%;
  }
  &.big {
    background: url(../assets/images/big-screen/group-5-copy-6.png) no-repeat
      center center;
    background-size: 100% 100%;
  }
  .hover-con {
    &.big-size {
      width: 188px;
    }
    position: absolute;
    left: 40px;
    bottom: 40px;
    border: 2px solid #1d7657;
    width: 160px;
    text-align: left;
    padding: 10px;
    background: #000a14;
    color: #fff;
    display: none;
    border-radius: 4px;
    &:after {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      background: url(../assets/images/big-screen/left_top.png) no-repeat center
        center;
      background-size: 100% 100%;
      left: -2px;
      top: -2px;
    }
    &:before {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      background: url(../assets/images/big-screen/right_bottom.png) no-repeat
        center center;
      background-size: 100% 100%;
      right: -2px;
      bottom: -2px;
    }
    .border-dom {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      right: 0;
      &:after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        background: url(../assets/images/big-screen/left_bottom.png) no-repeat
          center center;
        background-size: 100% 100%;
        left: -2px;
        bottom: 8px;
      }
      &:before {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        background: url(../assets/images/big-screen/right_top.png) no-repeat
          center center;
        background-size: 100% 100%;
        right: -2px;
        top: -12px;
      }
    }
    p {
      margin: 0;
      padding: 0;
    }
    .hover-title {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.5);
      margin-bottom: 10px;
    }
    .item-info {
      font-size: 24px;
      color: #ffffff;
      font-family: "Myriad Pro";
    }
  }
}
.peak-map {
  height: 100%;
  background: transparent !important;
}
.map-box,
.map-container {
  width: 100%;
  height: 100%;
}
.amap-logo {
  display: none !important;
}
.amap-copyright {
  opacity: 0;
}
.amap-marker-label {
  position: relative;
  background: transparent;
  border: 0;
}
.area-name {
  position: absolute;
  width: 100px;
  text-align: center;
  top: 40px;
  left: -32px;
  font-size: 16px;
  cursor: pointer;
}
.amap-marker-label:hover {
  transform: scale(1.05);
  transform-origin: center;
}

.amap-icon {
  display: none;
}
</style>
