/**
 * @description: 转移登记 的状态样式及文案的关系
 */
export const transferState = {
  0: {
    value: "待签字",
    class: 'dcl',
  },
  1: {
    value: "已完成",
    class: 'ywc',
  },
}

export const transferStateText = {
  0: {
    value: "待确认",
    class: 'dcl',
  },
  1: {
    value: "已完成",
    class: 'ywc',
  },
}
// 转移登记申请签名: 1 已签署 0 未签署
export const signStateText = {
  0: {
    value: "未签名",
    class: 'dcl',
  },
  1: {
    value: "已签名",
    class: 'ywc',
  }
}
// 转移登记: 询问信息
export  const isText = {
  1: { text: '是' },
  0: { text: '否' },
}
