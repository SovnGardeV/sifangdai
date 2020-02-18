import request from '@/utils/request'

export function getConfig(data) {
  return request({
    url: '/instead-pay-web/Common/queryCommon',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function addConfig(data) {
  return request({
    url: '/instead-pay-web/Common/addCommon',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function editConfig(data) {
  return request({
    url: '/instead-pay-web/Common/updCommon',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function delConfig(data) {
  return request({
    url: '/instead-pay-web/Common/delCommon',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}
