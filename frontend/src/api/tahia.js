import request from '@/utils/request'

export function tahiaTrain(data) {
  return request({
    url: '/api_tahia/tahia/tahiaTrain/',
    method: 'post',
    data
  })
}

export function tahiaTest() {
  return request({
    url: '/api_tahia/tahia/tahiaTest/',
    method: 'post'
  })
}

export function tahiaInitTrain() {
  return request({
    url: '/api_tahia/tahia/tahiaInitTrain/',
    method: 'get'
  })
}

export function tahiaInitTest() {
  return request({
    url: '/api_tahia/tahia/tahiaInitTest/',
    method: 'get'
  })
}

