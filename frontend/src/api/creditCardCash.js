import request from '@/utils/request'

// 删除历史数据并重新建表
export function creditRecreateTable(data) {
  return request({
    url: '/api_credit_card/credit_card/RecreateTable/',
    method: 'post',
    data
  })
}

// 信用卡违规套现
export function creditModelShow(data) {
  return request({
    url: '/api_credit_card/credit_card/detectionCreditCard/',
    method: 'post',
    data
  })
}
export function creditModelInit(data) {
  return request({
    url: '/api_credit_card/credit_card/detectionCreditCardInit/',
    method: 'get',
    data
  })
}
// 信用卡违规套现
export function creditTestShow(data) {
  return request({
    url: '/api_credit_card/credit_card/detCreditCardTest/',
    method: 'post',
    data
  })
}
export function creditTestInit(data) {
  return request({
    url: '/api_credit_card/credit_card/detCreditCardTestInit/',
    method: 'get',
    data
  })
}
