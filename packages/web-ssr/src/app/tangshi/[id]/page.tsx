import { getTestDetail } from "@/api"
import React from "react"

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params
  const data: any = await getTestDetail(id)
  console.log("data", data)
  return (
    <div className="text-center mt-6">
      <h1 className="text-[20px] font-bold">{data.title}</h1>
      <h3 className="text-[16px] mt-2">{data.auth}</h3>
      <div className="mt-4 ">
        {data.content.map((item: string, index: number) => {
          return (
            <p key={index} className="text-[20px] font-bold">
              {item}
            </p>
          )
        })}
      </div>
      {/* desc 内容回显到html里面 */}
      <div
        className="m-auto text-center mt-12 w-6/12 "
        dangerouslySetInnerHTML={{ __html: data.desc }}
      ></div>

      <div>
        <button className="mt-4 bg-blue-500 text-white p-2 pl-6 pr-6 rounded ">
          <a href="/">首页</a>
        </button>
      </div>
    </div>
  )
}
