/**
 * Created by ex-geqiang001 on 2019/1/18.
 */
import { request } from "utils/request";

export async function submit(data) {
    return request(`/company/${data.socialCredit}`, { method: "GET" });
}
