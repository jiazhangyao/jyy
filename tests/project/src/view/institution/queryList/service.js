/**
 * Created by EX-GEQIANG001 on 2019/1/17.
 */
import { request } from "utils/request";

export async function submit(data) {
    return request("/company/query/list", { method: "GET", data });
}
