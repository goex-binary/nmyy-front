<template>
    <div class="part-con scale">
        <div class="part-head">
            <span class="time-txt">{{ dateNewTime }}</span>
        </div>
        <div class="part-main" v-if="false">
            <div class="art-section" style="margin-bottom: 20px;">
                <div class="art-section-head">
                    <p class="art-section-title">事件报警视频回放窗口</p>
                </div>
                <div class="section-main event-v-outer" style="height: 500px;">
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
                        <p class="event-info-txt">内容描述文字内容描述文字内容描述文字内容描述文字内容描述文字内容描述文字内容描述文字
                            内容描述文内容描述文字内容描述文字内容描述文字内容描述文字内容描述文字内容描述文字内
                            容描述文字内容描述文字内容描述文字内容描述文字内容描述文字内容</p>
                    </div>
                    <div class="event-video-con">
                        <video src="https://lmg.jj20.com/up/allimg/4k/s/02/2109250006343S5-0-lp.jpg" controls="controls"
                            autoplay="false" poster="../../../../assets/neimeng/postar.png">
                            您的浏览器不支持 video 标签。
                        </video>
                    </div>
                </div>
            </div>
            <div class="art-section">
                <div class="art-section-head">
                    <p class="art-section-title">关注摄像头视频播放窗口</p>
                </div>
                <div class="section-main" style="height: 337px;">
                    <ul class="comm-video-lists">
                        <li v-for="item in 12" :key="item">
                            <video src="https://lmg.jj20.com/up/allimg/4k/s/02/2109250006343S5-0-lp.jpg" controls="controls"
                                autoplay="false" poster="../../../../assets/neimeng/postar.png">
                                您的浏览器不支持 video 标签。
                            </video>

                            <p class="video-location">地点名称xxxxxx</p>
                            <p class="video-time">2023.6.20 15:00:00</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


        <div class="part-main">
            <div class="art-section" style="margin-bottom: 20px;">
                <div class="art-section-head">
                    <p class="art-section-title">关注摄像头视频播放窗口</p>
                </div>
                <div class="section-main" style="height: 337px;">
                    <ul class="comm-video-lists">

                        <li>
                            <video id="video" src="https://lmg.jj20.com/up/allimg/4k/s/02/2109250006343S5-0-lp.jpg"
                                controls="controls" autoplay="false" poster="../../../../assets/neimeng/postar.png">
                                您的浏览器不支持 video 标签。
                            </video>

                            <p class="video-location">地点名称xxxxxx</p>
                            <p class="video-time">2023.6.20 15:00:00</p>
                        </li>

                        <li v-for="item in 7" :key="item">
                            <video src="https://lmg.jj20.com/up/allimg/4k/s/02/2109250006343S5-0-lp.jpg" controls="controls"
                                autoplay="false" poster="../../../../assets/neimeng/postar.png">
                                您的浏览器不支持 video 标签。
                            </video>

                            <p class="video-location">地点名称xxxxxx</p>
                            <p class="video-time">2023.6.20 15:00:00</p>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="art-section">
                <div class="art-section-head">
                    <p class="art-section-title">摄像头视频滚动播放窗口</p>
                </div>
                <div class="section-main" style="height: 500px;">
                    <ul class="comm-video-lists">
                        <li v-for="item in 12" :key="item">
                            <!-- <video src="https://lmg.jj20.com/up/allimg/4k/s/02/2109250006343S5-0-lp.jpg" controls="controls"
                                autoplay="false" poster="../../../../assets/neimeng/postar.png">
                                您的浏览器不支持 video 标签。
                            </video> -->
                            <canvas :id="'canvas-' + item"></canvas>
                            <!-- <p class="video-location">地点名称xxxxxx</p>
                            <p class="video-time">2023.6.20 15:00:00</p> -->
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <el-input v-model="val" style="position: absolute;z-index: 999999;left: 100px;top: 100px;" type="text"
            @keyup.enter.native="handleChange" />

    </div>
</template>

<script>
import {
    cameraList,
    rtspRegister,
    streamRtsp,
    streamRtspList,


} from '@/api/neimeng'


