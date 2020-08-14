import { request } from "utils/request";

//获取区块链数据
export async function submit(data) {
    return request(`/blockchain/dashboard`, { method: "GET",data});
}