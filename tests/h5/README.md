##注意
页面级组件的data必须含有title，用来设置nav的中间部分的字

### 人脸识别参数说明
1. 人脸识别路由 `h5/#/certification/:id/:type/:sourceType`
   - id，type为必传参数
   - type枚举 目前有两种 `1`:已登录的非工作流认证，`2`:注册工作流实人认证
   - sourceType 为BCG来源类型
   - id 为用户 `accountId`,注册工作流接口原因传入用户mobile作为id，
   - 栗子
   
      
        已注册：`h5/#/certification/200/1/1`
        未注册：`h5/#/certification/18682888888/2/1`
  