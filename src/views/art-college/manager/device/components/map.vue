<template>
  <div class="map-con">
    <div id="map"></div>

    <div class="operation-btns">
      <button @click="activateMarkerAddTool(0)" class="preview">添加摄像头</button>
      <button @click="cancelDeviceMarkerAddition" class="preview">取消</button>
    </div>

    <div class="level-control" v-if="levelControlShow">
      <div
        v-for="(item, index) in floorLevels"
        :key="index"
        :class="{ active: item === currentLevel }"
        @click="changeLevel(item)"
      >{{ levelMaps[item] }}</div>
    </div>

    <add-dialog
      :currentBuild="currentBuild"
      :currentLevel="currentLevel"
      :latlng="settingLatlng"
      ref="addDialog"
      @refreshList="refreshList"
    />
    <!-- Area Grid Dialog -->
    <AeraGridDialog v-model="editedGrid" :visible.sync="aeraGridDialogVisible" @save="saveAeraGrid" ref="aeraGridDialog" />
  </div>
</template>

<script>
import AddDialog from "./add-dialog.vue";
import AeraGridDialog from "./AeraGridDialog.vue";

import {
  cameraWithLoc,
  fetchMarker,
  fetchAreaGrids,
  saveAreaGrid,
} from "@/api/neimeng";
import range from "./range"; // 地块儿范围线
import {
  levelMaps,
  buildingFloorPlanData,
  buildingOutlinePlanData,
} from "../data/constData";
import cameraMarker from "../mixin/cameraMarker";

// import demojson from './demo.json'
//引入鹰眼缩放小地图
import MiniMap from "leaflet-minimap";
import axios from "axios";
import "leaflet-draw";
import "leaflet-rotatedmarker";

import "leaflet-editable";
import "leaflet.path.drag";
import { isValidJSONObjectOrArray } from "@/utils/validate";

