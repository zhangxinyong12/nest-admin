import http from "@/app/utils/http"

// 获取全部数据
export function getTestList(data = {}) {
  return http({
    url: "tangshi",
    method: "post",
    data,
  })
}

// 根据id获取详情
export function getTestDetail(id: string) {
  return http({
    url: `tangshi/${id}`,
    method: "get",
  })
}
