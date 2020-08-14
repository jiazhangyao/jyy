import request from "../utils/request";

export function sendMsg({ apiUrl = "paulbot.st.anhouse.com.cn", str }) {
  return request({
    url: `${location.protocol}//${apiUrl}/engine/api/chatbot/dialog`,
    method: 'POST',
    data: JSON.stringify({
      "reqType": 0,
      "utterance": { "inputText": str },
      "userInfo": { "sessionId": "65372", "userId": "paul1", "userName": "机器人用户1" },
      "requestInfo": { "requestId": "0", "token": window.location.href.indexOf('anhouse.cn') > -1 ? "15ba414c008b002ba15db2be9b65795a7d476b329b0922b05c89f1c6f2673420" : "fa2d34ad11db5be7a95a66ba0d63487b4f83a13de621e79c7ab1909a525f677f" }
    })
  })
}

// 查询物流工单列表
export function queryMailList(data) {
  return request({
    url: '/web/api/mail/list?pageNo=1&pageSize=10',
    method: 'get',
    data
  })
}

// 查询水电气过户工单列表
export function queryWaterList(data) {
  return request({
    url: '/web/api/transfer/list',
    method: 'get',
    data
  })
}
