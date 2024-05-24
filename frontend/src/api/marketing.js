import request from '@/utils/request'

// 删除历史数据并重新建表
export function marketingRecreateTable(data) {
  return request({
    url: '/api_marketing/marketing/RecreateTable/',
    method: 'post',
    data
  })
}

// 黄牛营销
export function marketModelShow(data) {
  return request({
    url: '/api_marketing/marketing/detectionMF/',
    method: 'post',
    data
  })
}
export function marketModelInit(data) {
  return request({
    url: '/api_marketing/marketing/detectionMFInit/',
    method: 'get',
    data
  })
}
// 黄牛营销测试
export function marketTestShow(data) {
  return request({
    url: '/api_marketing/marketing/detMFTest/',
    method: 'post',
    data
  })
}
export function marketTestInit(data) {
  return request({
    url: '/api_marketing/marketing/detMFTestInit/',
    method: 'get',
    data
  })
}
