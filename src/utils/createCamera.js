import { vmip } from "@/config/baseUrl";

export default class CameraCell {
  constructor(code) {
    this.code = code;
    this.iframeObj = null;

    this.creatWindow();
  }

  stopPlay() {
    if (!window.token) {
      alert("请先登录");
      return;
    }

    imosSdk.playStop(this.iframeObj.id, function (e) {
      console.log(e);
    });
  }

  creatWindow() {
    //创建窗格
    if (!window.token) {
      // alert("请先登录");
      return;
    }

    let iframeObj = imosSdk.createPanelWindow();
    this.iframeObj = iframeObj;
    // 如果窗格创建已经到达上限
    if (iframeObj === null) {
      return;
    }
    iframeObj.cameraCode = this.code; // 相机编号

    let selector = `camera-con${this.code}`;
    let container = $("." + selector);
    console.log("container:", container);
    container && container[0] && container[0].appendChild(iframeObj);
    // this.playLive(iframeObj);
  }

  playLive() {
    let iframeObj = this.iframeObj;
    if (!window.token) {
      // alert("请先登录");
      return;
    }
    console.log("playLive:", iframeObj.cameraCode);
    imosSdk.playLive(
      iframeObj.id,
      iframeObj.cameraCode,
      iframeObj.cameraCode,
      function (e) {
        console.log(e);
      },
      1
    );
  }
}
