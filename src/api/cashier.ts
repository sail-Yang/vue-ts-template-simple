import request from '@/utils/request'

// 获取收银员列表
export function getCashierList(data: any): any {
  return request({
    url: '/api/cashier/list',
    method: 'get',
    params: data
  })
}

// 修改收银员信息
export function editCashier(data: any): any {
  return request({
    url: '/api/cashier/edit',
    method: 'post',
    data,
  })
}

// 新增收银员
export function addCashier(data: any): any {
  return request({
    url: '/api/cashier/add',
    method: 'post',
    data,
  })
}

// 删除员工
export function delCashier(data: any): any {
  return request({
    url: '/api/cashier/del',
    method: 'post',
    data
  })
}