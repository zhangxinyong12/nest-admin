import Http from "@/app/utils/http"

export async function getTangshiList() {
  const { data } = await Http.post(
    "http://localhost:3000/tangshi",
    {
      page: 1,
      pageSize: 2,
    },
    {
      revalidate: 1000, // 请求结果缓存*s
      tags: ["refresh"], // 缓存标签
    }
  )
  return data.items
}
