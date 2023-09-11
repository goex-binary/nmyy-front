/**
 * 封装 maker 图标加载方法。
 *  @param map map实例对象
 *  @param markerList 描绘的markder列表数据 （切换楼层或者图标的过滤条件时再数据层处理数据过滤， 然后重新调用渲染marker）
 *  @param selectedList 选中的的markder列表数据， 选中的颜色会不同
 *  @param markerLayer 加载标签的涂层， 用于添加，清空等操作
 *
 * 每次调用渲染之前先清空原有的
 */
import { DEVICE_CONSTANTS } from "@/config/constants";
import { Azimuth } from "@/config/constants";
let cameraMarker = {
  data() {
    return {
      markerLayer: [],
      selectedMarkers: [],
      markerListData: [],
      offlineMarkers: [],
      alarmMarkers: [],
      markerClusterGroup: null, // 为了后面能移除事件绑定
    };
  },
  methods: {
    drawMaker(markerListData) {
      this.markerListData = markerListData;
      this.clearLayers(this.markerLayer);
      this.markerClusterGroup = this.createMarkerCluster();
      let deviceMarkers = markerListData.map(item =>
        this.createDeviceMarker(item)
      );
      this.addMarkersToCluster(deviceMarkers, this.markerClusterGroup);
      console.log("markerClusterGroup:", this.markerClusterGroup);
      this.map.addLayer(this.markerClusterGroup);
      this.markerLayer.push(this.markerClusterGroup);
    },
    createMarkerCluster() {
      return L.markerClusterGroup({
        maxClusterRadius: 20,
        iconCreateFunction: cluster =>
          L.divIcon({
            html: `<div class="cluster-count-circle">${cluster.getChildCount()}</div>`,
            iconSize: [90, 90],
            iconAnchor: [45, 90],
          }),
      });
    },
    addMarkersToCluster(markers, markerClusterGroup) {
      markerClusterGroup.addLayers(markers);
    },
    createDeviceMarker(data) {
      const icon = this.createIcon(data);
      const marker = L.fixedSizeMarker(
        new L.LatLng(data["latitude"], data["longitude"]),
        {
          title: data.name,
          icon,
          fontSize: 24,
          zoomBase: 1,
          rotationAngle: 0,
          rotationOrigin: "center center",
        }
      );

      marker.bindCustomPopup(this.createPopupContent(data), {
        code: data.code,
      });

      marker.on("popupopen", this.handlePopupOpen);
      return marker;
    },

    handlePopupOpen(event) {
      const popupContent = event.popup._contentNode;
      console.log("------event:PopupOpen-------:", event);

      const buttonElems = popupContent.querySelectorAll(".control-btns span");

      buttonElems.forEach(buttonElem => {
        const actionName = buttonElem.className;
        const handler = this.getButtonHandler(actionName);
        if (handler) {
          buttonElem.addEventListener("click", handler);
          buttonElem._handler = handler; // 保存引用以后方便移除
        }
      });
    },
    getButtonHandler(actionName) {
      const actionHandlerMap = {
        preview: this.handlePreview,
        close: this.handleClose,
        select: this.handleSelect,
        unselect: this.handleUnselect,
        playback: this.handlePlayback,
        wall: this.handleWall,
        "alarm-query": this.handleAlarmQuery,
        yuntai: this.handleYuntai,
      };

      return actionHandlerMap[actionName];
    },
    handlePreview(event) {
      // this.preview(event.target.dataset.code);
      console.log("preview:", event.target.dataset.code);
    },
    handleClose(event) {
      this.closePre(event.target.dataset.code);
    },
    handleSelect(event) {
      this.selectedMarkers.push(event.target.dataset.code);
    },
    handleUnselect(event) {
      const deviceCode = event.target.dataset.code;
      this.selectedMarkers = this.selectedMarkers.filter(
        item => item !== deviceCode
      );
    },
    createIcon(data) {
      const { code: deviceCode, type: deviceType, azimuth } = data;
      const selClassName = this.selectedMarkers.includes(deviceCode)
        ? "selected"
        : "";
      const offlineClassName = this.offlineMarkers.includes(deviceCode)
        ? "offline"
        : "";
      const alarmClassName = this.alarmMarkers.includes(deviceCode)
        ? "alarm"
        : "";
      const resultClass = [selClassName, offlineClassName, alarmClassName].join(
        " "
      );

      let deviceIconClass = this.getIconClassByType(deviceType);
      let degreeValue = this.getDegreeByCode(azimuth);
      let shadowSpan = "";

      if (typeof degreeValue !== "undefined") {
        console.log("degreeValue", degreeValue, azimuth);
        let angle = 160 + degreeValue;
        shadowSpan = `<span class='shadow' style='transform: rotate(${angle}deg)'>
                  <span class='shadow-icon'></span>
                </span>`;
      }

      return L.divIcon({
        className: "marker-item",
        html: `<div class="${deviceIconClass} ${resultClass}">
           ${shadowSpan}
         </div>`,
        iconSize: [32, 32],
        shadowSize: [32, 32],
        iconAnchor: [16, 32],
        shadowAnchor: [16, 0],
        popupAnchor: [1, -24],
      });
    },
    createPopupContent(data) {
      const {
        type: deviceType,
        code: deviceCode,
        name: deviceName,
        status: deviceStatus,
        orgName: deviceOrgName,
      } = data;
      const buttonClasses =
        DEVICE_CONSTANTS.DEVICE_ACTIONS[deviceType]?.ACTIONS ||
        DEVICE_CONSTANTS.DEVICE_ACTIONS.DEFAULT.ACTIONS;

      // 获取该设备类型的按钮类到文本的映射
      const buttonMapping =
        DEVICE_CONSTANTS.DEVICE_ACTIONS[deviceType]?.TEXT_MAPPING ||
        DEVICE_CONSTANTS.DEVICE_ACTIONS.DEFAULT.TEXT_MAPPING;

      return `
      <div class="leaflet-popup-content1" style="width: 350px;">
        <div class="tabsContentDiv">
          <div class='camera-info-title'>${deviceName}</div>
          <div class='camera-play-con camera-con${deviceCode}'></div>
          <ul class="node-ul">
            <li><span class="node-label">位置:</span>${deviceOrgName}</li>
            <li><span class="node-label">类型:</span>${
              DEVICE_CONSTANTS.DEVICE_TYPES[deviceType]
            }</li>
            <li><span class="node-label">状态:</span>${
              DEVICE_CONSTANTS.DEVICE_STATUS[deviceStatus]
            }</li>
          </ul>
          <div class="control-btns">
          ${buttonClasses
            .map(
              cls =>
                `<span data-code='${deviceCode}' class='${cls}'>${buttonMapping[cls]}</span>`
            )
            .join("")}
          </div>
        </div>
      </div>`;
    },
    getIconClassByType(deviceType) {
      switch (deviceType) {
        case 1:
          return "fixed-camera-icon";
        case 2:
          return "ptz-camera-icon";
        case 3:
          return "checkpoint-icon";
        default:
          return "fixed-camera-icon";
      }
    },
    getDegreeByCode(code) {
      let matchedEntry = Object.values(Azimuth).find(
        entry => entry.code === code
      );
      return matchedEntry ? matchedEntry.degree : undefined;
    },
  },
  watch: {
    selectedMarkers: {
      handler() {
        this.drawMaker(this.markerListData);
      },
      deep: true,
    },
  },
  mounted() {
    this.$nextTick(() => {
      // this.bindLeafletEvents();
    });
  },
  beforeDestroy() {
    if (this.markerClusterGroup) {
      this.markerClusterGroup.eachLayer(marker => {
        const popupContent = marker.getPopup()._contentNode;
        const buttonElems = popupContent.querySelectorAll(".control-btns span");

        buttonElems.forEach(buttonElem => {
          if (buttonElem._handler) {
            buttonElem.removeEventListener("click", buttonElem._handler);
            delete buttonElem._handler;
          }
        });
      });
      this.markerClusterGroup.off("popupopen", this.handlePopupOpen);
    }
  },
};

export default cameraMarker;
