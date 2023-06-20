import { getTestList } from "@/api"
import { AxiosResponse } from "axios"
import Link from "next/link"

type Items = {
  _id: string
  title: string
  auth: string
  content: string[]
}

async function Home() {
  // 直接在这里发送请求就可以了。。。。
  const { items }: any = await getTestList({
    page: 1,
    pageSize: 2,
  })
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
            <div>请求时间：{item.time}</div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
