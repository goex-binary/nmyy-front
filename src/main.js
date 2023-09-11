// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/styles/index.scss"; // global css
import router from "./router";
import store from "./store";
import _ from "lodash";
// import './permission' // permission control
import "vue-orgchart/dist/style.min.css";
import html2canvas from "html2canvas";
import "font-awesome/css/font-awesome.min.css";
// use
Vue.prototype._ = _;
window.html2canvas = html2canvas;

import Socket from "@/utils/socket.js";
import webSocketPlugin from "./utils/webSocketPlugin";
Vue.use(webSocketPlugin);

import Camera from "@/utils/initCamera.js";
new Camera();

import moment from "moment";
Vue.prototype.$moment = moment;
moment.locale("zh-cn");

Vue.use(ElementUI);
Vue.config.productionTip = false;

import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.pm";
import "leaflet.pm/dist/leaflet.pm.css";
import "leaflet-draw/dist/leaflet.draw.css";
Vue.L = Vue.prototype.L = L;
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import "leaflet-editable";
import "leaflet-measure-path";
import "leaflet-measure-path/leaflet-measure-path.css";

import CameraCell from "@/utils/createCamera";

L.CustomPopup = L.Popup.extend({
  options: {
    code: "",
    cameraCell: null,
  },
  _initLayout: function () {
    console.log("hahahah:", this.options);
    var prefix = "leaflet-popup",
      container = (this._container = L.DomUtil.create(
        "div",
        prefix + " " + (this.options.className || "") + " leaflet-zoom-animated"
      ));

    var wrapper = container;
    this._contentNode = L.DomUtil.create("div", prefix + "-content", wrapper);

    L.DomEvent.disableClickPropagation(wrapper)
      .disableScrollPropagation(this._contentNode)
      .on(wrapper, "contextmenu", L.DomEvent.stopPropagation);
  },

  onRemove: function (map) {
    L.Popup.prototype.onRemove.call(this, map);
    map.fire("popupclose", { popup: this });

    console.log("onRemove:   onRemove", this.options.code);
    if (!this.options.cameraCell) {
      this.options.cameraCell.stopPlay();
      this.options.cameraCell = null;
    }
  },

  onAdd: function (map) {
    L.Popup.prototype.onAdd.call(this, map);
    map.fire("popupopen", { popup: this });

    this.options.cameraCell = new CameraCell(this.options.code);
    console.log("onAdd:   onAdd", this.options.code);
  },
});

// add bindCustomPopup
L.Layer.include({
  // @method bindPopup(content: String|HTMLElement|Function|Popup, options?: Popup options): this
  // Binds a popup to the layer with the passed `content` and sets up the
  // neccessary event listeners. If a `Function` is passed it will receive
  // the layer as the first argument and should return a `String` or `HTMLElement`.
  bindCustomPopup: function (content, options) {
    if (content instanceof L.Popup) {
      L.setOptions(content, options);
      this._popup = content;
      content._source = this;
    } else {
      if (!this._popup || options) {
        this._popup = new L.CustomPopup(options, this);
      }
      this._popup.setContent(content);
    }
    // console.log("options:", options);
    if (!this._popupHandlersAdded) {
      this.on({
        click: this._conditionalOpenPopup,
        remove: this.closePopup,
        move: this._movePopup,
      });
      this._popupHandlersAdded = true;
    }

    return this;
  },
  _conditionalOpenPopup: function (e) {
    if (
      !e.originalEvent.ctrlKey &&
      !e.originalEvent.altKey &&
      !e.originalEvent.shiftKey
    ) {
      this._openPopup(e);
    }
  },
});

// L.DivIcon HTML 标记文本 - 相对于 map 缩放比例
L.FixedSizeMarker = L.Marker.extend({
  options: {
    fontSize: 12, // starting size of icon in pixels
    zoomBase: 1, // Zoom level where fontSize is the correct size
  },
  update: function () {
    if (this._icon && this._icon.tagName === "DIV" && this._map) {
      let scaleBase = this._map.getZoom() - 16;
      let scale = 1 + 7 * scaleBase;
      this._icon.style.fontSize = scale + "px";
    }
    return L.Marker.prototype.update.call(this);
  },
});
L.fixedSizeMarker = (latlng, options) => new L.FixedSizeMarker(latlng, options);

//
L.EditControl = L.Control.extend({
  options: {
    position: "topleft",
    callback: null,
    editLayer: null,
    kind: "",
    html: "",
  },

  onAdd: function (map) {
    var container = L.DomUtil.create("div", "leaflet-control leaflet-bar"),
      link = L.DomUtil.create("a", "", container);

    link.href = "#";
    link.title = "Create a new " + this.options.kind;
    link.innerHTML = this.options.html;
    L.DomEvent.on(link, "click", L.DomEvent.stop).on(
      link,
      "click",
      function () {
        if (this.options.kind === "box") {
          map.editTools.startRectangle(null, this.options);
        } else {
          console.log("editLayer", this.options.editLayer);
          map.addLayer(this.options.editLayer);
          window.LAYER = this.options.callback.call(map.editTools);
        }
      },
      this
    );

    return container;
  },
});

// 拖拽·缩放·画布插件
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
Vue.component("vue-draggable-resizable", VueDraggableResizable);

import * as Echarts5 from "echarts5";
Vue.prototype.$echarts5 = Echarts5;

import "@/assets/font/font.css";
Vue.prototype.$eventHub = new Vue();
/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
