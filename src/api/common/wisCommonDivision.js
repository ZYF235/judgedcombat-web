import request from '@/utils/request'

export function getMemberList(params) {
  return request({
    baseURL: '/api',
    url: '/wisCommonDivision/getMemberList',
    method: 'get',
    params
  })
}

export function getMissionList(params) {
  return request({
    baseURL: '/api',
    url: '/wisCommonDivision/getMissionList',
    method: 'get',
    params
  })
}

export function getDivisionList(params) {
  return request({
    baseURL: '/api',
    url: '/wisCommonDivision/getDivisionList',
    method: 'get',
    params
  })
}

export function saveMission(data) {
  return request({
    baseURL: '/api',
    url: '/wisCommonDivision/saveMission',
    method: 'post',
    data
  })
}

export function importContacts(data) {
  return request({
    baseURL: '/api',
    url: '/wisCommonDivision/importContacts',
    method: 'post',
    data
  })
}
