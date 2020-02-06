import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/instead-pay-web/Commercial/login',
    method: 'post',
    data
  })
}

export function getPublicKey() {
  return request({
    url: '/instead-pay-web/Commercial/getPublicKey',
    method: 'post'
  })
}

export function register(data) {
  return request({
    url: '/instead-pay-web/Commercial/addCommercial',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function getInfo(data) {
  return request({
    url: '/instead-pay-web/menu/getMenuByUser',
    method: 'POST',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getUserList(data) {
  return request({
    url: '/instead-pay-web/Commercial/queryCommercial',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function setRadio(data) {
  return request({
    url: '/instead-pay-web/Commercial/setRadio',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function insertIp(data) {
  return request({
    url: '/instead-pay-web/Commercial/insertIp',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function getUserInfo(data) {
  return request({
    url: '/instead-pay-web/Commercial/queryCommInfo',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function addAPP(data) {
  return request({
    url: '/instead-pay-web/app/addAppInfo',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function getAPP(data) {
  return request({
    url: '/instead-pay-web/app/getAppByComId',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function modifyPassword(data) {
  return request({
    url: '/instead-pay-web/Commercial/updateCommercialPwd',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function addUser(data) {
  return request({
    url: '/instead-pay-web/Commercial/addCommercial',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}
