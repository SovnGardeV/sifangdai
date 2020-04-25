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

export function setAPPKey(data) {
  return request({
    url: '/instead-pay-web/app/updAppKey',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function setWitRadio(data) {
  return request({
    url: '/instead-pay-web/Commercial/setWitRadio',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function applyWit(data) {
  return request({
    url: '/instead-pay-web/orderInfo/applyWit',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function getCashWit(data) {
  return request({
    url: '/instead-pay-web/orderInfo/mayCashWit',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function getWhiteIp(data) {
  return request({
    url: '/instead-pay-web/Commercial/getWhiteIp',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function getCodeName(data) {
  return request({
    url: '/instead-pay-web/app/getCodeName',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

export function getHomeInfo() {
  return request({
    url: '/instead-pay-web/orderInfo/getHome',
    method: 'post'
  })
}

export function delCommercia(data) {
  return request({
    url: '/instead-pay-web/Commercial/deleteCommercial',
    'Content-Type': 'multipart/form-data',
    method: 'post',
    data
  })
}

export function recharge(data) {
  return request({
    url: '/instead-pay-web/Commercial/recharge',
    'Content-Type': 'multipart/form-data',
    method: 'post',
    data
  })
}

export function deleteApp(data) {
  return request({
    url: '/instead-pay-web/app/delete',
    'Content-Type': 'multipart/form-data',
    method: 'post',
    data
  })
}

export function updAppInfo(data) {
  return request({
    url: '/instead-pay-web/app/updAppInfo',
    'Content-Type': 'multipart/form-data',
    method: 'post',
    data
  })
}

export function getCommMoneyInfo(data) {
  return request({
    url: '/instead-pay-web/Commercial/getCommMoneyInfo',
    'Content-Type': 'multipart/form-data',
    method: 'post',
    data
  })
}

export function updateCommercial(data) {
  return request({
    url: '/instead-pay-web/Commercial/updateCommercial',
    'Content-Type': 'multipart/form-data',
    method: 'post',
    data
  })
}

