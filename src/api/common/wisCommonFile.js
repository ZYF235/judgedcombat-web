import request from '@/utils/request'

export function download(params) {
  return request({
    baseURL: '/api',
    url: '/wisCommonFile/download',
    method: 'get',
    responseType: 'blob',
    params
  })
}
