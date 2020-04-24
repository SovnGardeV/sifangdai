import request from '@/utils/request'

export function getOrderList(data) {
  return request({
    url: '/instead-pay-web/orderInfo/queryOrderInfo',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function affirmOrder(data) {
  return request({
    url: '/instead-pay-web/orderInfo/affirmOrder',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function callBackByHand(data) {
  return request({
    url: '/instead-pay-web/orderInfo/syncCallBck',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function updateOrder(data) {
  return request({
    url: '/instead-pay-web/orderInfo/updateOrder',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}
