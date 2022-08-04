import request from '@/utils/request'

export function getApplyList(data) {
  return request({
    baseURL: '/api',
    url: '/wisResApply/getApplyList',
    method: 'get',
    params: data
  })
}

export function getApplyStatus(data) {
  return request({
    baseURL: '/api',
    url: '/wisResApply/getApplyStatus',
    method: 'get',
    params: data
  })
}

export function submitApply(data) {
  return request({
    baseURL: '/api',
    url: '/wisResApply/submitApply',
    method: 'post',
    data
  })
}

export function agreeApply(data) {
  return request({
    baseURL: '/api',
    url: '/wisResApply/agreeApply',
    method: 'post',
    data
  })
}

export function disagreeApply(data) {
  return request({
    baseURL: '/api',
    url: '/wisResApply/disagreeApply',
    method: 'post',
    data
  })
}