export default {
  name: "Map",
  mixins: [cameraMarker],
  components: {
    AddDialog,
    AeraGridDialog,
  },
  data() {
    return {
      settingLatlng: {},
      cameraType: 0,
      levelMaps,
      selectedMapPoints: {}, // 保存选中的点位的坐标数据
      levelControlShow: false,
      map: null,
      minMap: null,
      currentBuild: undefined, //"fengyucaochang", // 当前选中的楼栋
      currentLevel: undefined, //"level1", // 当前选中的楼层
      buildingFloorPlanData,
      buildingOutlinePlanData,
      markerLayerGroup: null,
      gridFeatureGroup: null,
      aeraGridDialogVisible: false,
      editedGrid: {
        name: "",
        manager: "",
        contact: "",
        priority: "",
        latlngs: "",
      },
      buildingLayers: [],
      campusLayer: null,
    };
  },
  watch: {
    currentLevel(newVal, oldVal) {
      this.markerClusterGroup.clearLayers();
      this.changeLayer(newVal, oldVal);

      let filteredMarkers = this.markerListData;
      console.log("newVal:", newVal);
      console.log("this.markerListData:", this.markerListData);
      // Filter only if newVal is defined
      if (typeof newVal !== "undefined") {
        filteredMarkers = this.markerListData.filter(
          item => item.building === this.currentBuild && item.floor === newVal
        );
      }

      const markers = filteredMarkers.map(item =>
        this.createDeviceMarker(item)
      );
      this.markerClusterGroup.addLayers(markers);
    },
  },

  computed: {
    floorLayerMaps() {
      let _data = {};
      let orgData = this.buildingFloorPlanData;
      let buildNames = Object.keys(orgData);
      buildNames.forEach(buildName => {
        let _buildData = {};
        let build = orgData[buildName];
        let levels = Object.keys(build);
        levels.forEach(item => {
          _buildData[item] = [];
        });
        _data[buildName] = _buildData;
      });
      return _data;
    },
    floorLevels() {
      let _obj = [];
      let build = this.floorLayerMaps[this.currentBuild];
      if (build) {
        _obj = Object.keys(build);
      }
      return _obj;
    },
  },
  mounted() {
    this.fetchMarkerList(); // 获取摄像头列表
    this.fetchAreaGridList();
    this.$nextTick(() => {
      this.initMap();
    });
  },
  beforeDestroy() {
    this.map && this.map.remove();
    // this.$commandSocket.close();
  },
  methods: {
    sendMsg() {
      if (this.$commandSocket) {
        if (this.$commandSocket.readyState == window.WebSocket.OPEN) {
          this.$commandSocket.send(
            '{ "context": "subscribe", "subject": "Home" }'
          );
        }
      }
    },
    fetchMarkerList() {
      fetchMarker().then(res => {
        if (res.data) {
          this.$nextTick(() => {
            this.drawMaker(res.data); // 开始渲染
          });
        }
      });
    },
    fetchAreaGridList() {
      fetchAreaGrids().then(res => {
        if (res.data) {
          this.gridFeatureGroup.clearLayers();

          const areaGridDatas = res.data;

          areaGridDatas.forEach(item => {
            const {
              gridName: name,
              responsiblePerson: manager,
              contact,
              priority,
              gridLatLng: latlngs,
            } = item;
            const getColorByPriority = priority => {
              switch (priority) {
                case "red":
                  return "#ff0000";
                case "blue":
                  return "#0000ff";
                case "yellow":
                  return "#ffff00";
                case "green":
                  return "#00ff00";
                default:
                  return "#000000"; // default to black or any color you like
              }
            };
            if (isValidJSONObjectOrArray(latlngs)) {
              const gridLatLngList = JSON.parse(latlngs);
              console.log(typeof gridLatLngList); // 这应该打印出 "object"
              console.log(Array.isArray(gridLatLngList)); // 这应该打印出 "true"
              let gridLatLngs = gridLatLngList.map(item => {
                return [item[0], item[1]];
              });
              let grid = L.polygon(gridLatLngs, {
                weight: 6,
                opacity: 1,
                color: getColorByPriority(priority),
                fillOpacity: 0.6,
                fillColor: getColorByPriority(priority),
              });
              grid.addTo(this.gridFeatureGroup);
              grid.on("click", e => {
                console.log("aeraGrid click", e.sourceTarget.getLatLngs());
                this.editedGrid = { name, manager, contact, priority, latlngs };
                this.$refs.aeraGridDialog.show();
              });
            }
          });
        }
      });
    },
    refreshList() {
      console.log("**********refreshList***********");
      // 配置完成后清空， 刷新
      this.cancelDeviceMarkerAddition();

      this.fetchMarkerList(); // 获取摄像头列表
    },
    setCameraSettings(layer) {
      console.log("_latlng:", layer);
      //   console.log("layer:", layer);
      console.log("layer:::", layer.options.icon.options.className);
      this.cameraType =
        layer.options.icon.options.className == "leaflet-editing-icon1" ? 1 : 0; // 1球技机 0 枪机

      this.settingLatlng = layer._latlng;

      this.showAddForm();
    },
    setAeraGrid() {
      this.showAddForm();
    },
    showAddForm() {
      console.log("this.currentBuilding", this.currentBuild);
      this.$refs.addDialog.show();
    },
    // 激活设备Marker
    activateMarkerAddTool(idx) {
      // 先取消
      if (this.drawObj) {
        this.drawObj.disable();
      }
      switch (idx) {
        case 0: {
          let icon = new L.divIcon({
            iconSize: new L.Point(30, 30),
            className: "leaflet-editing-icon1",
          });
          this.drawObj = new L.Draw.Marker(this.map, {
            icon: icon,
          });

          console.log(icon, this.drawObj);
          break;
        }
        case 1: {
          this.drawObj = new L.Draw.Marker(this.map, {
            icon: new L.DivIcon({
              iconSize: new L.Point(20, 20),
              className: "leaflet-editing-icon2",
            }),
          });
          break;
        }
      }
      // 启动
      this.drawObj.enable();
    },
    cancelDeviceMarkerAddition() {
      // 删除全部绘制的图层
      if (this.markerLayerGroup) {
        this.markerLayerGroup.clearLayers();
      }
      // 取消绘制操作
      this.drawObj.disable();
    },

    initMap() {
      // 初始化加载底图
      this.loadMap();
      // 鹰眼地图
      this.loadMiniMap();
      // 加载 geojson
      this.loadRoad("road.json", "#0562b2", 1); // 加载路网
      this.loadRoad("env.json", "#034e89", 0.8); // 加载绿化

      //this.loadFirstStep(); // 加载建筑首层
      this.loadInitialBuildingPlans();

      this.loadInitialBuildingFloors(); // 初始化加载楼层数据
    },
    changeLevel(item) {
      // console.log("item:", item);
      this.changeLayer(item, this.currentLevel);
      this.currentLevel = item;
    },
    changeLayer(newLevel, oldLevel) {
      const getLayersByLevel = level => {
        const buildingData = this.floorLayerMaps[this.currentBuild];
        return (buildingData && buildingData[level]) || [];
      };

      const oldLayers = getLayersByLevel(oldLevel);
      const newLayers = newLevel ? getLayersByLevel(newLevel) : [];

      if (oldLayers.length) {
        this.clearLayers(oldLayers);
      }
      if (newLayers.length > 0) {
        this.addLayers(newLayers);
        console.log("this.buildingLayers:", this.buildingLayers);
        console.log("this.currentBuild:", this.currentBuild);
        let that = this;
        let buildingLayer = Object.values(this.buildingLayers).find(item => {
          return item.buildingCode === that.currentBuild;
        });
        if (buildingLayer && buildingLayer.geoLayer) {
          this.zoomToLayer(buildingLayer.geoLayer);
        }
      } else {
        this.currentBuild = undefined;
      }
    },
    clearLayers(layerArr) {
      layerArr.forEach(item => {
        if (this.map.hasLayer(item)) {
          this.map.removeLayer(item);
        }
      });
    },
    addLayers(layerArr) {
      layerArr.forEach(item => {
        if (item) {
          this.map.addLayer(item);
        }
      });
    },
    loadMap() {
      let mapbox = L.tileLayer(
        "https://api.mapbox.com/styles/v1/hardborn/cl2e7snxl003r14l3vqhucmbz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFyZGJvcm4iLCJhIjoiY2wyZTduYnRtMTYxMzNrbGFubjd4MmhiOSJ9.pHDbbsc0Z0BvrIxYYHrdCw",
        {
          attribution: null,
          detectRetina: false,
          maxZoom: 22,
          minZoom: 17,
          noWrap: true,
          subdomains: "abc",
          domains: "abc",
          opacity: 1,
        }
      );
      let mapOptions = {
        editable: true,
        zoomControl: false,
        center: [39.904989, 116.405285],
        zoom: 17,
        layers: [mapbox],
      };

      // 初始化加载底图
      let map = L.map("map", mapOptions);

      this.gridFeatureGroup = new L.FeatureGroup();
      let layerControl = L.control.layers({}, {}).addTo(map);
      layerControl.addOverlay(this.gridFeatureGroup, "区域网格");

      var editableLayers = new L.FeatureGroup();

      this.markerLayerGroup = editableLayers;
      map.addLayer(editableLayers);

      L.control
        .zoom({
          position: "topright",
        })
        .addTo(map);

      let that = this;
      map.on(L.Draw.Event.CREATED, function (e) {
        // that.stopDraw();

        console.log(e, "e");
        var type = e.layerType,
          layer = e.layer;

        console.log("----------type----------", type);
        // console.log("layer:::", layer.options.icon.options.className);
        if (type === "marker") {
          layer.bindPopup("A popup!");
        }
        that.setCameraSettings(layer);

        // layer.on({
        //   //点击方法，变色
        //   click: e => {
        //     // that.setCameraSettings(layer);
        //   },
        // });

        editableLayers.addLayer(layer);
      });

      // 加载地块儿范围底图

      // 通过浏览器 f12 选取面可以看到 我们所看到的面 其实就是 svg 中的 path
      // 而 path 中有个 fill 填充属性 这个属性就是我们本次修改的目标
      // 首先创建个面

      const correctedCoordinates = range.map(item => item.reverse());

      if (
        !Array.isArray(correctedCoordinates) ||
        !correctedCoordinates.length
      ) {
        console.error("Invalid coordinates provided.");
        return;
      }

      // const correctedCoordinates = latlngs.map(item => item.reverse());
      const mapPolygon = L.polygon(correctedCoordinates, {
        weight: 6,
        opacity: 1,
        color: "#00c7ff",
        fillOpacity: 0.6,
        fillColor: "#01305d",
      }).addTo(map);

      map.fitBounds(mapPolygon.getBounds());
      this.campusLayer = mapPolygon;

      L.NewPolygonControl = L.EditControl.extend({
        options: {
          position: "topleft",
          callback: map.editTools.startPolygon,
          editLayer: this.gridFeatureGroup,
          kind: "polygon",
          html: "▰",
        },
      });

      L.BoxControl = L.EditControl.extend({
        options: {
          position: "topleft",
          callback: map.editTools.startRectangle,
          editLayer: null,
          kind: "box",
          html: "Box",
        },
      });

      map.addControl(new L.NewPolygonControl());
      map.addControl(new L.BoxControl());
      this.map = map;

      // // 启用Leaflet.Editable
      // this.map.editTools.startPolygon();

      let highlightStyle = {
        opacity: 1,
        color: "yellow",
        weight: 5,
        fillColor: "white", // same as color by default
        fillOpacity: 0.6,
      };
      // 监听事件
      map.on("editable:drawing:commit", e => {
        console.log("editable:drawing:commit", e);
        let grid = e.layer;
        grid.setStyle(highlightStyle);
        grid.dragging.enable();
        grid.addTo(that.gridFeatureGroup);
        grid.on("click", e => {
          that.showAeraGridDialog();
        });
        const latlngs = grid.getLatLngs();
        let gridLatLngList = latlngs[0].map(item => {
          return [item.lat, item.lng];
        });
        let gridLatLngStr = JSON.stringify(gridLatLngList);
        that.editedGrid = { ...that.editedGrid, latlngs: gridLatLngStr };
        that.showAeraGridDialog();
      });

      // Event handlers
      map.on("contextmenu", function (event) {
        const clickedPoint = event.latlng;
        console.log("clickedPoint:", clickedPoint);
        console.log("contextmenu this.map:", this.map);
        map.flyTo(clickedPoint, 22);
        this.selectedMapPoints = clickedPoint;
      });

      map.on("click", event => {
        console.log("map click event:", event);
        if (typeof this.currentBuild !== undefined) {
          map.fitBounds(this.campusLayer.getBounds());
          this.currentLevel = undefined;
        }
      });
    },

    loadMiniMap() {
      // 鹰眼地图
      let tileLayer = L.tileLayer(
        "https://api.mapbox.com/styles/v1/hardborn/cl2e7snxl003r14l3vqhucmbz/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGFyZGJvcm4iLCJhIjoiY2wyZTduYnRtMTYxMzNrbGFubjd4MmhiOSJ9.pHDbbsc0Z0BvrIxYYHrdCw",
        {
          attribution: null,
          detectRetina: false,
          maxZoom: 180,
          minZoom: 1,
          noWrap: true,
          subdomains: "abc",
          domains: "abc",
          opacity: 1,
        }
      );
      let minMap = new MiniMap(tileLayer, {
        zoomAnimation: true, // 动画缩放
        toggleDisplay: true,
        aimingRectOptions: { color: "red", weight: 1, fillColor: "blue" }, // 通过传递Path.Options对象来设置目标矩形的样式
      });
      minMap.addTo(this.map);
      this.minMap = minMap;
    },

    loadInitialBuildingFloors() {
      //  遍历楼层的json数据
      const buildings = Object.keys(this.buildingFloorPlanData);
      buildings.forEach(building => {
        const floors = Object.keys(this.buildingFloorPlanData[building]);
        floors.forEach(floor => {
          const jsonFilePath = this.buildingFloorPlanData[building][floor];
          this.loadFloorData(jsonFilePath, building, floor); // json文件路径， 楼栋名， 楼层名
        });
      });
    },

    loadInitialBuildingPlans() {
      // 创建一个axios请求的数组
      let requests = this.buildingOutlinePlanData.map(item => {
        return axios.get("neimeng/" + item.path);
      });

      // 使用axios.all()同时发送所有请求
      axios
        .all(requests)
        .then(
          axios.spread((...responses) => {
            responses.forEach((res, index) => {
              const geoData = res.data;
              const buildingItem = this.buildingOutlinePlanData[index];
              this.renderGeoLayer(geoData, buildingItem);
              this.addBuildingNameLabel(geoData, buildingItem);
            });
          })
        )
        .catch(error => {
          console.error("Error fetching building data:", error);
        });
    },

    renderGeoLayer(geoData, buildingItem) {
      const buildingStyle = {
        weight: 4,
        opacity: 1,
        color: "#00c7ff",
        fillOpacity: 0.6,
        fillColor: "#0b6dd1",
      };

      let buildingCode = buildingItem.build;
      const geoLayer = L.geoJson(geoData, {
        style: buildingStyle,
        onEachFeature: (_, layer) => {
          layer.on({
            click: event => {
              L.DomEvent.stopPropagation(event);
              this.handleBuildingClick(buildingItem, layer);
            },
          });
        },
      });

      geoLayer.addTo(this.map);
      this.buildingLayers.push({ buildingCode, geoLayer });
    },

    handleBuildingClick(buildingItem, layer) {
      this.levelControlShow = true;
      // this.changeLevel("");
      this.currentBuild = buildingItem.build;
      this.currentLevel = "level1";
      this.changeLevel("level1");
      this.fitBounds(layer);
      console.log("buildingItem clicked:", this.currentBuild);
    },
    addBuildingNameLabel(geoData, buildingItem) {
      const content = `
        <div class="build-name-label">
            <span class="build-icon"></span>
            ${buildingItem.name}
        </div>`;

      const buildingIcon = L.divIcon({
        html: content,
        className: "my-div-icon",
      });

      const buildingMarker = L.fixedSizeMarker(
        this.getCenterOfGeoData(geoData),
        {
          icon: buildingIcon,
          fontSize: 24,
          zoomBase: 1,
        }
      );

      this.map.addLayer(buildingMarker);
    },

    getCenterOfGeoData(geoData) {
      const dummyLayer = L.geoJson(geoData);
      return dummyLayer.getBounds().getCenter();
    },

    loadFloorData(jsonPath, building, floor) {
      axios.get("neimeng/" + jsonPath).then(response => {
        const geoData = response.data;
        const layerStyle = this.getStyleForBuilding(building);
        const geoLayer = this.createGeoJsonLayer(geoData, layerStyle, building);

        if (building) {
          this.floorLayerMaps[building][floor].push(geoLayer);
        } else {
          geoLayer.addTo(this.map);
        }
      });
    },

    getStyleForBuilding(building) {
      const defaultStyle = {
        weight: 4,
        opacity: 1,
        color: "#00c7ff",
        fillOpacity: 0.6,
        fillColor: "#0b6dd1",
      };

      return building
        ? {
            ...defaultStyle,
            color: "rgba(2, 226, 255, 1.000)",
            fillOpacity: 1,
          }
        : defaultStyle;
    },

    createGeoJsonLayer(data, style, building) {
      return L.geoJson(data, {
        style,
        onEachFeature: (feature, layer) => {
          const contentIcon = this.getContentIconForFeature(feature);
          const centerMarker = L.marker(layer.getBounds().getCenter(), {
            icon: contentIcon,
          });

          layer.on({
            mouseover: () => this.addLayerToMap(centerMarker),
            mouseout: () => this.removeLayerFromMap(centerMarker),
            click: event => {
              L.DomEvent.stopPropagation(event);
              this.zoomToLayer(layer);
              console.log("feature clicked:", feature);
            },
          });
        },
      });
    },

    getContentIconForFeature(feature) {
      const content = `
        <div>
            ${feature.properties["楼名"]}
            ${feature.properties["层数"]}
            ${feature.properties["用途"]}
        </div>`;

      return L.divIcon({
        html: `<div class="my-div-icon">${content}</div>`,
      });
    },

    addLayerToMap(layer) {
      this.map.addLayer(layer);
    },

    removeLayerFromMap(layer) {
      this.map.removeLayer(layer);
    },

    zoomToLayer(layer) {
      this.map.fitBounds(layer.getBounds());
    },

    loadRoad(jsonPath, color, opacity) {
      axios.get("neimeng/" + jsonPath).then(res => {
        const data = res.data;
        let style = {
          weight: 0, //外边框宽度
          opacity: 1, //外边框透明度
          color: color, //外边框颜色
          fillOpacity: opacity, //填充透明度
          fillColor: color, //填充的颜色
        };
        var roadLayer = L.geoJson(data, {
          style,
        });
        roadLayer.addTo(this.map);
      });
    },

    fitBounds(layer, zoom = 22) {
      // layer.bringToFront();
      //定位到该图层
      this.map.fitBounds(layer.getBounds());

      // this.map.setZoom(zoom);
    },
    saveAeraGrid(editedGrid) {
      console.log("saveAeraGrid:", editedGrid);
      saveAreaGrid(editedGrid).then(res => {
        console.log("saveAeraGrid", res);
        this.$message({
          message: "保存成功",
          type: "success",
        });
        this.fetchAreaGridList();
      });
    },
    showAeraGridDialog() {
      // this.aeraGridDialogVisible = true;
      this.$refs.aeraGridDialog.show();
    },
  },
};
</script>
<style lang="scss">
.camera-play-con {
  * {
    max-height: 100%;
    max-width: 100%;
  }
}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.tabsContentDiv .redCol,
.tabsContentDiv .redIcon:before,
.tabsContentDiv .errorColor:before,
.tabsContentDiv .refusePic:before,
.tabsContentDiv .el-icon-status-conn-off:before,
.tabsContentDiv .el-icon-status-kpi-failure:before,
.tabsContentDiv .el-icon-status-failed:before {
  color: #e88282;
}

