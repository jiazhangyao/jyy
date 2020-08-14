import request from "../utils/request";

export function GetFileHost() {
  return request(
    {
      url: '/web/api/config/filehost',
      method: 'get',
    }
  )
}
export function GetMenu() {
  return request(
    {
      url: '/web/api/permission/menu/userH5',
      method: 'get',

    }
  )
}
export const Ticket = async () => {
  return request(
    {
      url: '/modules/api/account/common/account/jwt/ticket/info',
      method: 'get',
    }
  )
}
export const BaseInfo = async (params) => {
  return request(
    {
      url: '/web/api/user/baseInfo',
      method: 'get',
      headers: params
    }
  )
}
export const BusinessBaseInfo = async (params) => {
  return request(
    {
      url: '/web/api/user/baseInfo/business',
      method: 'get',
      headers: params
    }
  )
}
export const GetDict = async (params) => {
  return request(
    {
      url: '/web/api/order/query/initQueryEnum',
      method: 'get',
      headers: params
    }
  )
}
export const GetMail = async (params) => {
  return request(
    {
      url: '/web/api/mail/list',
      method: 'get',
      params: params
    }
  )
}

export const GetQuery = async (data) => {
  return request(
    {
      url: '/web/api/estate',
      method: 'post',
      data: data
    }
  )
}

export const AppointList = async (data) => {

  return request(
    {
      url: '/web/api/reserve/',
      method: 'get',
      params: data
    }
  )
}
export const AppointDetail = async (id) => {

  return request(
    {
      url: `/web/api/reserve/${id}`,
      method: 'get',

    }
  )
}
export const AppointDelete = async (data) => {
  const { id } = data;
  return request(
    {
      url: `/web/api/reserve/delete?id=${id}`,
      method: 'post'
    }
  )
}

export const AppointCheck = async (data) => {
  return request(
    {
      url: '/web/api/reserve/searchOrderByOrderNo',
      method: 'get',
      params: data

    }
  )
}
export const AppointStore = async (data) => {
  return request(
    {
      url: '/web/api/reserve/reserveBranch',
      method: 'get',
      params: data

    }
  )
}
export const AppointAdd = async (data) => {
  return request(
    {
      url: '/web/api/reserve/',
      method: 'post',
      data: data

    }
  )
}
export const ProcessCheck = async (data) => {
  return request(
    {
      url: '/web/api/process/validate',
      method: 'post',
      data: data

    }
  )
}
export const ProcessQuery = async (data) => {
  return request(
    {
      url: '/web/api/process/status',
      method: 'post',
      data: data

    }
  )
}
export const ProcessFace = async (data) => {
  return request(
    {
      url: '/web/api/user/faceVerification',
      method: 'post',
      data: data

    }
  )
}
export const IdCheck = async (data) => {
  return request(
    {
      url: '/web/api/user/checkIdCard',
      method: 'post',
      data: data

    }
  )
}

// 地区 省市区
export async function dictRegions(parentId, level = 0, pageNo = 1, pageSize = 500) {
  return request({
    url: "/web/api/regions/dictRegion", method: "GET", params: { pageNo, pageSize, level, parentId }
  });
}