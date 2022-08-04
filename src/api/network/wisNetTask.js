import request from '@/utils/request'

export function getNetTaskList(data) {
  return request({
    url: '/wisNetTask/getList',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function getNetTask(data) {
  return request({
    url: '/wisNetTask/getById',
    method: 'get',
    params: data,
    baseURL: '/api'
  })
}

export function submitNetTask(data) {
  return request({
    url: '/wisNetTask/submit',
    method: 'post',
    data,
    baseURL: '/api'
  })
}

export function tempSaveNetTask(data) {
  return request({
    url: '/wisNetTask/tempSave',
    method: 'post',
    data,
    baseURL: '/api'
  })
}
