<template>
  <div class="part-con scale">
    <div class="part-head">
      <span class="time-txt">{{ dateNewTime }}</span>
    </div>
    <div class="part-main" v-if="false">
      <div class="art-section" style="margin-bottom: 20px">
        <div class="art-section-head">
          <p class="art-section-title">事件报警视频回放窗口</p>
        </div>
        <div class="section-main event-v-outer" style="height: 500px">
          <div class="event-video-info">
            <p class="event-title">事件报警</p>
            <div class="event-info-item">
              <span class="event-i-label">类型</span>
              <span class="event-i-val">一般事件</span>
            </div>
            <div class="event-info-item">
              <span class="event-i-label">类型</span>
              <span class="event-i-val">一般事件</span>
            </div>
            <div class="event-info-item">
              <span class="event-i-label">时间</span>
              <span class="event-i-val">2023.6.20 12:00:00</span>
            </div>
            <div class="event-info-item">
              <span class="event-i-label">地点</span>
              <span class="event-i-val">图书馆</span>
            </div>
            <div class="event-info-item">
              <span class="event-i-label">状态</span>
              <span class="event-i-val">未处理</span>
            </div>
            <p class="event-info-txt">
              内容描述文字内容描述文字内容描述文字内容描述文字内容描述文字内容描述文字内容描述文字
              内容描述文内容描述文字内容描述文字内容描述文字内容描述文字内容描述文字内容描述文字内
              容描述文字内容描述文字内容描述文字内容描述文字内容描述文字内容
            </p>
          </div>
          <div class="event-video-con">
            <video
              src="https://lmg.jj20.com/up/allimg/4k/s/02/2109250006343S5-0-lp.jpg"
              controls="controls"
              autoplay="false"
              poster="../../../../assets/neimeng/postar.png"
            >您的浏览器不支持 video 标签。</video>
          </div>
        </div>
      </div>
      <div class="art-section">
        <div class="art-section-head">
          <p class="art-section-title">关注摄像头视频播放窗口</p>
        </div>
        <div class="section-main" style="height: 337px">
          <ul class="comm-video-lists">
            <li v-for="item in 12" :key="item"></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="part-main">
      <!-- <div class="art-section" style="margin-bottom: 20px">
        <div class="art-section-head">
          <p class="art-section-title">关注摄像头视频播放窗口</p>
        </div>
        <div class="section-main" style="height: 337px">
          <ul class="comm-video-lists">
            <li v-for="item in 7" :key="item">
              <CameraCell :code="wallCameraCode" :showControl="true" />
            </li>
          </ul>
        </div>
      </div>-->
      <div class="art-section" style="margin-bottom: 20px">
        <div class="art-section-head">
          <p class="art-section-title">关注摄像头视频播放窗口</p>
        </div>
        <div class="section-main" style="height: 337px">
          <ul class="comm-video-lists">
            <li v-for="item in displayDeviceList" :key="item.code || 'placeholder'">
              <CameraCell v-if="!item.placeholder" :code="item.code" :showControl="true" />
              <div v-else class="placeholder-image">
                <img src="../../../../assets/neimeng/postar.png" alt="Placeholder" />
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="art-section">
        <div class="art-section-head">
          <p class="art-section-title">摄像头视频滚动播放窗口</p>
        </div>
        <div class="section-main footer-con" style="height: 500px">
          <i
            class="el-icon-arrow-left page-arr"
            @click="prePageChange"
            :style="{
              opacity: page <= 1 ? '0.3' : '1',
              cursor: page <= 1 ? 'not-allowed' : 'pointer',
            }"
          ></i>

          <ul class="comm-video-lists">
            <li v-for="item in cameraCodeArr" :key="item.cameraCode" :ref="'forVideo' + item.cameraCode">
              <CameraCell :code="item.cameraCode" :showControl="true" />
            </li>
          </ul>

          <i
            class="el-icon-arrow-right page-arr"
            @click="nextPageChange"
            :style="{
              opacity: page >= totalPage ? '0.3' : '1',
              cursor: page >= totalPage ? 'not-allowed' : 'pointer',
            }"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cameraList } from "@/api/neimeng";
