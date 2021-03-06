import request from '@/utils/request'

export function uploadPicture(data) {
  return request({
    url: '/instead-pay-web/upload/qrUpload',
    method: 'post',
    data
  })
}

export function addQR(data) {
  return request({
    url: '/instead-pay-web/qr/insert',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function distributeQR(data, type) {
  const _api = {
    1: 'distributionQrCodeByHand',
    2: 'replaceByHand'
  }
  return request({
    url: `/instead-pay-web/qr/${_api[type]}`,
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function queryQrAll(data) {
  return request({
    url: '/instead-pay-web/qr/queryQrAll',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function updateEnableStatus(data) {
  return request({
    url: '/instead-pay-web/qr/updateEnableStatus',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function getQrById(data) {
  return request({
    url: '/instead-pay-web/qr/getQrById',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function getQrByOrderId(data) {
  return request({
    url: '/instead-pay-web/qr/getQrByOrderId',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}
