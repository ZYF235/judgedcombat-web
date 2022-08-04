import request from '@/utils/request'

export function getPoliceInfo(data) {
  return request({
    baseURL: '/api',
    url: '/wisResPerson/getPoliceInfo?taskCode=' + data,
    method: 'get'
  })
}

export function uploadPoliceInfo(data) {
  return request({
    baseURL: '/api',
    url: '/wisResPerson/uploadPoliceInfo',
    method: 'post',
    data
  })
}

export function submitPerson(data) {
  return request({
    baseURL: '/api',
    url: '/wisResPerson/submitPerson',
    method: 'post',
    data
  })
}

export function tempSavePerson(data) {
  return request({
    baseURL: '/api',
    url: '/wisResPerson/tempSavePerson',
    method: 'post',
    data
  })
}
