import request from '@/utils/request'

export function getActionPersonList(data) {
  return request({
    url: '/wisNetAction/getPersonList',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function saveActionPerson(data) {
  return request({
    url: '/wisNetAction/savePerson',
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
