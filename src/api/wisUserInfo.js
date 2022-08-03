import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data,
    baseURL: '/api'
  })
}

export function getWisUserInfo(data) {
  return request({
    url: '/wisUserInfo/getWisUserInfo',
    method: 'get',
    data,
    baseURL: '/api'
  })
}

export function getUserTreeVoList(data) {
  return request({
    url: '/wisUserInfo/getUserTreeVoList',
    method: 'post',
    data,
    baseURL: '/api'
  })
}
