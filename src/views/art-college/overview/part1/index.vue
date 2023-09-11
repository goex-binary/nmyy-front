<template>
  <div class="part-con scale">
    <div class="part-head"></div>
    <div class="part-main">
      <div class="part-left">
        <div class="alert-outer">
          <img src="../../../../assets/neimeng/alerm.png" alt />
          <div class="alerm-con" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
            <swiper
              :options="swiperOption"
              class="cast-swiper"
              :modules="modules"
              :direction="'vertical'"
              ref="mySwiper"
              :slides-per-view="1"
              :mousewheel="true"
            >
              <swiper-slide v-for="(item, index) in newData" :key="'t' + index">
                <div class="list-item">告警：{{ item.title }}</div>
              </swiper-slide>
            </swiper>
          </div>
        </div>

        <div class="art-section">
          <div class="art-section-head">
            <p class="art-section-title">人员出入次数统计</p>
            <div class="art-s-h-right cc-select">
              <el-select v-model="accessTimesType" class="year-select" placeholder="请选择">
                <el-option v-for="item in dateOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </div>
          <div class="section-main" style="height: 234px">
            <people-area :chartData="accTimesArr" />

            <!-- <alerm-bar :chartData="peopleAreaData" /> -->

            <!-- <equ-alerm-bar :chartData="peopleAreaData" /> -->
          </div>
        </div>

        <div class="flex-sb" style="margin: 20px 0">
          <div class="art-section" style="width: 605px">
            <div class="art-section-head">
              <p class="art-section-title">人员类型统计</p>
              <div class="art-s-h-right cc-select">
                <el-select v-model="personTypeType" class="year-select" placeholder="请选择">
                  <el-option v-for="item in dateOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
            <div class="section-main" style="height: 296px">
              <div class="p-type-head">
                <img src="../../../../assets/neimeng/person.png" />
                <div class="p-t-item">
                  <span class="p-t-label">总人数</span>
                  <span class="p-t-value">3820</span>
                </div>
                <div class="p-t-item">
                  <span class="p-t-label">进门总人数</span>
                  <p class="p-t-value p-t-small">
                    56/
                    <span>65%</span>
                  </p>
                </div>
                <div class="p-t-item">
                  <span class="p-t-label">出门总人数</span>
                  <p class="p-t-value p-t-small">
                    56/
                    <span>65%</span>
                  </p>
                </div>
              </div>
              <div style="height: 225px">
                <half-circle :chartData="peopleTypeData" />
              </div>
            </div>
          </div>

          <div class="art-section" style="width: 605px">
            <div class="art-section-head small">
              <p class="art-section-title">事件报警数据</p>
              <div class="art-s-h-right flex-right">
                <div class="cc-select">
                  <el-select v-model="selectedDate" class="year-select" placeholder="请选择">
                    <el-option v-for="item in dateOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
                  </el-select>
                </div>
                <div class="cc-select">
                  <el-select v-model="selectedDate" class="year-select" placeholder="请选择">
                    <el-option v-for="item in dateOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
                  </el-select>
                </div>
                <div class="cc-select">
                  <el-select v-model="selectedDate" class="year-select" placeholder="请选择">
                    <el-option v-for="item in dateOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <div class="section-main" style="height: 296px">
              <my-table
                :tableData="tableData"
                ref="fuelTable"
                @modifyRow="handleModify"
                @toDetail="toDetail"
                @getSelection="getSelection"
                @backcallEvent="backcallEvent"
              />
            </div>
          </div>

          <!-- <div class="art-section" style="width: 605px;">
                        <div class="art-section-head">
                            <p class="art-section-title">区域人员统计</p>
                            <div class="art-s-h-right cc-select">
                                <el-select v-model="selectedDate" class="year-select" placeholder="请选择">
                                    <el-option v-for="item in dateOptions" :key="item.id" :label="item.name"
                                        :value="item.name">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="section-main" style="height: 296px;">
                            <div class="p-type-head">
                                <div class="p-t-item">
                                    <span class="p-t-label">学生</span>
                                    <span class="p-t-value p-t-small">1456</span>
                                </div>
                                <div class="p-t-item">
                                    <span class="p-t-label">教师</span>
                                    <span class="p-t-value p-t-small">389</span>
                                </div>
                                <div class="p-t-item">
                                    <span class="p-t-label">员工</span>
                                    <span class="p-t-value p-t-small">72</span>
                                </div>
                                <div class="p-t-item">
                                    <span class="p-t-label">访客</span>
                                    <span class="p-t-value p-t-small">176</span>
                                </div>
                                <div class="p-t-item">
                                    <span class="p-t-label">VIP</span>
                                    <span class="p-t-value p-t-small">260</span>
                                </div>
                            </div>
                            <div style="height: 225px;">
                                <half-circle :chartData="peopleTypeData" />
                            </div>
                        </div>
          </div>-->
        </div>

        <div class="flex-sb">
          <div class="art-section" style="width: 605px">
            <div class="art-section-head">
              <p class="art-section-title">出入记录统计</p>
              <div class="art-s-h-right cc-select">
                <el-select v-model="accessRecordsType" class="year-select" placeholder="请选择">
                  <el-option v-for="item in dateOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </div>
            </div>
            <div class="section-main" style="height: 170px">
              <!-- <abnormal-bar :chartData="abnormalData" /> -->
              <my-table1
                :tableData="accessRecords"
                ref="fuelTable"
                @modifyRow="handleModify"
                @toDetail="toDetail"
                @getSelection="getSelection"
                @deleteRow="handleDelete"
              />
            </div>
          </div>

          <div class="art-section" style="width: 605px">
            <div class="art-section-head">
              <p class="art-section-title">人脸识别统计</p>
              <div class="art-s-h-right cc-select">
                <el-select v-model="selectedDate" class="year-select" placeholder="请选择">
                  <el-option v-for="item in dateOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select>
              </div>
            </div>
            <div class="section-main scane-con" style="height: 170px">
              <img src="../../../../assets/neimeng/scane-icon.png" />
              <div>
                <div class="progress" style="margin-bottom: 25px">
                  <div class="pro-head">
                    <span class="pro-h-label">成功</span>
                    <p class="pro-h-right">
                      182
                      <span>次/86%</span>
                    </p>
                  </div>
                  <div class="p_bj">
                    <div class="p_layer" :style="{ width: progress + '%' }"></div>
                  </div>
                </div>
                <div class="progress fail">
                  <div class="pro-head">
                    <span class="pro-h-label">成功</span>
                    <p class="pro-h-right">
                      182
                      <span>次/86%</span>
                    </p>
                  </div>
                  <div class="p_bj">
                    <div class="p_layer" :style="{ width: progress + '%' }"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="part-right">
        <div class="art-section" style="margin-bottom: 20px">
          <div class="art-section-head">
            <p class="art-section-title">安防态势</p>
            <div class="art-s-h-right cc-select">
              <el-select v-model="selectedDate" class="year-select" placeholder="请选择">
                <el-option v-for="item in dateOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </div>
          </div>
          <div class="section-main safe-con" style="height: 226px">
            <img src="../../../../assets/neimeng/safe-guard.png" />
            <div class="safe-right">
              <div class="safe-r-item">
                <div class="safe-r-title">
                  待处理
                  <span>56</span>
                </div>
                <div class="safe-pro-bar">
                  <div style="width: 45%"></div>
                </div>
              </div>
              <div class="safe-r-item">
                <div class="safe-r-title">
                  处理中
                  <span>26</span>
                </div>
                <div class="safe-pro-bar">
                  <div style="width: 25%"></div>
                </div>
              </div>
              <div class="safe-r-item">
                <div class="safe-r-title">
                  已处理
                  <span>156</span>
                </div>
                <div class="safe-pro-bar">
                  <div style="width: 75%"></div>
                </div>
              </div>
              <div class="safe-r-item">
                <div class="safe-r-title">
                  未处理
                  <span class="red">16</span>
                </div>
                <div class="safe-pro-bar">
                  <div style="width: 15%"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="art-section" style="margin-bottom: 20px">
          <div class="art-section-head">
            <p class="art-section-title">事件概况</p>
            <div class="art-s-h-right cc-select">
              <el-select v-model="selectedDate" class="year-select" placeholder="请选择">
                <el-option v-for="item in dateOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </div>
          </div>
          <div class="section-main" style="height: 248px">
            <!-- <circle-chart titleTxt="告警总数" :sum='total3' :pieData="alermData" /> -->
            <ratio-circle :pieData="alermData" />
          </div>
        </div>

        <div class="art-section">
          <div class="art-section-head">
            <p class="art-section-title">人员名单匹配统计</p>
            <div class="art-s-h-right cc-select">
              <el-select v-model="selectedDate" class="year-select" placeholder="请选择">
                <el-option v-for="item in dateOptions" :key="item.id" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </div>
          </div>
          <div class="section-main match-con" style="height: 297px">
            <img src="../../../../assets/neimeng/match-icon.png" />
            <div class="match-right">
              <div class="match-r-item">
                <span class="match-r-label">黑名单人员</span>
                <div class="match-r-val">
                  15
                  <span>人</span>
                </div>
              </div>
              <div class="match-r-item">
                <span class="match-r-label">白名单人员</span>
                <div class="match-r-val">
                  15
                  <span>人</span>
                </div>
              </div>
              <div class="match-r-item">
                <span class="match-r-label">VIP人员</span>
                <div class="match-r-val">
                  15
                  <span>人</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accessRecords, accessTimesstat, personTypeSta } from "@/api/neimeng";

