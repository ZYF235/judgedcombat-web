import request from '@/utils/request'

export function importContacts(data) {
  return request({
    baseURL: '/api',
    url: '/wisResMission/importContacts',
    method: 'post',
    data
  })
}