import CameraCell from "@/components/CameraCell";
import { WebSocketEvents } from "@/utils/eventName";
import { isValidJSON, isValidJSONObjectOrArray } from "@/utils/validate";

export default {
  components: {
    CameraCell,
  },
  data() {
    return {
      val: "",
      scale: "1,1",
      dateNewTime: "",
      page: 1,
      pageSize: 8,
      totalPage: 1,
      cameraCodeArr: [],
      wallCameraCode: "",
      devicelist: [],
    };
  },
  created() {
    this.$eventHub.$on(WebSocketEvents.MESSAGE, this.handleWebSocketMessage);
  },
  methods: {
    handleWebSocketMessage(ev) {
      //判断是否为Json格式
      if (isValidJSONObjectOrArray(ev.data)) {
        const message = JSON.parse(ev.data);
        console.log("Recieve WebSocket Message: ", message);
        let { context, subject, action, data } = message;
        this.devicelist = data.devices;
      }
    },
    recieveMsg() {
      // if (this.$commandSocket) {
      //   const that = this;
      //   this.$commandSocket.onmessage = function (ev) {
      //     // 返回数据
      //     const { commandCode, subject } = JSON.parse(ev.data);
      //     that.wallCameraCode = subject;
      //     console.log("recieveData", that.wallCameraCode);
      //     // if (
      //     //   data.code === 0 &&
      //     //   data.message == "OK" &&
      //     //   (data.context == "subscribe" || data.context == "Home")
      //     // ) {
      //     //   //
      //     // }
      //   };
      // }
    },
    prePageChange() {
      if (this.page <= 1) {
        return false;
      }
      this.page = this.page - 1;
      this.fetchCameraList();
    },
    nextPageChange() {
      if (this.page >= this.totalPage) {
        return false;
      }

      this.page = this.page + 1;
      this.fetchCameraList();
    },
    initData() {
      this.fetchCameraList();
    },

    fetchCameraList() {
      cameraList({ page: this.page, pageSize: this.pageSize }).then(res => {
        this.cameraCodeArr = res.data.record || [];
        this.totalPage = res.data.totalPage;
      });
    },
    fillZero(str) {
      var realNum;
      if (str < 10) {
        realNum = "0" + str;
      } else {
        realNum = str;
      }
      return realNum;
    },
    getTime() {
      let myDate = new Date();
      let myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      let myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      let myToday = myDate.getDate(); //获取当前日(1-31)
      let myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
      let myHour = myDate.getHours(); //获取当前小时数(0-23)
      let myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
      let mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
      let nowDate, nowTime;
      let dayArr = ["天", "一", "二", "三", "四", "五", "六"];

      nowDate =
        myYear +
        "年" +
        this.fillZero(myMonth) +
        "月" +
        this.fillZero(myToday) +
        "日" +
        " 星期" +
        dayArr[myDay] +
        "  " +
        this.fillZero(myHour) +
        ":" +
        this.fillZero(myMinute) +
        ":" +
        this.fillZero(mySecond);
      this.dateNewTime = nowDate;
    },
    resize() {
      let e = window.innerWidth;
      let o = window.innerHeight;
      let i = (e / 1920).toFixed(2) + "," + (o / 1080).toFixed(2);
      let scaleDom = document.querySelector(".scale");
      scaleDom.style.transform = "scale(" + i + ")";
      this.scale = i;
    },
  },
  mounted() {
    this.resize();
    window.addEventListener("resize", this.resize);
    this.getTime();
    this.timer = setInterval(this.getTime, 1000);
    this.$nextTick(this.initData);
    // this.recieveMsg();
  },
  computed: {
    displayDeviceList() {
      let count = this.devicelist.length;

      // 如果数量是奇数，+1
      if (count % 2 !== 0) {
        count++;
      }

      // 如果数量大于16，设置为16
      if (count > 16) {
        count = 16;
      }

      // 创建一个新数组来填充
      let result = [];

      for (let i = 0; i < count; i++) {
        if (i < this.devicelist.length) {
          if (this.devicelist[i].code === undefined) {
            console.log("-----this.devicelist[i]------", this.devicelist[i]);
            let code = this.devicelist[i];
            let index = i;
            result.push({ code, index });
          } else {
            result.push(this.devicelist[i]);
          }
        } else {
          result.push({ placeholder: true }); // 这是一个占位对象，您可以根据需要进行更改
        }
      }

      console.log("-----result------", result);
      return result;
    },
  },
};
</script>

