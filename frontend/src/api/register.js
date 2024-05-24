import request from '@/utils/request'

// 伪冒注册训练
export function registerModelShow(data) {
  return request({
    url: '/api_register/register/detectionRegisterFraud/',
    method: 'post',
    data
  })
}
export function registerModelInit(data) {
  return request({
    url: '/api_register/register/detectionRegisterFraudInit/',
    method: 'get',
    data
  })
}
// 伪冒注册测试
export function registerTestShow(data) {
  return request({
    url: '/api_register/register/detRegisterFraudTest/',
    method: 'post',
    data
  })
}
export function registerTestInit(data) {
  return request({
    url: '/api_register/register/detRegisterFraudTestInit/',
    method: 'get',
    data
  })
}

// 删除历史数据并重新建表
export function registerRecreateTable(data) {
  return request({
    url: '/api_register/register/RecreateTable/',
    method: 'post',
    data
  })
}
