import request from '@/utils/request'

export function apgnnTrain(data) {
  return request({
    url: '/api_apgnn/apgnn/apgnnTrain/',
    method: 'post',
    data
  })
}

export function apgnnTest() {
  return request({
    url: '/api_apgnn/apgnn/apgnnTest/',
    method: 'post'
  })
}

export function apgnnInitTrain() {
  return request({
    url: '/api_apgnn/apgnn/apgnnInitTrain/',
    method: 'get'
  })
}

export function apgnnInitTest() {
  return request({
    url: '/api_apgnn/apgnn/apgnnInitTest/',
    method: 'get'
  })
}

