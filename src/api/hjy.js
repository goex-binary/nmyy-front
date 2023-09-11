import request from '@/utils/request'

const monthCount = 12;
const dayCount = 30;

// 产能统计
export function fetchCapacity (data) {
  return request.get(`/v1/web/index/capacity?length=${ monthCount }`)
}
// 产能发电量 
export function fetchElectric (data) {
  return request.get(`/v1/web/index/electric?length=${ monthCount }`)
}
// 加载光伏 发电 
export function fetchSunPower (data) {
  return request.get(`/v1/web/index/electric?length=${ monthCount }`) // 暂无
}

// 地源热泵热量
export function fetchHeat (data) {
  return request.get(`/v1/web/heat/heat-line?length=${ monthCount }`) // 暂无
}
// 耗能 
export function fetchEnergy (data) {
  return request.get(`/v1/web/index/energy-pie`)
}

// 分项耗能趋势 
export function fetchEnergyTrend (data) {
  return request.get(`/v1/web/index/energy-trend?length=${ monthCount }`)
}

// 告警统计 
export function fetchAlarm (data) {
  return request.get(`/v1/web/index/alarm`)
}

// 设备状态统计 
export function fetchDeviceStatics (data) {
  return request.get(`/v1/web/index/device-statics`)
}

// 发电实时数据 
export function fetchWindDay (data) {
  return request.get(`/v1/web/wind/wind-day?length=${ monthCount }`)
}

// 发电历史数据 
export function fetchWindMonth (data) {
  return request.get(`/v1/web/wind/wind-month?length=${ monthCount }`)
}

// 风力年数据
export function fetchWindYear (data) {
  return request.get(`/v1/web/wind/wind-year`)
}


// 今日用电-分项耗能
export function fetchElectricToday (data) {
  return request.get(`/v1/web/electric/today`)
}
// 区域能耗Top10排名
export function fetchElectricTop10 (data) {
  return request.get(`/v1/web/electric/top10?mode=1`)
}
// 累计用电-分项耗能
export function fetchElectricCumulative (data) {
  return request.get(`/v1/web/electric/cumulative?mode=${data.mode}`)
}
// 耗能趋势
export function fetchElectricTrend (data) {
  return request.get(`/v1/web/electric/trend-month?month=${data.month}`)
}
// 历史用电占比
export function fetchElectricHistory (data) {
  return request.get(`/v1/web/electric/history?mode=1&length=12`)
}

// 地源热泵子页面
export function getHeatBy (data) {
  return request({
    url: '/v1/web/heat/heat-by?mode=' + data.mode + '&length=' + data.length,
    method: 'get',
    data
  })
}

// 地源热泵子页面
export function getHeatByMonth (data) {
  return request({
    url: '/v1/web/heat/heat-by-month?month=' + data.mode + '&length=' + data.length,
    method: 'get',
    data
  })
}

// 光伏月发电量flag 2022-09
export function getPvMonth (data) {
  return request({
    url: '/v1/web/pv/pv-month?flag=' + data.mode + '&length=' + data.length,
    method: 'get',
    data
  })
}

// 光伏年发电量flag默认6条
export function getPvBy (data) {
  return request({
    url: '/v1/web/pv/pv-year?flag=' + data.length,
    method: 'get',
    data
  })
}



// 类型GET
export function typeList (data) {
  return request.get(`/v1/web/cfg/type-list`, {
    params: data
  })
}
// 配置分页列表GET
export function cfgList (data) {
  return request.get(`/v1/web/cfg`, {
    params: data
  })
}

// 新增POST 带id为编辑
export function addCfg (data) {
  return request({
    url: `/v1/web/cfg`,
    method: 'post',
    data
  })
}

// 修改编辑POST 带id为编辑
export function modifyCfg (data) {
  return request({
    url: `/v1/web/cfg/${data.id}`,
    method: 'put',
    data
  })
}

// 删除
export function deleteCfg (data) {
  return request({
    url: `/v1/web/cfg`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 设备分布
export function deviceArea (data) {
  return request.get(`/v1/web/device/area`, {
    params: data
  })
}

// 设备种类百分比
export function devicePre (data) {
  return request.get(`/v1/web/device/pre`, {
    params: data
  })
}

// 操作日志
export function getFan (data) {
  return request({
    url: '/v1/web/fan/operation-log?page=&pageSize=10',
    method: 'get',
    data
  })
}

// 用户分页列表GET
export function usersList (data) {
  return request.get(`/v1/web/account`, {
    params: data
  })
}

// 新增POST 带id为编辑
export function addUsers (data) {
  return request({
    url: `/v1/web/account`,
    method: 'post',
    data
  })
}

// 修改编辑POST 带id为编辑
export function modifyUsers (data) {
  return request({
    url: `/v1/web/account/${data.id}`,
    method: 'put',
    data
  })
}

// 删除
export function deleteUsers (data) {
  return request({
    url: `/v1/web/account/${data.id}`,
    method: 'delete',
    data: { userid: `${data.id}` }
  })
}

// 登录接口
export function authLogin (data) {
  return request({
    url: `/v1/web/auth/signin`,
    method: 'post',
    data
  })
}

// 首页光伏月发电量flag 2022-09
export function getPvStatics (data) {
  return request({
    url: '/v1/web/pv/pv-statics?flag=' + data.mode,
    method: 'get',
    data
  })
}