# G 端

# 开发规范

1. 服务器代理设置：`/src/setupProxy.js`
1. 启动：`npm start` 或者 `yarn start`

1) 路由规范
   1. 普通
      1. 新增 xxx/add
      2. 编辑 xxx/edit?id=xxx
      3. 列表 xxx/list
      4. 详情 xxx/detail
   2. 特殊
      1. 新增{special} xxx/special/add
      2. 编辑{special} xxx/special/edit?id=xxx
      3. 列表{special} xxx/special/list
      4. 详情{special} xxx/special/detail?id=xxx


### 开发环境账号密码
B端
15938365604 abc123456
15938365610 abc123456
G端
admin abc123456
C端
自己注册

curl命令参数
https://blog.csdn.net/huangzx3/article/details/80625080
http://www.ruanyifeng.com/blog/2011/09/curl.html