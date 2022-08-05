import request from '@/utils/request'

export function getNetSuspectList(data) {
  return request({
    url: '/wisNetSuspect/getList',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function uploadNetSuspect(data) {
  return request({
    url: '/wisNetSuspect/upload',
    method: 'post',
    data,
    baseURL: '/api'
  })
}
