// 封装 HTTP 请求函数
const BaseUrl = "http://localhost:3000/"
class HTTP {
  get(url: string, data?: any, next?: any, cache?: RequestCache) {
    let params = ""
    if (data) {
      Object.keys(data).forEach((key) => {
        params += `${key}=${data[key]}&`
      })
      params = params.slice(0, -1)
      url = `${url}?${params}`
    }
    return fetch(BaseUrl + url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next,
      cache,
    }).then((res) => res.json())
  }
  post(url: string, data?: any, next?: any, cache?: RequestCache) {
    return fetch(BaseUrl + url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data || {}),
      next,
      cache,
    }).then((res) => res.json())
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new HTTP()
