import request from '@/utils/request'

export function getNetActionList(data) {
  return request({
    url: '/wisNetAction/getTreeList',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function saveNetAction(data) {
  return request({
    url: '/wisNetAction/save',
    method: 'post',
    data,
    baseURL: '/api'
  })
}
