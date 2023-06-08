import axios from "axios"

const instance = axios.create({
  baseURL: "http://127.0.0.1:3000/",
  timeout: 1000 * 60,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
})

// 添加请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 在发送请求前做些什么
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data.data
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error)
  }
)

// 封装 HTTP 请求函数
function http(options) {
  options.method = options.method || "get"
  return instance(options)
}

export default http
