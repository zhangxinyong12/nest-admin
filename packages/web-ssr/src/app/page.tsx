import { getTestList } from "@/api"
import Link from "next/link"

async function Home({ items }) {
  // 直接在这里发送请求就可以了。。。。
  // const { items }: any = await getTestList({
  //   page: 1,
  //   pageSize: 2,
  // })
  console.log("items", items)
  return (
    <div>
      <button className="btn btn-primary">列表项3</button>
      <h2>next 666</h2>
      <button className="btn btn-link">
        <Link href="/dashboard">Dashboard</Link>
      </button>
      {items.map((item) => {
        return (
          <div
            key={item._id}
            style={{
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            <h1>{item.title}</h1>
            <h3>{item.auth}</h3>
            <div>
              {item.content.map((el) => (
                <p key={el}>{el}</p>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
// // 这个好像执行顺序在之后
// export async function generateStaticParams() {
//   // 调用外部 API 获取博文列表
//   const data: any = await getTestList({
//     page: 1,
//     pageSize: 2,
//   })
//   // 通过返回 { props: { posts } } 对象，Blog 组件
//   // 在构建时将接收到 `posts` 参数
//   console.log("请求回来的数据", data.items)

//   return data.items
// }

// TODO 这个好像不对
export async function getStaticProps() {
  console.log("执行数据据请求")
  // 调用外部 API 获取博文列表
  const data: any = await getTestList()
  // 通过返回 { props: { posts } } 对象，Blog 组件
  // 在构建时将接收到 `posts` 参数
  console.log("请求回来的数据", data.items)
  return {
    props: {
      items: data.items,
    },
    revalidate: 600, // 10分钟更新一次
  }
}
export default Home