import { swiper, swiperSlide, Mousewheel } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";
import peopleArea from "./components/people-area.vue";
import halfCircle from "./components/half-circle.vue";
import abnormalBar from "./components/abnormal-bar.vue";
import CircleChart from "./components/circle-chart.vue";
// 事件报警趋势
import alermBar from "./components/alerm-bar.vue";
// 设备报警趋势
import equAlermBar from "./components/equ-alerm-bar.vue";
// 事件报警分布占比
import ratioCircle from "./components/ratio-circle.vue";
import myTable from "./components/record-table.vue";
import myTable1 from "./components/record-table1.vue";

import { WebSocketEvents } from "@/utils/eventName";

export default {
  components: {
    swiper,
    swiperSlide,
    myTable1,
    peopleArea,
    halfCircle,
    abnormalBar,
    CircleChart,
    alermBar,
    equAlermBar,
    ratioCircle,
    myTable,
  },
  computed: {
    mySwiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  data() {
    return {
      tableData: [
        {
          id: 0,
          name: "园区一",
          enventType: "事件类型一",
          time: "2023.06.10 11:00:00",
          alermLevel: "一般事件",
        },
        {
          id: 1,
          name: "园区一",
          enventType: "事件类型一",
          time: "2023.06.10 11:00:00",
          alermLevel: "一般事件",
        },
        {
          id: 2,
          name: "园区一",
          enventType: "事件类型一",
          time: "2023.06.10 11:00:00",
          alermLevel: "一般事件",
        },
        {
          id: 3,
          name: "园区一",
          enventType: "事件类型一",
          time: "2023.06.10 11:00:00",
          alermLevel: "一般事件",
        },
        {
          id: 4,
          name: "园区一",
          enventType: "事件类型一",
          time: "2023.06.10 11:00:00",
          alermLevel: "一般事件",
        },
        {
          id: 5,
          name: "园区一",
          enventType: "事件类型一",
          time: "2023.06.10 11:00:00",
          alermLevel: "一般事件",
        },
      ],
      alermData: [
        { val: 86, name: "一般事件" },
        { val: 12, name: "紧急事件" },
        { val: 22, name: "重大事件" },
        { val: 12, name: "其他事件" },
      ],
      progress: 66,
      abnormalData: [
        {
          name: "学生",
          mask: 23,
          temp: 42,
        },
        {
          name: "教师",
          mask: 67,
          temp: 12,
        },
        {
          name: "访客",
          mask: 32,
          temp: 54,
        },
        {
          name: "员工",
          mask: 23,
          temp: 42,
        },
        {
          name: "VIP",
          mask: 83,
          temp: 13,
        },
      ],
      peopleTypeData: [
        {
          name: "员工",
          value: 754,
        },
        {
          name: "访客",
          value: 611,
        },
        {
          name: "VIP",
          value: 400,
        },
        {
          name: "人员类型四",
          value: 164,
        },
        {
          name: "人员类型五",
          value: 58,
        },
      ],
      peopleAreaData: [
        {
          time: "1:00",
          enter: 23,
          out: 63,
        },
        {
          time: "2:00",
          enter: 43,
          out: 23,
        },
        {
          time: "3:00",
          enter: 63,
          out: 33,
        },
        {
          time: "1:00",
          enter: 93,
          out: 83,
        },
        {
          time: "1:00",
          enter: 123,
          out: 63,
        },
        {
          time: "1:00",
          enter: 23,
          out: 33,
        },
        {
          time: "1:00",
          enter: 53,
          out: 23,
        },
        {
          time: "1:00",
          enter: 73,
          out: 103,
        },
        {
          time: "1:00",
          enter: 123,
          out: 163,
        },
        {
          time: "1:00",
          enter: 23,
          out: 63,
        },
        {
          time: "1:00",
          enter: 23,
          out: 63,
        },
        {
          time: "2:00",
          enter: 43,
          out: 23,
        },
        {
          time: "3:00",
          enter: 63,
          out: 33,
        },
        {
          time: "1:00",
          enter: 93,
          out: 83,
        },
        {
          time: "1:00",
          enter: 123,
          out: 63,
        },
        {
          time: "1:00",
          enter: 23,
          out: 33,
        },
        {
          time: "1:00",
          enter: 53,
          out: 23,
        },
        {
          time: "1:00",
          enter: 73,
          out: 103,
        },
        {
          time: "1:00",
          enter: 123,
          out: 163,
        },
        {
          time: "1:00",
          enter: 23,
          out: 63,
        },
        {
          time: "1:00",
          enter: 23,
          out: 63,
        },
        {
          time: "2:00",
          enter: 43,
          out: 23,
        },
        {
          time: "3:00",
          enter: 63,
          out: 33,
        },
        {
          time: "1:00",
          enter: 93,
          out: 83,
        },
        {
          time: "1:00",
          enter: 123,
          out: 63,
        },
        {
          time: "1:00",
          enter: 23,
          out: 33,
        },
        {
          time: "1:00",
          enter: 53,
          out: 23,
        },
        {
          time: "1:00",
          enter: 73,
          out: 103,
        },
        {
          time: "1:00",
          enter: 123,
          out: 163,
        },
        {
          time: "1:00",
          enter: 23,
          out: 63,
        },
      ],
      selectedDate: "",
      accessRecordsType: 0,
      accessTimesType: 0,
      personTypeType: 0,
      dateOptions: [
        {
          id: 0,
          name: "今日",
        },
        {
          id: 1,
          name: "昨日",
        },
        {
          id: 2,
          name: "本周",
        },
        {
          id: 3,
          name: "上周",
        },
        {
          id: 4,
          name: "本月",
        },
        {
          id: 5,
          name: "上月",
        },
        {
          id: 6,
          name: "本季度",
        },
        {
          id: 7,
          name: "上季度",
        },
        {
          id: 8,
          name: "本年",
        },
        {
          id: 9,
          name: "上年",
        },
      ],
      scale: "1,1",
      modules: [Mousewheel],
      swiperOption: {
        loop: true,
        direction: "vertical",
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
      },
      newData: [
        {
          title:
            "2023年06月20日  11:00:20在1号楼1单元报警，人员非法闯入xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        },
        {
          title:
            "2023年06月20日  11:00:20在1号楼1单元报警，人员非法闯入xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        },
        {
          title:
            "2023年06月20日  11:00:20在1号楼1单元报警，人员非法闯入xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        },
      ],

      accTimesArr: [],
      accessRecords: [],
      allDevices: [],
    };
  },
  watch: {
    accessRecordsType: {
      handler: function () {
        this.fetaccessRecords();
      },
      immediate: true,
    },
    accessTimesType: {
      handler: function () {
        this.fetchaccessTimesstat();
      },
      immediate: true,
    },
    personTypeType: {
      handler: function () {
        this.fetchpersonTypeSta();
      },
      immediate: true,
    },
  },
  methods: {
    fetchpersonTypeSta() {
      personTypeSta({ type: this.personTypeType }).then(res => {
        // this.accTimesArr = res.data || [];
      });
    },
    fetchaccessTimesstat() {
      accessTimesstat({ type: this.accessTimesType }).then(res => {
        this.accTimesArr = res.data || [];
      });
    },
    fetaccessRecords() {
      accessRecords({ type: this.accessRecordsType }).then(res => {
        this.accessRecords = res.data.data || [];
      });
    },
    deleteAll() {
      this.$refs.fuelTable.getAll();
    },
    getSelection(val) {
      if (val.length) {
        this.$confirm("确认删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            let ids = [];
            let industryId = "";
            val.forEach(item => {
              industryId = item.industryId;
              ids.push(item.id);
            });
            this.handleDelete({ id: ids.join(","), industryId: industryId });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      } else {
        this.$message({
          type: "info",
          message: "请先勾选选要删除的",
        });
      }
    },
    toDetail(row) {
      this.rowData = row;
      this.$refs.detailDialog.show();
    },
    handleModify(row) {
      this.rowData = row;
      this.$refs.ModifyDialog.show();
    },
    handleDelete(row) {
      deleteCfg(row).then(res => {
        if (res.code === 0) {
          Message({
            message: "删除成功",
            type: "success",
            duration: 2 * 1000,
          });
          this.initTable();
        }
      });
    },
    backcallEvent() {
      console.log("backcallEvent");
      let commandMessage = {
        context: "command",
        subject: "Home",
        action: "showVideoOnWall1",
        data: {
          devices: [
            "15012310101320008025_1",
            "15012310101320007023_1",
            "15012310101320002124_1",
            "15012300111320154021",
          ],
        },
      };
      if (this.$commandSocket) {
        if (this.$commandSocket.readyState == window.WebSocket.OPEN) {
          this.$commandSocket.send(JSON.stringify(commandMessage));
        }
      }
    },
    resize() {
      let e = window.innerWidth;
      let o = window.innerHeight;
      let i = (e / 1920).toFixed(2) + "," + (o / 1080).toFixed(2);
      let scaleDom = document.querySelector(".scale");
      scaleDom.style.transform = "scale(" + i + ")";
      this.scale = i;
    },
    /** 鼠标移入 */
    onMouseEnter() {
      console.log("鼠标移入");
      console.log(this.mySwiper);
      this.mySwiper.autoplay.stop();
    },
    /** 鼠标移出 */
    onMouseLeave() {
      console.log("鼠标移出");
      console.log(this.mySwiper);
      this.mySwiper.autoplay.start();
    },
    fetchDeviceList() {
      // let params = {
      //   page: 0,
      //   pageSize: this.pageSize,
      //   queryCondition: {
      //     name: this.keyword,
      //   },
      // };
      // deviceQuery(params).then(res => {
      //   if (res.data) {
      //     let data = res.data ? res.data : {};
      //     // this.currentPage = data.page;
      //     this.total = data.total;
      //     this.tableData = res.data.record || [];
      //   }
      // });
    },
    handleAlertMessage(ev) {
      // console.log("handleAlertMessage: ", ev);
      let data = JSON.parse(ev.data);
      // Gets the value of the DeviceCode in the data, stores it in a variable (deduplication) , and prints it every 5 minutes
      let deviceCode = data.DeviceCode;
      if (deviceCode) {
        if (this.allDevices.indexOf(deviceCode) === -1) {
          this.allDevices.push(deviceCode);
          console.log("allDevices: ", this.allDevices.toString());
        }
      }
    },
  },
  mounted() {
    this.resize();
    window.addEventListener("resize", this.resize);
    this.$alertSocket.addListener(
      WebSocketEvents.MESSAGE,
      this.handleAlertMessage
    );
    this.fetchDeviceList();
  },
  beforeDestroy() {
    this.$alertSocket.removeListener(
      WebSocketEvents.MESSAGE,
      this.handleAlertMessage
    );
  },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

.flex-right {
  @include flex(flex-end, center);
}

.match-r-item {
  width: 100%;
  @include flex(space-between, center);
  height: 40px;
  background: linear-gradient(
    90deg,
    rgba(69, 137, 236, 0.56) 0%,
    rgba(69, 137, 236, 0) 100%
  );
  padding: 20px;
  position: relative;
  font-size: 12px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;

  &::before {
    content: "";
    width: 3px;
    height: 40px;
    background: #19d8ff;
    position: absolute;
    left: 0;
    top: 0;
  }

  .match-r-val {
    font-size: 24px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #19d8ff;

    span {
      font-size: 16px;
      font-weight: 400;
    }
  }
}

.match-right {
  width: 222px;
  @include flex(space-between, flex-start);
  flex-direction: column;
  gap: 20px;
}

.match-con {
  @include flex(center, center);
  overflow: hidden;

  img {
    margin-right: 30px;
  }
}

.safe-pro-bar {
  width: 80px;
  height: 2px;
  background: #1c3448;
  margin-top: 7px;

  div {
    height: 2px;
    background: linear-gradient(270deg, #4589ec 0%, #1c3448 100%);
  }
}

.safe-r-title {
  font-size: 12px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;

  span {
    margin-left: 11px;
    font-size: 20px;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #19d8ff;

    &.red {
      color: #fb007b;
    }
  }
}

.safe-con {
  @include flex(flex-start, center);
  padding-left: 24px;

  img {
    margin-right: 25px;
  }

  .safe-right {
    @include flex();
    flex-wrap: wrap;
    gap: 48px 30px;
    width: 200px;

    .safe-r-item {
      width: 80px;
    }
  }
}

.scane-con {
  @include flex(center, center);

  img {
    margin-right: 55px;
  }
}

p {
  margin: 0;
}

.pro-h-right {
  font-size: 20px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #19d8ff;

  span {
    margin-left: 10px;
    font-size: 16px;
  }
}

.pro-head {
  @include flex(space-between, flex-end);
  font-size: 12px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 8px;
}

.progress {
  width: 304px;

  &.fail {
    .pro-h-right {
      color: #fb007b;
    }

    .p_bj .p_layer {
      background-image: url(../../../../assets/neimeng/progress-fail.png);
    }
  }

  .p_bj {
    width: 100%;
    height: 8px;
    // background-position: left center;
    background-image: url(../../../../assets/neimeng/progress-bg.png);
    background-size: 13px 8px;

    .p_layer {
      width: 100%;
      height: 8px;
      // background-position: left center;
      background-image: url(../../../../assets/neimeng/progress-suc.png);
      background-size: 13px 8px;
    }
  }
}

.p-t-value.p-t-small {
  font-size: 20px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #4589ec;

  @include flex(flex-start, flex-end);

  span {
    font-size: 16px;
  }
}

.p-t-item {
  @include flex(flex-start, center);
}

.p-t-value {
  font-size: 28px;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #19d8ff;
}

.p-t-label {
  font-size: 12px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  margin-right: 20px;
}

.p-type-head {
  @include flex(space-between, center);
  height: 71px;
  padding: 0 20px;
}

.flex-sb {
  @include flex(space-between, flex-start);
}

.part-right {
  width: 570px;
}

.part-left {
  width: 1230px;
  margin-right: 20px;
}

.list-item {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
}

.cast-swiper {
  height: 50px;
}

.alert-outer {
  margin-bottom: 20px;
  height: 50px;
  background: linear-gradient(
    90deg,
    #051320 0%,
    rgba(251, 0, 123, 0.44) 32%,
    rgba(6, 18, 32, 0.4) 100%
  );
  @include flex(flex-start, center);

  img {
    margin-right: 20px;
  }
}

.alerm-con {
  height: 50px;
}

.part-main {
  @include flex(flex-start);
  padding: 20px;
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
  background-position: left -73px;
}
</style>
