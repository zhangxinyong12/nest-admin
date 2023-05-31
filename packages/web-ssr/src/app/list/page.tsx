"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export default function List({ navLinks }) {
  const pathname = usePathname()
  const router = useRouter()

  function gotoDashboard() {
    router.push("/dashboard")
  }

  function test() {
    console.log(666666)
  }

  useEffect(() => {
    console.log("页面加载完成", pathname)
  }, [pathname])

  return (
    <div>
      <h1>list</h1>
      <button>
        <Link href="/list/1">详情 1</Link>
      </button>
      <br />
      <button onClick={gotoDashboard} className="btn btn-success">
        点击跳转到dashboard
      </button>
      <br />
      <button className="btn btn-primary" onClick={test}>
        打印666
      </button>
    </div>
  )
}
