<template>
  <div class="map-con">
    <div id="map"></div>
    <MapMeasureDistance @polyline="measurePolyline" @showMeasurements="showMeasurements" @hideMeasurements="hideMeasurements"></MapMeasureDistance>
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

    <div class="map-filter-ctn">
      <filter-comp :allDevicesData="markerListData" @focusDeviceChange="handleFocusDeviceChange" />
    </div>

    <div class="sel-divice-outer">
      <div class="sel-divice-ctn" v-if="leftClose">
        <div style="padding: 20px">
          <el-radio-group v-if="false" v-model="selectedDevice" size="medium" class="radio-group-ctn">
            <el-radio-button v-for="item in deviceArr" :label="item.code" :key="item.code">{{ item.name }}</el-radio-button>
          </el-radio-group>
          <device-table :tableData="selectedDevices" ref="deviceTable" @cancelSel="cancelSel" />
        </div>

        <div class="footer-btns">
          <span class="confirm-btn" @click="showVideoOnWall">上墙</span>
        </div>
      </div>

      <span class="expend-btn" :class="{ 'close-btn': leftClose }" @click="leftClose = !leftClose"></span>
    </div>
    <!-- Area Grid Dialog -->
    <AeraGridDialog v-model="editedGrid" :visible.sync="aeraGridDialogVisible" ref="aeraGridDialog" />
    <div id="contextMenu" class="context-menu" ref="contextMenu">
      <ul>
        <li @click="handleMenuRefresh">刷新</li>
        <!-- Add more options as needed -->
      </ul>
    </div>
  </div>
</template>

<script>
import AddDialog from "./add-dialog.vue";
import FilterComp from "./filter-comp.vue";
import DeviceTable from "./device-table.vue";
import AeraGridDialog from "../../../manager/device/components/AeraGridDialog.vue";
import MapMeasureDistance from "./MapMeasureDistance.vue";

import { cameraWithLoc, queryMapMarker, fetchAreaGrids } from "@/api/neimeng";
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

import { isValidJSONObjectOrArray } from "@/utils/validate";

