/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import { request } from "utils/request";

export async function submit(data) {
    return request("/order/query/listForTax", { method: "GET", data });
}

export async function getCertificate(id) {
    return request(`/order/tax/certificate/${id}`, { method: "GET" });
}

export async function sureRatepay(id) {
    return request(`/order/operate/paytax`, {
        method: "POST" ,
        data:{
            isTaxed:1,
            orderId:id
        }
    });
}