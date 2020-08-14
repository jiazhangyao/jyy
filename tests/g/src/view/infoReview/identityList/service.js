import {request} from "utils/request";


export async function submit(data) {
  return request("/account/common/face/validate/appeal/list", {method: "POST", data}, "/modules/api");
}

