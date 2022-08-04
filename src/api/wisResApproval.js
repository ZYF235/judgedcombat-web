import request from '@/utils/request'

export function getApproval(data) {
  return request({
    baseURL: '/api',
    url: '/wisResApproval/getApproval',
    method: 'get',
    params: data
  })
}

export function submitApproval(data) {
  return request({
    baseURL: '/api',
    url: '/wisResApproval/submitApproval',
    method: 'post',
    data
  })
}

export function tempSaveApproval(data) {
  return request({
    baseURL: '/api',
    url: '/wisResApproval/tempSaveApproval',
    method: 'post',
    data
  })
}