<style lang="scss">
.comm-video-lists li {
  * {
    max-height: 100%;
  }
}
</style>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.page-arr {
  font-size: 38px;
  color: #ffffff;
  position: absolute;
  top: 230px;
  cursor: pointer;

  &.el-icon-arrow-left {
    left: 10px;
  }

  &.el-icon-arrow-right {
    right: 10px;
  }
}

.footer-con {
  position: relative;
}

.footer-con {
  .comm-video-lists li {
    height: 230px;
  }
}

.comm-video-lists {
  padding: 0 35px;
  @include flex(center, center);
  flex-wrap: wrap;
  gap: 20px;
  padding-top: 10px;

  p {
    margin: 0;
  }

  .video-time {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 20px;
    position: absolute;
    bottom: 5px;
    right: 5px;
  }

  .video-location {
    position: absolute;
    left: 10px;
    top: 5px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    line-height: 20px;
  }

  li {
    width: 410px;
    height: 146px;
    position: relative;

    video,
    canvas {
      width: 100%;
      height: 100%;
    }
  }
}

.event-info-txt {
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #ffffff;
  line-height: 40px;
  text-align: justify;
}

.event-info-item {
  @include flex(space-between, center);
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  color: #ffffff;
  line-height: 22px;
  margin-bottom: 18px;
}

.event-title {
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #e5fafd;
  background: linear-gradient(180deg, #eeeeee 0%, #68dbff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  margin-bottom: 20px;
}

.event-video-con {
  width: 997px;
  height: 561px;
  position: relative;
  top: -31px;

  video {
    width: 100%;
    height: 100%;
  }
}

.event-video-info {
  width: 741px;
  height: 449px;
  background: linear-gradient(
    180deg,
    rgba(2, 104, 178, 0) 0%,
    rgba(21, 106, 211, 0.22) 100%
  );
  margin-left: 46px;
  padding: 30px 34px 0 34px;
}

.event-v-outer {
  @include flex(space-between, center);
}

.part-main {
  padding: 20px 45px;
}

.part-con {
  width: 1920px;
  height: 1080px;
  transform-origin: top left;
}

.part-head {
  height: 91px;
  background: linear-gradient(
    180deg,
    rgba(34, 146, 235, 0) 0%,
    rgba(28, 156, 255, 0.5) 100%
  );
  backdrop-filter: blur(10px);

  background-image: url(../../../../assets/neimeng/title.png);
  background-position: right -73px;

  @include flex(flex-end, flex-start);
  padding-right: 42px;
  padding-top: 19px;

  .time-txt {
    font-size: 20px;
    font-family: Menlo;
    font-weight: 400;
    color: #74b0e4;
  }
  .comm-video-lists {
    display: flex;
    flex-wrap: wrap; /* 允许元素换行 */
    justify-content: start; /* 从左边开始排列 */
    list-style-type: none; /* 移除列表样式 */
    padding: 0; /* 移除默认的内边距 */
  }

  .comm-video-lists > li {
    flex: 0 0 25%; /* 每个项目占用容器的四分之一空间，确保每行有4个项目 */
    max-width: 25%; /* 设置最大宽度为容器的四分之一 */
    box-sizing: border-box; /* 包括边框和内边距在宽度内 */
    padding: 10px; /* 为每个摄像头单元提供一些空间 */
  }
  .placeholder-image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #f4f4f4;
  }

  .placeholder-image img {
    // max-width: 100%;
    height: 168px;
  }
}
</style>