export default {
    components: {

    },
    data () {
        return {
            val: '',
            scale: '1,1',
            dateNewTime: '',
            page: 0,
            pageSize: 12,
            webRtcServer: null
        }
    },
    created () {
        // 注册摄像头实况流通道
        // rtspRegister().then(res => {
        //     if (res.code === 0 && res.data) {
        //         //
        //     }
        // });
    },
    methods: {
        handleChange (e) {
            console.log('e:', this.val);
            this.webRtcServer.connect(this.val)
        },
        fetchStram (data) {
            streamRtspList(data).then(res => {
                if (res.code === 0 && res.data) {
                    let _data = res.data || [];
                    this.$nextTick(() => {
                        _data.forEach((item, index) => {
                            let rtsp = item.RtspURL;
                            new JSMpeg.Player("ws://10.1.11.162:9999/rtsp?url=" + btoa(rtsp), {
                                canvas: document.getElementById("canvas-" + index)
                            })
                        });
                    })
                }


                // if (res.code === 0 && res.data) {
                this.$nextTick(() => {

                    let rtsp = res.data.RtspURL;

                    // 将rtsp视频流地址进行btoa处理一下
                    new JSMpeg.Player("ws://10.1.11.162:9999/rtsp?url=" + btoa(rtsp), {
                        canvas: document.getElementById("canvas-1")
                    })
                });
                // }
            });
            // streamRtsp({ cameraCode: rtsp, streamType: 1 }).then(res => {
            //     // if (res.code === 0 && res.data) {
            //     this.$nextTick(() => {

            //         let rtsp = res.data.RtspURL;

            //         // 将rtsp视频流地址进行btoa处理一下
            //         new JSMpeg.Player("ws://10.1.11.162:9999/rtsp?url=" + btoa(rtsp), {
            //             canvas: document.getElementById("canvas-1")
            //         })
            //     });
            //     // }
            // });
        },
        fetchData () {
            cameraList({
                page: this.page,
                pageSize: this.pageSize
            }).then(res => {
                console.log(res);
                if (res.code === 0 && res.data) {
                    let _data = res.data.InfoList || [];
                    _data = _data.map(item => item.ResItemV1.ResCode);

                    this.fetchStram(_data);
                }
            });
        },
        fillZero (str) {
            var realNum;
            if (str < 10) {
                realNum = '0' + str;
            } else {
                realNum = str;
            }
            return realNum;
        },
        getTime () {
            let myDate = new Date();
            let myYear = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
            let myMonth = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
            let myToday = myDate.getDate(); //获取当前日(1-31)
            let myDay = myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
            let myHour = myDate.getHours(); //获取当前小时数(0-23)
            let myMinute = myDate.getMinutes(); //获取当前分钟数(0-59)
            let mySecond = myDate.getSeconds(); //获取当前秒数(0-59)
            let nowDate,
                nowTime;
            let dayArr = ['天', '一', '二', '三', '四', '五', '六'];

            nowDate = myYear + '年' + this.fillZero(myMonth) + '月' + this.fillZero(myToday) + '日' + ' 星期' + dayArr[myDay] + '  ' + this.fillZero(myHour) + ':' + this.fillZero(myMinute) + ':' + this.fillZero(mySecond);
            this.dateNewTime = nowDate;
        },
        resize () {
            let e = window.innerWidth;
            let o = window.innerHeight;
            let i = ((e / 1920).toFixed(2) + ',' + (o / 1080).toFixed(2))
            let scaleDom = document.querySelector(".scale")
            scaleDom.style.transform = 'scale(' + i + ')'
            this.scale = i;
        },
    },
    mounted () {
        this.resize()
        window.addEventListener('resize', this.resize)
        this.getTime();
        this.timer = setInterval(this.getTime, 1000);

        // this.fetchData();

        this.webRtcServer = new WebRtcStreamer('video', 'http://' + '10.1.11.162:8000')
        //需要查看的rtsp地址
    },
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";

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
        color: #FFFFFF;
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
        color: #FFFFFF;
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
    color: #FFFFFF;
    line-height: 40px;
    text-align: justify
}

.event-info-item {
    @include flex(space-between, center);
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #FFFFFF;
    line-height: 22px;
    margin-bottom: 18px;
}

.event-title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #E5FAFD;
    background: linear-gradient(180deg, #EEEEEE 0%, #68DBFF 100%);
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
    background: linear-gradient(180deg, rgba(2, 104, 178, 0) 0%, rgba(21, 106, 211, 0.22) 100%);
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
    background: linear-gradient(180deg, rgba(34, 146, 235, 0) 0%, rgba(28, 156, 255, 0.5) 100%);
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
        color: #74B0E4;
    }
}
</style>

