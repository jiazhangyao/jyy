import request  from "../utils/request";

export function getList(data) {
        return request(
            {
                url:'/web/api/guide/list',
                method:'get',
                data:data
            }
         )
  }

export function getDetail(id) {
        return request(
            {
                url:`/web/api/guide/detail/${id}`,
                method:'get',
          
            }
         )
  }