import { NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

// 请求路径为 http://localhost:4002/api/revalidate?tag=refresh&_t=23
// tag=refresh 时，强制刷新
export async function GET(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag")!
  console.log("11111111", request.nextUrl.searchParams.get("tag"))
  revalidateTag(tag)
  return NextResponse.json({
    refresh: tag === "refresh",
    now: Date.now(),
    message: tag === "refresh" ? "刷新" : "没有刷新",
  })
}
