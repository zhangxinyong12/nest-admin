import http from "@/app/utils/http"

export function getTestList(data = {}) {
  return http({
    url: "tangshi",
    method: "post",
    data,
  })
}
