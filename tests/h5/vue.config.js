const path = require("path");
const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");

function resolve(dir) {
  return path.join(__dirname, dir);
}
// console.log(process.env.Vue_APP_HOST)
// console.log(process.env.Vue_APP_UC)
const envList = {
  // st 环境的配置
  // dev: "http://pahf-jiaoyi.st4.anhouse.com.cn",
  // module_dev_login: "http://30.76.226.65:8283",

  back_dev: process.env.Vue_APP_HOST, // dev后端开发环境
  module_dev: "http://10.28.152.114:8883",
  uc: process.env.Vue_APP_UC, // UC开发环境
  devs: "http://10.28.152.114:8883",
  // dev 环境的配置
  // back_dev: "http://30.76.226.65:8883", // dev后端开发环境
  // module_dev: "http://30.76.226.65:8883",
  // uc: "http://30.76.226.65:8283/", // UC开发环境
  // devs: "http://30.76.226.65:8883",
  // 个人开发联调环境的配置

  // back_dev: "http://30.76.226.65:8883",
  // uc: "http://10.28.153.152:8283",
  // module_dev: "http://10.28.153.152:8283"
};

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'

  // EXAMPLE
  // https://www.example.com/project/v1.1/index.html
  // baseUrl becomes /project/v1.1/

  // publicPath: "/h5/", //看服务器是不是有个文件夹
  publicPath: "/h5", //看服务器是不是有个文件夹

  // baseUrl: process.env.NODE_ENV === 'production' ? '/your/dir/' : '/'

  // where to output built files
  outputDir: "dist", //静态文件的文件夹

  // where to put static assets (js/css/img/font/...)
  assetsDir: "static",

  // whether to use eslint-loader for lint on save.
  // valid values: true | false | 'error'
  // when set to 'error', lint errors will cause compilation to fail.
  lintOnSave: false,

  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  runtimeCompiler: false,

  // babel-loader skips `node_modules` deps by default.
  // explicitly transpile a dependency with this option.
  transpileDependencies: [],

  // generate sourceMap for production build?
  productionSourceMap: false,

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set("@utils", resolve("src/utils"))
      .set("@forms", resolve("src/common/AutoForm/components"))
  },
  configureWebpack: {
    plugins: []
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // pxtorem({
          //     rootValue: 37.5,
          //     //propList: ['*'],
          //     exclude: /(node_module)/,
          //     mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
          // }),
          // require('postcss-px2rem')({
          //     remUnit: 37.5
          // }),
          // autoprefixer(),
        ]
      }
    }
  },

  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // options for the PWA plugin.
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa

  // configure webpack-dev-server behavior
  devServer: {
    proxy: {
      "^/modules": {
        // 用户中心域名
        // target: envList["uc"],
        target: 'http://127.0.0.1:3001',
        changeOrigin: true, //允许跨域
        logLevel: "debug"
      },
      "^/web": {
        // 业务接口域名
        //target: envList["back_dev"],
        target: 'http://127.0.0.1:3002',
        changeOrigin: true, //允许跨域
        logLevel: "debug"
      },
      "/portal": {
        target: "http://10.59.74.109:8385/",
        target: envList["module_dev"],
        changeOrigin: true, //允许跨域
        logLevel: "debug"
      }
    },
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8088,
    https: false,
    hotOnly: true,
    compress: true
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
  },

  // options for 3rd party plugins
  pluginOptions: {
    // ...
  }
};
