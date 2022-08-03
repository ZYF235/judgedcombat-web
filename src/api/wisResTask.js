import request from '@/utils/request'

export function getTaskLevel(data) {
  return request({
    url: '/wisResTask/getTaskLevel',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function getTaskStatus(data) {
  return request({
    url: '/wisResTask/getTaskStatus',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function getResearchObject(data) {
  return request({
    url: '/wisResTask/getResearchObject',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function getMineTask(data) {
  return request({
    url: '/wisResTask/getMineTask',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function getCapableTask(data) {
  return request({
    url: '/wisResTask/getCapableTask',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function getApprovalTask(data) {
  return request({
    url: '/wisResTask/getApprovalTask',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function getTask(data) {
  return request({
    url: '/wisResTask/getTask',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function submitTask(data) {
  return request({
    url: '/wisResTask/submitTask',
    method: 'post',
    data,
    baseURL: '/api'
  })
}

export function tempSaveTask(data) {
  return request({
    url: '/wisResTask/tempSaveTask',
    method: 'post',
    data,
    baseURL: '/api'
  })
}
