/*
 * @Author: tim huang
 * @Date: 2018-12-04 17:28:39
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-11-19 16:52:16
 */
const exec = require('child_process').exec
const proxy = require("http-proxy-middleware")

const apiPrefix = process.env.REACT_APP_API_PREFIX
const enableJProxy = process.env.ENABLE_J_PROXY

const proxyMap = {
  // 胡世涛
  // [apiPrefix]: 'http://10.28.153.134:8882',
  // 李凌凤
  // [apiPrefix]: 'http://10.28.153.152:8882',
  // 钟湖波
  // [apiPrefix]: 'http://10.28.153.220:8882',
  // [apiPrefix]: 'http://10.28.153.5:8882',
  // [apiPrefix]: 'http://30.76.226.65:8882',
  // [apiPrefix]: 'http://10.28.172.152:8882',  //许永超G端
  // [apiPrefix]: 'http://10.28.152.234:8882/', //唐翔
  // [apiPrefix]: 'http://10.28.153.135:8882/', //颜廷彬
  [apiPrefix]: 'http://hljhg-jiaoyi.st.anhouse.com.cn',
  // '/modules/api': 'http://30.76.226.65:8283',
  // '/modules/api': 'http://127.0.0.1:3001',
  // [apiPrefix]: 'http://127.0.0.1:3002',
  // '/modules/api': 'http://30.76.226.65:8283',
  // '/modules/api': 'http://hljhg-jiaoyi.st.anhouse.com.cn',
  '/web/api': 'http://hljhg-jiaoyi.st.anhouse.com.cn',
  // [apiPrefix]: 'http://30.76.226.65:8882',
  // [apiPrefix]: 'http://hljhg-jiaoyi.st.anhouse.com.cn',

  // '/modules/api': 'http://10.28.172.152:8283',//许永超uc
  '/modules/api': 'http://hljhg-jiaoyi.st.anhouse.com.cn',
  // '/modules/api': 'http://10.28.153.134:8283',
  // '/modules/api': 'http://10.28.172.152:8283',
}

// 存放 POST / PUT 数据体
let chunkData = ''

/**
 * 根据 url 前缀判断该 url 是否需要进行代理。如果需要，返回代理 url 的完整路径；如果不需要，返回 false
 * @param {string}} url 
 */
const resolveUrl = (url) => {
  let keys = Object.keys(proxyMap), i, key
  for (i in keys) {
    key = keys[i]
    if (url.slice(0, key.length) === key) {
      return `"${proxyMap[key]}${url}"`
    }
  }
  return false
}

/**
 * 从 request 对象中构造用于 curl 请求的 header 字符串
 * @param {object} req 请求对象
 */
const genHeader = (req) => {
  let headers = req.headers, key, headerStr = ''
  for (key in headers) {
    headerStr += '-H "' + key + ': ' + headers[key] + '" '
  }
  return headerStr
}

/**
 * 为响应添加 headers，并返回响应体(response body)
 * @param {string} stdout curl 返回的报文字符串 
 * @param {object} res 响应对象
 */
const resolveRes = (stdout, res) => {
  let stdoutItems = stdout.split('\r\n'), i, item, idx, kvs, k, v
  for (i in stdoutItems) {
    if (item === '') break
    item = stdoutItems[i]

    idx = item.indexOf(': ')
    if (idx === -1) continue

    kvs = item.split(': ')
    k = kvs[0]
    v = kvs[1]
    res.setHeader(k, v)
  }
  return stdoutItems[stdoutItems.length - 1]
}

/**
 * 自定义代理 - 利用 curl 进行请求代理
 * @param {object} req 请求对象 
 * @param {object} res 响应对象
 * @param {function} next 
 */
const jProxy = (req, res, next) => {
  let matchedUrl = resolveUrl(req.url)
  if (matchedUrl) {
    // 代理服务器地址
    let middleProxy = '"10.59.74.70:80"'
    req.on('data', (data) => {
      chunkData += data
    })
    req.on('end', () => {
      let header = genHeader(req)
      let cmdStr = `curl -X ${req.method} -x ${middleProxy} ${matchedUrl} ${header} ${chunkData ? '-d ' + JSON.stringify(chunkData) : ''} -i`

      console.log(`> exec command..., ${cmdStr}`)
      exec(cmdStr, (stderr, stdout) => {
        chunkData = ''
        if (!stderr && stdout) {
          console.log(`> stdout..., ${stdout}`)

          // 发送响应体
          res.send(resolveRes(stdout, res))
        }
      })
    })
  } else {
    next()
  }
}

module.exports = function (app) {
  if (enableJProxy) {
    // 渐进增强，如果 enableJProxy 为 true，则使用自定义代理
    // 使用自定义代理的因由：
    //-  非标机无法访问开发环境的API，只能通过VPN & 代理服务器才能调用开发环境的API
    //-  所以需要开发此自定义代理，用于非标机开发转发请求
    app.use(jProxy)
  } else {
    // 标准版的代理设置
    let key, target
    for (key in proxyMap) {
      target = proxyMap[key]
      app.use(proxy(key, {
        target,
        secure: false,
        changeOrigin: true,
        cookieDomainRewrite: {
          "*": "localhost"
        }
      }))
    }
  }
};
