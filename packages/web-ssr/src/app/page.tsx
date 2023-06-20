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
  const { items }: any = await getTestList({})
  console.log("items", items)
  return (
    <div className="flex flex-wrap p-2 mt-4">
      {items.map((item) => {
        return (
          <div
            key={item.id}
            className="w-1/6 border text-center hover:bg-gray-200"
          >
            <Link href={`/tangshi/${item.id}`} className="block p-2">
              <h1 className="text-[16px] font-bold">{item.title}</h1>
              <h3 className="text-[14px] mt-2">{item.auth}</h3>
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default Home
