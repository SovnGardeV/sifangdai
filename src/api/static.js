import request from '@/utils/request'

export function getOrderStatic(data) {
  return request({
    url: '/instead-pay-web/orderInfo/getOrderStatic',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}
