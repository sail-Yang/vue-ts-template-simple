import request from '@/utils/request'

// 获取库存列表
export function getProductList(data: any): any {
  return request({
    url: '/api/storelist',
    method: 'get',
    params: data
  })
}

// 获取库存列表
export function getProductLabelList(): any {
  return request({
    url: '/api/product/labelist',
    method: 'get',
  })
}

// 修改商品信息
export function editProduct(data: any): any {
  return request({
    url: '/api/product/edit',
    method: 'post',
    data,
  })
}

// 添加商品
export function addProduct(data: any): any {
  return request({
    url: '/api/product/add',
    method: 'post',
    data,
  })
}

// 删除商品
export function delProduct(data: any): any {
  return request({
    url: '/api/product/del',
    method: 'post',
    data,
  })
}