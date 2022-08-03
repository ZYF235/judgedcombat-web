import request from '@/utils/request'

export function getUnitTreeVoList(data) {
  return request({
    url: '/wisUnitInfo/getUnitTreeVoList',
    method: 'post',
    data,
    baseURL: '/api'
  })
}

export function getWisWisUnitInfoVoTreeVoList(data) {
  return request({
    url: '/wisUnitInfo/getWisWisUnitInfoVoTreeVoList',
    method: 'post',
    data,
    baseURL: '/api'
  })
}
