/** @type {import('next').NextConfig} */

// 获取环境变量
const NODE_ENV = process.env.NODE_ENV

const nextConfig = {
  // output: "export", // 导出静态的html。但是不能使用服务端渲染
  // Optional: 修改路由，路径后面添加/  `/about` -> `/about/`
  // trailingSlash: true,
  // Optional: Change the output directory `out` -> `dist`
  distDir: "dist",

  // Image 不支持 export 导出。。。
  images: {
    // Optional: 修改图片域名
    // domains: ["localhost"], // 本地开发
    domains: ["localhost"],
  },
}

// 生产环境 配置导出静态html
if (NODE_ENV === "production") {
  // 不能和代理同时使用Error: Specified "rewrites" cannot be used with "output: export".
  nextConfig.output = "export"
} else {
  // 本地开发环境 配置代理
  nextConfig.rewrites = async () => {
    return [
      {
        source: "/api/:path*",
        destination: "http://192.168.10.238:8020/:path*",
      },
    ]
  }
}

module.exports = nextConfig
