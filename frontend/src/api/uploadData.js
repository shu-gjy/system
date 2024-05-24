import request from '@/utils/request'

// 构建数据集
export function processData(data) {
  return request({
    url: '/api_data/data/processData/',
    method: 'post',
    data
  })
}

// 查看数据集分布
export function dataDistribution() {
  return request({
    url: '/api_data/data/getDataDistribution/',
    method: 'get'
  })
}
