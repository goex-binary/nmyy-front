import request from '@/utils/request'

export function login (data) {
  return request({
    url: '/v1/web/auth/signin',
    method: 'post',
    data
  })
}

export function register (data) {
  return request({
    url: '/v1/auth/signup',
    method: 'post',
    data
  })
}
export function modifyPassword (data) {
  return request({
    url: '/v1/user/own-pwd',
    method: 'put',
    data
  })
}
export function getInfo (token) {
  // mock
  // return new Promise((resolve, reject) => {
  //   let res = {
  //     code: 0,
  //     msg: '操作成功',
  //     data: {
  //       name: '小王',
  //       avatar: '',
  //       pages: [
  // 'configPage',
  //         'emissionOverview',
  //         'emssionAnalysis',
  //         'assetAnalysis',
  //         'assetDyn',
  //         'emissionExamine',
  //         'emissionBook',
  //         'layout',
  //         'index',
  //         'organization',
  //         'noFound',
  //         'bigScreen',
  //         'editor',
  //         'knowledge',
  //         'base',
  //         'assetOverview',
  //         'jurisdiction',
  //         'carbonRecord',
  //         'crewManage',
  //         'emissionLevel',
  //         'dataConfirm',
  //         'addCrew',
  //         'crewIndex',
  //         'crewDetail',
  //         'industryClass',
  //         'dataConfirmDetail',
  //         'quota',
  //         'ccer',
  //         'assetAudit',
  //         'assetBook',
  //         'companyMaintain',
  //         'checkInAudit',
  //         'organizationChart',
  //         'muneManage',
  //         'equipManage',
  //         'workmanship'
  //       ]
  //     }
  //   }
  //   resolve(res)
  // })
  return request.get(`/v1/web/role/account`)
}

export function logout () {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 企业类型
export function companynature () {
  return request({
    url: '/v1/parameter/companynature',
    method: 'get'
  })
}

// 获取地址选项列表
export function fetchArea (data) {
  return request.get(`/v1/parameter/areacode`)
}

// 获取电话信息
export function fetchPhone (data) {
  return request.get(`/v1/config/cfg/tel`)
}

// 企业认证录入
export function companyRegister (data) {
  return request({
    url: '/v1/company',
    method: 'post',
    data
  })
}

// 修改企业认证录入
export function companyModifyRegister (data) {
  return request({
    url: '/v1/company',
    method: 'put',
    data
  })
}

// 企业认证录入
export function registerStatus (data) {
  return request({
    url: '/v1/user/company',
    method: 'post'
  })
}
