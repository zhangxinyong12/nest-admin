import Http from "@/app/utils/http"

export async function getTangshiList(params = {}) {
  const { data } = await Http.post(
    "tangshi",
    { ...params },
    {
      revalidate: 1000, // 请求结果缓存*s
      tags: ["refresh"], // 缓存标签
    }
  )
  return data
}

// 根据id获取详情
export async function getTestDetail(id: string) {
  const { data } = await Http.get(`tangshi/${id}`)
  return data
}
