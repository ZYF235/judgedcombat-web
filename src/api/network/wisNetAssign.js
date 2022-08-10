import request from '@/utils/request'

export function getNetAction(data) {
  return request({
    url: '/wisNetAssign/getByTaskCode',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function saveNetAction(data) {
  return request({
    url: '/wisNetAssign/save',
    method: 'post',
    data,
    baseURL: '/api'
  })
}

export function getActionNodeList(data) {
  return request({
    url: '/wisNetAction/getNodeList',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function saveActionNode(data) {
  return request({
    url: '/wisNetAction/saveNode',
    method: 'post',
    data,
    baseURL: '/api'
  })
}