.tabsContentDiv .el-icon.inactive::before {
  color: #e88282;
}

.tabsContentDiv .el-icon {
  font-size: 16px;
}

.node-ul {
  padding-top: 5px;
  list-style: none;
  padding: 16px 0;
  margin: 0;
}

.node-label {
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #ffffff;
  text-shadow: 0px 2px 40px rgba(0, 0, 0, 0.5);
}

.node-ul li {
  padding: 6px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0 10px;
}

.leaflet-popup-content1 {
  background: rgba(0, 16, 30, 0.8);
  border: 1px solid #17ffeb;
  border-radius: 5px;
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.2);
  position: relative;
  padding: 12px;
}
.camera-info-title {
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  text-shadow: 0px 2px 40px rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
  text-align: left;
}
.control-btns span {
  cursor: pointer;
}
.node-info-close {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  font-size: 16px;
  color: #0ef0f6;
}
.tabsContentDiv {
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
}

.leaflet-marck-enb {
  font-size: 30px;
  border-style: none;
  border-width: 0px;
  color: #999;
  border-color: rgb(51, 187, 255);
}

.leaflet-marck-enb::after {
  content: "";
  padding: 8px;
  background: #fff;
  position: absolute;
  top: 4px;
  left: 7px;
  border-radius: 8px;
  z-index: -1;
}
</style>
<style lang="scss">
@import "~leaflet-draw/dist/leaflet.draw.css";
@import "~@/styles/mixin.scss";
.leaflet-control-zoom {
  border: 0 !important;
  a {
    width: 36px !important;
    height: 36px !important;
    background: #062336 !important;
    border: 1px solid #19d8ff !important;
    color: #19d8ff !important;

    &.leaflet-disabled {
      opacity: 0.6;
    }

    & + a {
      margin-top: 20px;
    }
  }
}
.control-btns {
  // position: absolute;
  right: 100px;
  top: 150px;
  z-index: 999;
  @include flex(space-between, center);
  gap: 5px;
  width: 100%;

  span {
    height: 25px;
    line-height: 25px;
    text-align: center;
    background: rgba(0, 237, 255, 0.2);
    box-shadow: 0px 2px 40px 0px rgba(0, 0, 0, 0.5);
    font-size: 12px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #00edff;
    text-shadow: 0px 2px 40px rgba(0, 0, 0, 0.5);
    flex: 1;
  }
}
.camera-play-con {
  width: 100%;
  height: 185px;
}
// 聚合点 - start
.leaflet-div-icon {
  background: transparent !important;
  border: none !important;
}
.cluster-count-circle {
  width: 90px;
  height: 90px;
  line-height: 90px;
  background: url(../../../../../assets/neimeng/cluster-icon.png) no-repeat
    center center;
  background-size: 90px 90px;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
}
// 聚合点 - end

