module.exports = {
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  publicPath: "./",
  devServer: {
    proxy: {
      "/": {
        // target: "http://10.1.11.162:8081", // 线上
        target: "http://localhost:8081", // 川哥IP/

        // target: 'http://192.168.2.12:20032', // 大表哥IPß
        // target: 'http://192.168.2.6:20032', // 熊少IP
        // target: 'http://192.168.2.5:20032', // 建哥IP
        changeOrigin: true,
        pathRewrite: {
          // 这里是追加链接,比如真是接口里包含了 /api,就需要这样配置.

          "/^dashboard": "/",
          // 等价于
          // step 1  /api = http://localhost:54321/
          // step 2 /^api = /api + api == http://localhost:54321/api
        },
        logLevel: "debug",
      },
      //   "/api": {
      //     target: "http://10.1.11.162:8081", // 线上
      //     // target: "http://192.168.31.110:8081", // 川哥IP/
      //     // target: 'http://192.168.2.12:20032', // 大表哥IPß
      //     // target: 'http://192.168.2.6:20032', // 熊少IP
      //     // target: 'http://192.168.2.5:20032', // 建哥IP
      //     changeOrigin: true,
      //     pathRewrite: {
      //       // 这里是追加链接,比如真是接口里包含了 /api,就需要这样配置.

      //       "/^api": "api/",
      //       // 等价于
      //       // step 1  /api = http://localhost:54321/
      //       // step 2 /^api = /api + api == http://localhost:54321/api
      //     },
      //     logLevel: "debug",
      //   },

      //   "/device": {
      //     // target: "http://10.1.11.162:8081", // 线上
      //     target: "http://localhost:8081", // 川哥IP/
      //     // target: 'http://192.168.31.110:17770', // 川哥IP/
      //     // target: 'http://192.168.2.12:20032', // 大表哥IPß
      //     // target: 'http://192.168.2.6:20032', // 熊少IP
      //     // target: 'http://192.168.2.5:20032', // 建哥IP
      //     changeOrigin: true,
      //     pathRewrite: {
      //       // 这里是追加链接,比如真是接口里包含了 /api,就需要这样配置.

      //       "/^camera": "device/",
      //       // 等价于
      //       // step 1  /api = http://localhost:54321/
      //       // step 2 /^api = /api + api == http://localhost:54321/api
      //     },
      //     logLevel: "debug",
      //   },
    },
    port: 8080,
  },
};
