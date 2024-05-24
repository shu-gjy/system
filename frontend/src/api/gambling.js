import request from '@/utils/request'

// 删除历史数据并重新建表
export function gamblingRecreateTable(data) {
  return request({
    url: '/api_gambling/gambling/RecreateTable/',
    method: 'post',
    data
  })
}

// 赌博
export function gambleModelShow(data) {
  return request({
    url: '/api_gambling/gambling/detectionGambling/',
    method: 'post',
    data
  })
}
export function gambleModelInit(data) {
  return request({
    url: '/api_gambling/gambling/detectionGamblingInit/',
    method: 'get',
    data
  })
}
// 伪冒注册测试
export function gambleTestShow(data) {
  return request({
    url: '/api_gambling/store_fraud/detGamblingTest/',
    method: 'post',
    data
  })
}
export function gambleTestInit(data) {
  return request({
    url: '/api_gambling/store_fraud/detGamblingTestInit/',
    method: 'get',
    data
  })
}
