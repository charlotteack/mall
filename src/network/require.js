import axios from 'axios'

export function require(config) {

  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000/api/wh',
    baseURL: 'http://106.54.54.237:8000/api/wh',
    timeout: 5000
  })

  //请求拦截器
  // instance.interceptors.request.use(config => {
  //
  //
  //   return config
  // })
  //响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  },error => {console.log(error)})

  return instance(config)
}
