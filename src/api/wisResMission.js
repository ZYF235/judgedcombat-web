import request from '@/utils/request'

export function getMissionList(data) {
  return request({
    baseURL: '/api',
    url: '/wisResMission/getMissionList',
    method: 'get',
    params: data
  })
}

export function getMemberList(data) {
  return request({
    baseURL: '/api',
    url: '/wisResMission/getMemberList',
    method: 'get',
    params: data
  })
}

export function importContacts(data) {
  return request({
    baseURL: '/api',
    url: '/wisResMission/importContacts',
    method: 'post',
    data
  })
}
