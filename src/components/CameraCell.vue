<template>
  <div class="camera-cell-box" :ref="key">
    <div class="camera-control-panel">
      <span @click="startCtl">启动云台</span>
      <span @click="releaseCtl">释放云台</span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { vmip } from "@/config/baseUrl";

export default {
  name: "CameraCell",
  props: {
    code: {
      type: String,
      default: "",
    },
    showControl: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      iframeObj: null,
    };
  },
  watch: {
    code() {
      this.stopPlay();
      this.creatWindow();
    },
  },
  computed: {
    key() {
      return `key_${this._uid}`;
    },
  },
  mounted() {
    this.creatWindow();
  },
  beforeDestroy() {
    this.stopPlay();
  },
  methods: {
    getPtzUrl(type) {
      return `http://${vmip}:7010/VIID/ptz/${type}/${this.code}`;
    },
    async releaseCtl() {
      try {
        const response = await axios.post(this.getPtzUrl("release"), null, {
          headers: {
            Authorization: window.token,
            "Content-Type": "application/json",
          },
        });

        if (response.data.ErrCode === 0) {
          console.log("Release PTZ");
        }
      } catch (error) {
        console.error("Error releasing PTZ:", error);
      }
    },
    async startCtl() {
      try {
        const response = await axios.post(this.getPtzUrl("start"), null, {
          headers: {
            Authorization: window.token,
            "Content-Type": "application/json",
          },
        });

        if (response.data.ErrCode === 0) {
          console.log("Start PTZ");
        }
      } catch (error) {
        console.error("Error starting PTZ:", error);
      }
    },
    stopPlay() {
      if (!window.token) {
        alert("请先登录");
        return;
      }

      if (!this.iframeObj) {
        return;
      }
      imosSdk.playStop(this.iframeObj.id, function (e) {
        console.log(e);
      });
    },
    creatWindow() {
      if (!window.token) {
        return;
      }

      let iframeObj = imosSdk.createPanelWindow();
      this.iframeObj = iframeObj;
      if (iframeObj === null) {
        return;
      }
      iframeObj.cameraCode = this.code;
      this.$nextTick(() => {
        this.$refs[this.key].appendChild(iframeObj);
        this.playLive(iframeObj);
      });
    },
    playLive(iframeObj) {
      if (!window.token) {
        return;
      }
      imosSdk.playLive(
        iframeObj.id,
        iframeObj.cameraCode,
        iframeObj.cameraCode,
        function (e) {
          console.log(e);
        },
        1
      );
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.camera-control-panel {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 999;
  background: rgba($color: #000000, $alpha: 0.5);
  @include flex(center, center);
  gap: 20px;
  padding: 10px;

  span {
    cursor: pointer;
    color: #fff;

    &:hover {
      opacity: 0.7;
    }
  }
}
.camera-cell-box {
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
