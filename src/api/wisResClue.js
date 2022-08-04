import request from '@/utils/request'

export function getClueSource() {
  return request({
    baseURL: '/api',
    url: '/wisResClue/getClueSource',
    method: 'get'
  })
}

export function getClueSourceDetail(data) {
  return request({
    baseURL: '/api',
    url: '/wisResClue/getClueSourceDetail?clueSourceId=' + data,
    method: 'get'
  })
}

export function getInvolveDomain() {
  return request({
    baseURL: '/api',
    url: '/wisResClue/getInvolveDomain',
    method: 'get'
  })
}

export function getInvolveAccusation(data) {
  return request({
    baseURL: '/api',
    url: '/wisResClue/getInvolveAccusation?involveDomainId=' + data,
    method: 'get'
  })
}

export function getDivisionList(data) {
  return request({
    baseURL: '/api',
    url: '/wisResClue/getDivisionList?parentId=' + data,
    method: 'get'
  })
}

export function getClueElementType() {
  return request({
    baseURL: '/api',
    url: '/wisResClue/getClueElementType',
    method: 'get'
  })
}

export function getClueInfo(data) {
  return request({
    baseURL: '/api',
    url: '/wisResClue/getByClueCode?clueCode=' + data,
    method: 'get'
  })
}

export function uploadClueFile(data) {
  return request({
    baseURL: '/api',
    url: '/wisResClue/uploadFile',
    method: 'post',
    data
  })
}