export default {
  name: "Map",
  mixins: [cameraMarker],
  components: {
    AddDialog,
    FilterComp,
    DeviceTable,
    AeraGridDialog,
    MapMeasureDistance,
  },
  data() {
    return {
      leftClose: false,
      selectedDevice: "camera", //当前选中的设备
      deviceArr: [
        {
          code: "camera",
          name: "摄像头",
        },
        {
          code: "kakou",
          name: "卡口",
        },
        {
          code: "faceId",
          name: "人脸识别",
        },
        {
          code: "fastDoor",
          name: "速通门",
        },
      ],
      settingLatlng: {},
      cameraType: 0,
      levelMaps,
      selectedPoint: {}, // 保存选中的点位的坐标数据
      levelControlShow: false,
      map: null,
      minMap: null,
      buildLabelArr: [],
      selectedMapPoints: {}, // 保存选中的点位的坐标数据
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
      mapStatus: {
        isDrawing: false,
        isEditing: false,
        isMeasuring: false,
      },
      overLayer: {
        polylines: [],
        polygons: [],
        measurements: [],
      },
      tempGp: {
        lineNode: [],
        lineNodeLen: 0,
        tempLine: null,
        tempNode: [],
      },
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
    tableData() {
      let _data = this.deviceData[this.selectedDevice];
      if (!_data) {
        return [];
      }
      return _data.filter(item => {
        return this.selectedDevices.includes(item.cameraCode);
      });
    },
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
    this.fetchCaremList(); // 获取摄像头列表
    this.fetchAreaGridList();
    this.$nextTick(() => {
      this.initMap();
    });
  },
  beforeDestroy() {
    this.map && this.map.remove();
    // 取消订阅
    // if (this.$commandSocket) {
    //         if (this.$commandSocket.readyState == window.WebSocket.OPEN) {
    //             this.$commandSocket.send('{ "context": "unsubscribe", "subject": "Home" }');
    //         }
    //     }
  },
  methods: {
    cancelSel(row) {
      const { cameraCode } = row;
      this.selectedDevices = this.selectedDevices.filter(item => {
        return item != cameraCode;
      });
    },

    fetchCaremList() {
      queryMapMarker({}).then(res => {
        if (res.data) {
          this.drawMaker(res.data); // 开始渲染
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
      // 配置完成后清空， 刷新
      this.stopDraw();

      this.fetchCaremList(); // 获取摄像头列表
    },
    showAddForm() {
      this.$refs.addDialog.show();
    },

    initMap() {
      // 初始化加载底图
      this.loadMap();
      // 鹰眼地图
      this.loadMiniMap();
      // 加载 geojson
      this.loadRoad("road.json", "#0562b2", 1); // 加载路网
      this.loadRoad("env.json", "#034e89", 0.8); // 加载绿化

      this.loadInitialBuildingPlans(); // 加载建筑首层

      this.loadInitialBuildingFloors(); // 初始化加载楼层数据
    },
    changeLevel(item) {
      console.log("item:", item);
      this.changeLayer(item, this.currentLevel);
      this.currentLevel = item;
    },
    changeLayer(newLevel, oldLevel) {
      let newLayers =
        this.floorLayerMaps[this.currentBuild] &&
        this.floorLayerMaps[this.currentBuild][newLevel]
          ? this.floorLayerMaps[this.currentBuild][newLevel]
          : [];
      let oldLayers =
        this.floorLayerMaps[this.currentBuild] &&
        this.floorLayerMaps[this.currentBuild][oldLevel]
          ? this.floorLayerMaps[this.currentBuild][oldLevel]
          : [];

      if (oldLayers && oldLayers.length) {
        this.clearLayers(oldLayers);
      }
      if (newLayers && newLayers.length) {
        this.addLayers(newLayers);
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

      //添加地图距离面积测量工具
      // var measureControl = new L.control.measure({
      //   position: "topleft",
      //   primaryLengthUnit: "meters",
      //   secondaryLengthUnit: "kilometers",
      //   primaryAreaUnit: "sqmeters",
      //   secondaryAreaUnit: "hectares",
      // });
      // measureControl.addTo(map);

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

      // L.NewPolygonControl = L.EditControl.extend({
      //   options: {
      //     position: "topleft",
      //     callback: map.editTools.startPolygon,
      //     editLayer: this.gridFeatureGroup,
      //     kind: "polygon",
      //     html: "▰",
      //   },
      // });

      // L.BoxControl = L.EditControl.extend({
      //   options: {
      //     position: "topleft",
      //     callback: map.editTools.startRectangle,
      //     editLayer: null,
      //     kind: "box",
      //     html: "Box",
      //   },
      // });

      // map.addControl(new L.NewPolygonControl());
      // map.addControl(new L.BoxControl());

      this.map = map;
      // 添加点击事件获取坐标
      // 监听 mouseup 事件
      // 鼠标左击获取点坐标
      // map.on('click', (e) => {
      //     let latlng = e.latlng;
      //     console.log(latlng);// {lat: 30.59, lng: 114.32}
      // });
      // 鼠标右击添加点位
      map.on("contextmenu", e => {
        let point = e.latlng;
        this.selectedPoint = point;
        this.showContextMenu(e);
      });

      map.on("measurestart", event => {
        console.log("measurestart event:", event);
        this.mapStatus.isMeasuring = true;
      });

      map.on("click", event => {
        this.hideContextMenu();

        if (
          !this.mapStatus.isDrawing &&
          !this.mapStatus.isEditing &&
          !this.mapStatus.isMeasuring
        ) {
          console.log("map click event:", event);
          if (typeof this.currentBuild !== undefined) {
            map.fitBounds(this.campusLayer.getBounds());
            this.currentLevel = undefined;
          }
        }
      });

      // 取消 mouseup 事件。注意：如果 mouseup 多次添加监听，该方式会删除全部的监听
      // map.off('mouseup');
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
              buildingItem.name &&
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
    loadData(jsonPath, buildName, levelName) {
      axios.get("neimeng/" + jsonPath).then(res => {
        const data = res.data;
        let style = {
          weight: 4, //外边框宽度
          opacity: 1, //外边框透明度
          color: "#00c7ff", //外边框颜色
          fillOpacity: 0.6, //填充透明度
          fillColor: "#0b6dd1", //填充的颜色
        };
        if (buildName) {
          style = {
            weight: 4, //外边框宽度
            opacity: 1, //外边框透明度
            color: "rgba(2, 226, 255, 1.000)", //外边框颜色
            fillOpacity: 1, //填充透明度
            fillColor: "#0b6dd1", //填充的颜色
          };
        }
        var lakeLayer = L.geoJson(data, {
          style,
          onEachFeature: (feature, layer) => {
            //对每个小块进行定义
            // console.log('feature:', feature);
            //显示文字

            var content = `
            <div class="build-name-label">
              <span class="build-icon"></span>
              ${feature.properties["用途"]}
            </div>`;

            var myIcon = L.divIcon({
              html: content,
              className: "my-div-icon",
            });

            //中心点位
            let marker = L.marker(layer.getBounds().getCenter(), {
              icon: myIcon,
            });
            // this.map.addLayer(marker);
            // this.floorLayerMaps[buildName][levelName].push(marker);

            layer.on({
              //鼠标移入方法
              mouseover: e => {
                this.addLayers([marker]);
                this.clearLayers(this.buildLabelArr);
              },
              //鼠标移出方法
              mouseout: e => {
                this.clearLayers([marker]);
                this.addLayers(this.buildLabelArr);
              },
              //点击方法，变色
              click: e => {
                var layer = e.target;
                this.fitBounds(layer, 18);
              },
            });
          },
        });

        if (buildName) {
          this.floorLayerMaps[buildName][levelName].push(lakeLayer);

          // lakeLayer.on({
          //     //点击方法，变色
          //     click: ((e) => {
          //         // 显示楼层控制按钮
          //         this.levelControlShow = true;

          //         // var layer = e.target;
          //         // this.fitBounds(layer, 19);
          //     }),

          // });
        } else {
          lakeLayer.addTo(this.map);
          // lakeLayer.on({
          //     //点击方法，变色
          //     click: ((e) => {
          //         // 显示楼层控制按钮
          //         this.levelControlShow = true;

          //         // var layer = e.target;

          //         // this.fitBounds(layer, 19);
          //     }),
          // });
        }
      });
    },

    fitBounds(layer, zoom) {
      // layer.bringToFront();
      //定位到该图层
      this.map.fitBounds(layer.getBounds(), {
        // maxZoom: 28,
        // animate: true,
        // duration: 10
      });

      // this.map.setZoom(zoom);
    },

    showVideoOnWall() {
      let devicesOnWall = this.selectedDevices.map(item => {
        return {
          code: item.code,
          type: item.type,
        };
      });
      let commandMessage = {
        context: "command",
        subject: "Home",
        action: "showVideoOnWall",
        data: {
          devices: devicesOnWall,
        },
      };
      this.sendMsg(commandMessage);
    },
    sendMsg(commandMessage) {
      if (this.$commandSocket) {
        if (this.$commandSocket.readyState == window.WebSocket.OPEN) {
          this.$commandSocket.send(JSON.stringify(commandMessage));
        }
      }
    },
    handleFocusDeviceChange(deviceCode) {
      console.log("handleFocusDeviceChange:", deviceCode);
      const focusMarker = this.markerListData.find(marker => {
        return marker.code === deviceCode;
      });
      if (focusMarker) {
        this.map.setView([focusMarker.latitude, focusMarker.longitude], 22);
        this.currentBuild = focusMarker.building;
        if (this.currentBuild) {
          this.levelControlShow = true;
        }
        this.currentLevel = focusMarker.floor;
      }
    },
    showContextMenu(e) {
      const contextMenu = this.$refs.contextMenu;

      // Get the map container's position
      const containerPos = this.map.getContainer().getBoundingClientRect();

      // Calculate the correct position
      const x = e.containerPoint.x + containerPos.left;
      const y = e.containerPoint.y + containerPos.top;

      contextMenu.style.display = "block";
      contextMenu.style.left = x + "px";
      contextMenu.style.top = y + "px";
    },
    hideContextMenu() {
      this.$refs.contextMenu.style.display = "none";
    },
    handleMenuRefresh() {
      this.hideContextMenu();
      this.selectedDevices = [];
      this.zoomToLayer(this.campusLayer);
      console.log(this.markerListData);
    },
    drawOn() {
      this.clearTemps();
      this.map.doubleClickZoom.disable();

      // 移除监听地图事件
      this.map.off("click");
      this.map.off("mousemove");
      this.map.off("dblclick");
    },
    drawOff() {
      // 移除监听地图点击事件
      this.map.off("click");
      this.map.off("mousemove");
      this.map.off("dblclick");
      this.map.doubleClickZoom.enable();

      // 复原鼠标平移样式
      // this.$utils.map.removerCoursorStyle(this.map);
    },
    clearTemps() {
      // 清空面中间数据
      this.tempGp.lineNode = [];
      this.tempGp.lineNodeLen = 0;
      if (this.tempGp.tempLine) this.tempGp.tempLine.remove();
      this.tempGp.tempNode.map(el => el.remove());
    },
    measurePolyline() {
      // this.$utils.map.addCursorStyle(this.map, "crosshare-cursor");
      this.drawOn();

      let tempPolygonOpts = {
        color: "rgba(255, 0, 0, 0.85)",
        weight: 3,
        opacity: 0.85,
        // 添加量测信息属性，并开启
        showMeasurements: true,
        // 根据需要设置量测显示的参数
        measurementOptions: { minDistance: 500 },
      };

      let finalPolygonOpts = {
        color: "rgba(0, 255, 0, 0.85)",
        weight: 3,
        opacity: 0.85,
        // 同上
        // 添加量测信息属性，并开启
        showMeasurements: true,
        // 根据需要设置量测显示的参数
        measurementOptions: { minDistance: 500 },
      };
      this.map.on("click", evt => {
        this.tempGp.lineNode.push([evt.latlng.lat, evt.latlng.lng]);
        this.tempGp.tempNode.push(this.addNode(evt.latlng, this.map));
        this.tempGp.lineNodeLen = this.tempGp.lineNode.length;
      });

      this.map.on("mousemove", evt => {
        if (this.tempGp.lineNodeLen >= 1) {
          if (this.tempGp.tempLine) this.tempGp.tempLine.remove();
          this.tempGp.lineNode[this.tempGp.lineNodeLen] = [
            evt.latlng.lat,
            evt.latlng.lng,
          ];

          this.tempGp.tempLine = L.polyline(
            this.tempGp.lineNode,
            tempPolygonOpts
          );
          this.tempGp.tempLine.addTo(this.map);
        }
      });

      this.map.on("dblclick", () => {
        let polyline = L.polyline(this.tempGp.lineNode, finalPolygonOpts);
        polyline.addTo(this.map);
        this.overLayer.polylines.push(polyline);
        this.clearTemps();
      });
    },
    addNode(latlng, map) {
      let node = L.icon({
        iconUrl: require("@/assets/neimeng/node.png"),
        iconSize: [10, 10],
      });

      node = L.marker(latlng, {
        icon: node,
      });
      node.addTo(map);
      return node;
    },
    showMeasurements() {
      this.overLayer.polylines.map(el => el.showMeasurements());
    },
    hideMeasurements() {
      this.overLayer.polylines.map(el => el.hideMeasurements());
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
.radio-group-ctn {
  margin-bottom: 10px;
  .el-radio-button__orig-radio:checked + .el-radio-button__inner {
    background-color: #05213a;
    border-color: #00c4ff;
    font-size: 14px;
    color: #00c4ff;
  }
  .el-radio-button__inner {
    height: 36px;
    background: #05213a;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #ffffff;
    border-color: #2e415d;
  }
}
.expend-btn {
  position: absolute;
  cursor: pointer;
  width: 21px;
  height: 84px;
  background: url(../../../../../assets/neimeng/open-icon.png) no-repeat center
    center;
  background-size: 100% 100%;
  top: 50%;
  transform: translateY(-50%);
  right: -26px;

  &.close-btn {
    background: url(../../../../../assets/neimeng/close-icon.png) no-repeat
      center center;
    background-size: 100% 100%;
  }
}
.sel-divice-outer {
  position: absolute;
  height: calc(100% - 100px);
  left: 0;
  bottom: 0;
  z-index: 99999;

  .footer-btns {
    height: 50px;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    border-top: 1px solid #2e415d;
    @include flex(flex-end, center);
    gap: 10px;
    padding-right: 20px;

    span {
      width: 80px;
      text-align: center;
      height: 30px;
      line-height: 30px;
      border-radius: 2px;
      border: 1px solid;
      border-image: linear-gradient(
          180deg,
          rgba(85, 150, 205, 1),
          rgba(85, 150, 205, 0.59)
        )
        1 1;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #ffffff;

      cursor: pointer;

      &.confirm-btn {
        background: linear-gradient(
          180deg,
          #0e3497 0%,
          rgba(85, 150, 205, 0) 100%
        );
        border-image: linear-gradient(
            180deg,
            rgba(85, 150, 205, 1),
            rgba(85, 150, 205, 0.59)
          )
          1 1;
      }
    }
  }

  .sel-divice-ctn {
    padding-bottom: 55px;
    width: 455px;
    height: 100%;
    background: #05213a;
    border: 1px solid #2e415d;
  }
}
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
  pointer-events: none;
  top: -4em;

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
  width: 40px;
  height: 40px;
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

.leaflet-top .leaflet-control {
  margin-top: 40vh;
}

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
.imosSdk-video {
  widows: 100% !important;
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
.context-menu {
  display: none;
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 1000;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
}

.context-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.context-menu li {
  padding: 8px 12px;
  cursor: pointer;
}

.context-menu li:hover {
  background-color: #e5e5e5;
}
</style>