// 建筑标签 - start
.build-name-label {
  width: 15em;
  height: 4em;
  line-height: 4em;
  background: rgba(0, 16, 30, 0.8);
  box-shadow: 0px 0px 40px 8px rgba(23, 255, 235, 0.7),
    inset 0px 0px 20px 5px rgba(25, 209, 248, 0.5);
  border-radius: 8px;
  border: 2px solid #17ffeb;
  padding: 0 8px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  white-space: nowrap;
  transform: translateX(-50%);
  position: relative;
  @include flex(flex-start, center);

  .build-icon {
    width: 2em;
    height: 2em;
    background: url(../../../../../assets/neimeng/location.png) no-repeat center
      center;
    background-size: 2em 2em;
    margin-right: 0.4em;
  }

  &::after {
    content: "";
    position: absolute;
    width: 1.7em;
    height: 1.7em;
    background: url(../../../../../assets/neimeng/location1.png) no-repeat
      center center;
    background-size: 1.7em 1.7em;
    bottom: -2em;
    left: 50%;
    transform: translateX(-50%);
  }
}
// 建筑标签 - start

// 相机正常态 - start
.fixed-camera-icon {
  width: 32px;
  height: 32px;
  position: relative;
  background: url(../../../../../assets/neimeng/fixed-camera-online.png)
    no-repeat center center;
  background-size: 100% 100%;

  &.alarm {
    background: url(../../../../../assets/neimeng/camera-alerm.png) no-repeat
      center center;
    background-size: 100% 100%;
  }

  &.offline {
    background: url(../../../../../assets/neimeng/camera-offline.png) no-repeat
      center center;
    background-size: 100% 100%;
  }

  &.selected {
    background: url(../../../../../assets/neimeng/fixed-camera-selected.png)
      no-repeat center center;
    background-size: 100% 100%;
  }

  .shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    left: 0;
    top: 0;
  }
  .shadow-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    background: url(../../../../../assets/neimeng/shadow.png) no-repeat center
      center;
    background-size: 100% 100%;
    left: 0px;
    bottom: -24px;
  }
}

