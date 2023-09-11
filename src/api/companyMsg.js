import request from '@/utils/request'

export function addIndustry (data) {
  return request({
    url: '/v1/industry/info',
    method: 'post',
    data
  })
}
// 获取企业入驻列表
export function fetchCompanyList (data) {
  return request.get(`/v1/company/waitingVerifyList`, {
    params: data
  })
}

// 获取企业详情
export function fetchCompanyDetail (data) {
  return request.get(`/v1/company/${data.id}`)
}

// 获取企业下级列表
export function fetchSubList (data) {
  return request.get(`/v1/company/allList`)
}

// 获取企业下级列表
export function fetchEmployerTree (data) {
  return request.get(`/v1/web/cadre/employer-tree`)
}

// 通过审核
export function passRe (data) {
  return request({
    url: `/v1/company/auth-argee/${data.companyId}`,
    method: 'put',
    data
  })
}
// 拒绝审核
export function refuse (data) {
  return request({
    url: `/v1/company/auth-refuse/${data.companyId}`,
    method: 'put',
    data
  })
}

// 获取企业详细信息
export function fetchDetailInfo (data) {
  return request.get(`/v1/company/own`)
}

// 获取企业下级列表
export function fetchAssetOverView () {
  return request.get(`/v1/assets/parameter/all`)
}

// 获取资产详情
export function fetchAssetDetail (data) {
  return request.get(`/v1/assets/parameter/info`, {
    params: data
  })
}

// 获取首页详情
export function fetchHomeOverview (data) {
  return request.get(`/v1/web/home/overview`, {
    params: data
  })
}

// 获取周报
export function fetchWeekStatics1 (data) {
  return request.get(`/v1/web/report/month-statics`, {
    params: data
  })
}

// 获取周报
export function fetchWeekStatics (data) {
  return request.get(`/v1/web/report/week-statics`, {
    params: data
  })
}

// 获取计划分析
export function fetchAnalysis (data) {
  return request.get(`/v1/web/plan/analysis`, {
    params: data
  })
}


// 首页 获取计划分析1
export function fetchAnalysis1 (data) {
  return request.get(`/v1/web/enterprise_demand/analysis`, {
    params: data
  })
}


// 获取资产详情
export function fetchAttendance (data) {
  return request.get(`/v1/web/statistics/attendance`, {
    params: data
  })
}

// 获取大屏总览数据
export function getMapData () {
  return request.get(`/v1/platform/carbon-summary`)
}

// 获取大屏总览数据
export function getNews () {
  return request.get(`/v1/news?page=1&pageSize=20`)
}

// 获取企业碳排量
export function fetchCEmmision (data) {
  return request.get(`/v1/company/emission-analysis`, {
    params: data
  })
}

// 获取企业碳排量
export function fetchTaskChart (data) {
  return request.get(`/v1/web/statistics/task-chart`, {
    params: data
  })
}

// 获取排放详情
export function fetchEmissionDetail (data) {
  return request.get(`/v1/company/emission-analysis`, {
    params: data
  })
}

// 获取排放总览列表
export function fetchOverviewList (data) {
  return request.get(`/v1/company/emission-overview`)
}

// 获取排放总览列表
export function fetSideBar (data) {
  return request.get(`/v1/web/menu/account`)
}

// 生成报告
export function generateReport (data) {
  return request({
    url: `/v1/report`,
    method: 'post',
    data
  })
}

// 获取报告审核列表
export function fetchReportList (data) {
  return request.get(`/v1/report/all`, {
    params: data
  })
}

// 获取日志列表
export function fetchLogList (data) {
  return request.get(`/v1/web/log`, {
    params: data
  })
}

// 报告审核拒绝
export function refuseReport (data) {
  return request({
    url: `/v1/report/authfailed`,
    method: 'put',
    data
  })
}

// 报告审核通过
export function passReport (data) {
  return request({
    url: `/v1/report/authaccess`,
    method: 'put',
    data
  })
}

// 报告发送
export function passPublish (data) {
  return request({
    url: `/v1/report/publish`,
    method: 'put',
    data
  })
}