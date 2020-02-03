import request from '@/utils/request'

export function addMenu(data) {
  return request({
    url: '/instead-pay-web/menu/addMenu',
    method: 'POST',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function getMenu() {
  return request({
    url: '/instead-pay-web/menu/queryMenu',
    method: 'POST'
  })
}

export function addRoleMenu(data) {
  return request({
    url: '/instead-pay-web/menu/addRoleMenu',
    method: 'POST',
    // 'Content-Type': 'multipart/form-data',
    data
  })
}
