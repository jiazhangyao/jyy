import { request } from "utils/request";


export async function submit(data) {
  return request("/guide/file/list", { method: "GET", data });

}
export async function deleteFile(id) {
  return request(`/guide/file/delete/${id}`, { method: "GET"});

}
export async function uploadFileSave(data) {
  return request("/guide/file/save", { method: "post", data });

}
