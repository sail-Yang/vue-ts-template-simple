import request from '@/utils/request'

// 获取库存列表
export function getStoreList(data: any): any {
  return request({
    url: '/api/storelist',
    method: 'get',
    params: data
  })
}