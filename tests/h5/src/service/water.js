import request from "../utils/request";

export function getList(data) {
    return request(
        {
            url: '/web/api/transfer/list',
            method: 'get',
            data: data
        }
    )
}
export function query(data) {
    return request(
        {
            url: '/web/api/transfer/checkOrder',
            method: 'post',
            data: data
        }
    )
}
export function add(data) {
    return request(
        {
            url: '/web/api/transfer/add',
            method: 'post',
            data: data
        }
    )
}
export function getDetail(id) {
    return request(
        {
            url: `/web/api/transfer/detail/${id}`,
            method: 'get',

        }
    )
}
export function edit(data) {
    return request(
        {
            url: `/web/api/transfer/edit`,
            method: 'post',
            data: data
        }
    )
}
export function del(id) {
    return request(
        {
            url: `/web/api/transfer/delete/${id}`,
            method: 'get',
        }
    )
}