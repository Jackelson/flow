import request from "../utils/request";
export function getMotion(data) {
  return request({
    data,
    method: "POST",
    url: "http://10.5.27.50:9194/kbservice/v2/search/kg/get_motion",
  });
}
