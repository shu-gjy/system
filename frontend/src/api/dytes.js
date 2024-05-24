import request from '@/utils/request'

export function dytesTrain(data) {
  return request({
    url: '/api_dytes/dytes/dytesTrain/',
    method: 'post',
    data
  })
}

export function dytesTest(data) {
  return request({
    url: '/api_dytes/dytes/dytesTest/',
    method: 'post',
    data
  })
}

export function dytesInitTrain1() {
  return request({
    url: '/api_dytes/dytes/dytesInitTrain1/',
    method: 'get'
  })
}

export function dytesInitTest1() {
  return request({
    url: '/api_dytes/dytes/dytesInitTest1/',
    method: 'get'
  })
}
export function dytesInitTrain2() {
  return request({
    url: '/api_dytes/dytes/dytesInitTrain2/',
    method: 'get'
  })
}

export function dytesInitTest2() {
  return request({
    url: '/api_dytes/dytes/dytesInitTest2/',
    method: 'get'
  })
}