// 球机 - start
.ptz-camera-icon {
  width: 32px;
  height: 32px;
  position: relative;
  background: url(../../../../../assets/neimeng/ptz-camera-online.png) no-repeat
    center center;
  background-size: 100% 100%;

  &.alarm {
    background: url(../../../../../assets/neimeng/camera1-alerm.png) no-repeat
      center center;
    background-size: 100% 100%;
  }

  &.offline {
    background: url(../../../../../assets/neimeng/camera1-offline.png) no-repeat
      center center;
    background-size: 100% 100%;
  }

  &.selected {
    background: url(../../../../../assets/neimeng/ptz-camera-selected.png)
      no-repeat center center;
    background-size: 100% 100%;
  }

  .shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    left: 0;
    top: 0;
  }
  .shadow-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    background: url(../../../../../assets/neimeng/shadow.png) no-repeat center
      center;
    background-size: 100% 100%;
    left: 0px;
    bottom: -24px;
  }
}

.checkpoint-icon {
  width: 32px;
  height: 32px;
  position: relative;
  background: url(../../../../../assets/neimeng/checkpoint-online.png) no-repeat
    center center;
  background-size: 100% 100%;

  &.alarm {
    background: url(../../../../../assets/neimeng/checkpoint-alert.png)
      no-repeat center center;
    background-size: 100% 100%;
  }

  &.offline {
    background: url(../../../../../assets/neimeng/checkpoint-offline.png)
      no-repeat center center;
    background-size: 100% 100%;
  }

  &.selected {
    background: url(../../../../../assets/neimeng/checkpoint-selected.png)
      no-repeat center center;
    background-size: 100% 100%;
  }

  .shadow {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    left: 0;
    top: 0;
  }
  .shadow-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    background: url(../../../../../assets/neimeng/shadow.png) no-repeat center
      center;
    background-size: 100% 100%;
    left: 0px;
    bottom: -24px;
  }
}
// 相机正常态 - end

