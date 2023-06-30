import { getTangshiList } from "@/api"
import Link from "next/link"

export default async function page() {
  const { items }: any = await getTangshiList({})

  return (
    <div className="text-center mt-2">
      <h1 className="text-[20px]">唐诗三百首</h1>
      <div className="flex flex-wrap p-2 mt-4">
        {items.map((item: any) => {
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
    </div>
  )
}
