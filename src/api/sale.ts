import request from '@/utils/request'

// 提交订单
export function submitSaleOrder(data: any): any {
  return request({
    url: '/api/sale/order',
    method: 'post',
    data,
  })
}

// 订单详情
export function getOrderResult(data: any): any {
  return request({
    url: '/api/sale/result',
    method: 'post',
    data,
  })
}