.leaflet-editing-icon1 {
  width: 32px;
  height: 32px;
  background: url(../../../../../assets/neimeng/location.png) no-repeat center
    center;
  background-size: 100% 100%;
}

.leaflet-editing-icon2 {
  width: 20px;
  height: 20px;
  background: url(../../../../../assets/neimeng/location1.png) no-repeat center
    center;
  background-size: 100% 100%;
}

.control-panel {
  position: absolute;
  right: 100px;
  top: 150px;
  z-index: 999;
}

@keyframes wxBlinking {
  from {
    width: 40px;
    height: 40px;
    opacity: 0.2;
  }

  to {
    width: 43px;
    height: 43px;
    opacity: 1;
  }
}

.blinking {
  animation: wxBlinking 1s infinite alternate;
}

// .leaflet-top .leaflet-control {
//   margin-top: 40vh;
// }

.leaflet-control-minimap {
  border: 2px solid rgba(61, 120, 202, 1);
  border-radius: 50%;
}

.leaflet-container {
  background: #05192b;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.map-con {
  width: 100%;
  height: 100%;
}

#map {
  width: 100%;
  height: 100%;
}

.hello {
  position: relative;
}

.level-control {
  position: fixed;
  z-index: 99999;
  top: 50%;
  right: 90px;
  transform: translateY(-50%);
  height: 300px;
  border-right: 1px solid;
  border-image: linear-gradient(
      180deg,
      rgba(25, 216, 255, 0),
      rgba(25, 216, 255, 1),
      rgba(25, 216, 255, 0)
    )
    1 1;
  @include flex(center, center);
  flex-direction: column;
}

.level-control div {
  height: 50px;
  line-height: 50px;
  padding: 0 12px;
  cursor: pointer;
  font-size: 14px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  width: 100%;
  text-align: right;
}
.level-control div.active {
  font-size: 24px;
  text-shadow: 0px 0px 10px #18d0f6;
}
</style>

<style>
.map-filter-ctn {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 999;
}
.sr-only {
  display: none;
}
.operation-btns {
  position: absolute; /* 绝对定位 */
  top: 10px; /* 从上面10px的位置开始 */
  right: 10px; /* 从右边10px的位置开始 */
  z-index: 1000; /* 保证按钮在地图上方 */
}

.operation-btns button {
  margin: 0 5px; /* 如果您想让按钮之间有一些间隔 */
}

.my-div-icon {
  background-color: rgba(0, 0, 0, 0.6); /* 半透明黑色*/
  width: 200px;
  color: white; /* 文字颜色*/
  padding: 5px; /* 周围留白*/
  border-radius: 5px; /* 圆角*/
  max-width: 400px; /*或你认为合适的其他值 */
  white-space: normal;
  clear: both;
  /* ... 其他样式属性 ... */
}
</style>
