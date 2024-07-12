import request from '@/utils/request'

// 员工登录
export function login(data: any): any {
  return request({
    url: '/api/user/login',
    method: 'post',
    data,
  })
}

// 获取员工信息
export function getUserInfo(): any {
  return request({
    url: '/api/user/info',
    method: 'get',
  })
}
