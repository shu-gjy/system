import request from '@/utils/request'

// 删除历史数据并重新建表
export function storeFraudRecreateTable(data) {
  return request({
    url: '/api_store_fraud/store_fraud/RecreateTable/',
    method: 'post',
    data
  })
}

// 商户检测
export function storeModelShow(data) {
  return request({
    url: '/api_store_fraud/store_fraud/detectionStoreFraud/',
    method: 'post',
    data
  })
}
export function storeModelInit(data) {
  return request({
    url: '/api_store_fraud/store_fraud/detectionStoreFraudInit/',
    method: 'get',
    data
  })
}

// 商户检测测试
export function storeTestShow(data) {
  return request({
    url: '/api_store_fraud/store_fraud/detStoreFraudTest/',
    method: 'post',
    data
  })
}
export function storeTestInit(data) {
  return request({
    url: '/api_store_fraud/store_fraud/detStoreFraudTestInit/',
    method: 'get',
    data
  })
}

export function storeUploadTrainData(data) {
  return request({
    url: '/api_store_fraud/store_fraud/uploadTrainData/',
    method: 'post',
    data
  })
}

export function storeUploadTestData(data) {
  return request({
    url: '/api_store_fraud/store_fraud/uploadTestData/',
    method: 'post',
    data
  })
}
