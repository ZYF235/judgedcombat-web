import request from '@/utils/request'

export function getFeedback(data) {
  return request({
    baseURL: '/api',
    url: '/wisResFeedback/getFeedback',
    method: 'get',
    params: data
  })
}

export function submitFeedback(data) {
  return request({
    baseURL: '/api',
    url: '/wisResFeedback/submitFeedback',
    method: 'post',
    data
  })
}

export function tempSaveFeedback(data) {
  return request({
    baseURL: '/api',
    url: '/wisResFeedback/tempSaveFeedback',
    method: 'post',
    data
  })
}

export function getSuspectInfo(data) {
  return request({
    baseURL: '/api',
    url: '/wisResSuspect/getSuspectInfo',
    method: 'get',
    params: data
  })
}

export function uploadSuspectInfo(data) {
  return request({
    baseURL: '/api',
    url: '/wisResSuspect/uploadSuspectInfo',
    method: 'post',
    data
  })
}
