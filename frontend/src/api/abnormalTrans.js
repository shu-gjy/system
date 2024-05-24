import request from '@/utils/request'

// 删除历史数据并重新建表
export function abnormalRecreateTable(data) {
  return request({
    url: '/api_abnormal/abnormal/RecreateTable/',
    method: 'post',
    data
  })
}

// 模型
export function abnormalModelShow(data) {
  return request({
    url: '/api_abnormal/abnormal/detectionAbTrans/',
    method: 'post',
    data
  })
}
// api_abnormal/%20abnormal/detectionAbTransInit/
export function abnormalModelInit(data) {
  return request({
    url: '/api_abnormal/abnormal/detectionAbTransInit/',
    method: 'get',
    data
  })
}
