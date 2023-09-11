import { vmip } from "@/config/baseUrl";
export default class Camera {
  constructor() {
    // 登录
    this.login();
  }

  login() {
    // 登录
    var password = "bjxckj_1221";
    var username = "bjxckj";
    var ipaddr = vmip;

    axios({
      method: "POST",
      url: "http://" + ipaddr + ":7010/VIID/login/v2",
      headers: {
        "Content-Type": "application/json; charset=utf8",
      },
      responseType: "json",
    })
      .then(function (res) {
        var accessCode = res.data.AccessCode;
        var md1 = forge.md.md5.create(); //md5
        var md2 = forge.md.md5.create(); //md5
        md1.update(password); //md5
        var passwordMd5 = md1.digest().toHex(); //md5
        var base64Username = window.btoa(username);
        var loginSignatureTemp = base64Username + accessCode + passwordMd5;
        md2.update(loginSignatureTemp); //md5
        var loginSignature = md2.digest().toHex(); //md5
        var data = {
          UserName: username,
          AccessCode: accessCode,
          LoginSignature: loginSignature,
        };
        axios({
          method: "POST",
          url: "http://" + ipaddr + ":7010/VIID/login/v2",
          headers: {
            "Content-Type": "application/json; charset=utf8",
          },
          responseType: "json",
          data: data,
        })
          .then(function (r) {
            console.log("r:", r);
            let loginResult = r.data.ErrCode;
            switch (
              loginResult //判断返回值：12351是‘用户不存在’；50004是‘密码错误，登录失败’
            ) {
              case 50004:
                alert("密码错误");
                break;
              case 12351:
                alert("用户不存在");
                break;
              case undefined:
                window.token = r.data.AccessToken;
                //在使用https 的时候设置为https 代理端口号
                var ishttps =
                  "https:" == document.location.protocol ? true : false;
                var url = window.location.host;
                if (ishttps) {
                  imosSdk.setLinkPort("7077");
                }

                console.log("window.token:", window.token);

                imosSdk
                  .init(vmip, window.token, 9, "app/imosSdk.html")
                  .then(function (res) {
                    // alert("登录成功");
                    //设置后续事件回调
                    imosSdk.registerLiveMsg(result => {
                      console.log(result);
                    });
                  })
                  .catch(function (err) {
                    console.log(err);
                    alert("调用失败" + err);
                  });
                break;
            }
          })
          .catch(function (e) {
            alert("服务器连接异常");
            console.log(e);
          });
      })
      .catch(function (error) {
        alert("服务器连接异常");
        console.log(error);
      });
  }
}
