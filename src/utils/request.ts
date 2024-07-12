import axios from 'axios'
import { useUserStore } from '@/stores/user'
import { getToken } from '@/utils/auth'
import { ElNotification } from 'element-plus'

// create an axios instance
const service = axios.create({
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  timeout: 20000, // request timeout
})

service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    config.baseURL = "http://127.0.0.1:8000"

    if (userStore.token) {
      config.headers['x-authorization'] = 'Bearer ' + getToken()
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const userStore = useUserStore()
    const res = response.data
    if (response.status === 401 || response.status === 400) {
      ElNotification.error({
        title: '错误',
        message: res.msg,
      })

      userStore.logOut()
      return Promise.reject(res)
    } else if (response.status !== 200) {
      ElNotification.error({
        title: '错误',
        message: res.msg || '网络错误，请稍后重试',
      })
      return Promise.reject(res)
    } else {
      return res
    }
  },
  (error) => {
    console.log(error) // for debug
    const errContent = error.response
    const userStore = useUserStore()
    if (errContent?.status === 401 || errContent?.status === 400) {
      ElNotification.error({
        title: '错误',
        message: errContent.data.msg,
      })

      userStore.logOut()
      return Promise.reject(error)
    } else {
      ElNotification.error({
        title: '错误',
        message: errContent?.data?.msg || '网络错误，请稍后重试',
      })
      return Promise.reject(error)
    }
  }
)

export default service
