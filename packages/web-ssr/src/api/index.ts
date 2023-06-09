export async function getTangshiList() {
  const { data } = await fetch("http://localhost:3000/tangshi", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      page: 1,
      pageSize: 2,
    }),
    next: {
      // revalidate: 1000, // 请求结果缓存*s
      tags: ["refresh"], // 缓存标签
    },
    // cache: "no-cache", // 不缓存
  }).then((res) => res.json())
  return data.items
}
