import request from '@/utils/request'
// 获取 XXX
// export function getIndustryMap (data) {
//   return request.get(`/industry/agent-map`, {
//     params: data
//   })
// }


// 工业品地图展示
export function getIndustryMap (data) {
  return request({
    url: '/industry/agent-map',
    method: 'post',
    data
  })
}

// 工业品代理商分析
export function getIndustryAgentStatics (data) {
  return request({
    url: '/industry/proxy-statics',
    method: 'post',
    data
  })
}

// 工业品大类业绩分析
export function getIndustryClassStatics (data) {
  return request({
    url: '/industry/class-statics',
    method: 'post',
    data
  })
}

// 子类排行榜分析
export function getIndustryChildStatics (data) {
  return request({
    url: '/industry/child-statics',
    method: 'post',
    data
  })
}

// 区域销售排名
export function getTopAreaOrder (data) {
  return request({
    url: '/industry/top-area-order',
    method: 'post',
    data
  })
}

// 区域订单占比
export function getAreaOrder (data) {
  return request({
    url: '/industry/area-order',
    method: 'post',
    data
  })
}

// 区域业绩分析
export function getStaticsProvince (data) {
  return request({
    url: '/industry/statics-province',
    method: 'post',
    data
  })
}

// 按日区域业绩分析
export function getStaticsActual (data) {
  return request({
    url: '/industry/statics-actual',
    method: 'post',
    data
  })
}

// 工业品头部数据
export function getShowData (data) {
  return request({
    url: '/industry/show-data',
    method: 'post',
    data
  })
}

// 加工品地图数据
export function getProcessMap (data) {
  return request({
    url: '/process/map',
    method: 'get',
    data
  })
}

// 生产加工分析 - 加工量
export function getProcessAnalysis (data) {
  return request({
    url: '/process/process-analysis',
    method: 'get',
    data
  })
}

// 生产加工分析 - 订单量
export function getSalesAnalysis (data) {
  return request({
    url: '/process/sales-analysis',
    method: 'get',
    data
  })
}

// 生产加工分析 - 加工品品类排名
export function getProcessRank (data) {
  return request({
    url: '/process/rank',
    method: 'get',
    data
  })
}

// 生产加工分析 - 加工品品类
export function getProcessCategory (data) {
  return request({
    url: '/process/category',
    method: 'get',
    data
  })
}

// 生产加工分析 - 加工品加工量
export function getProcessQuantity (data) {
  return request({
    url: '/process/quantity?category=' + data.category,
    method: 'get',
    data
  })
}

// 园区 - 园区头部展示
export function getParkShowData (data) {
  return request({
    url: '/park/show-data',
    method: 'post',
    data
  })
}

// 园区 - 营业分析
export function getParkGuanye (data) {
  return request({
    url: '/park/guanye',
    method: 'post',
    data
  })
}

// 园区 - banner
export function getParkBanner (data) {
  return request({
    url: '/park/banner',
    method: 'post',
    data
  })
}

// 园区 - 双边流量分析
export function getFlowStatics (data) {
  return request({
    url: '/park/flow-statics',
    method: 'post',
    data
  })
}

// 园区 - 近半年平均出库量
export function getPutStatics (data) {
  return request({
    url: '/park/put-statics',
    method: 'post',
    data
  })
}


// 园区 - 近半年平均入库量
export function getPushStatics (data) {
  return request({
    url: '/park/push-statics',
    method: 'post',
    data
  })
}

// 黑色金属 - 地图
export function getSteelMapStatics (data) {
  return request({
    url: '/steel/map-statics',
    method: 'post',
    data
  })
}

// 黑色金属 - 头部显示
export function getSteelShowData (data) {
  return request({
    url: '/steel/show-data',
    method: 'post',
    data
  })
}

// 黑色金属 - 库存分析
export function getSteelStockStatics (data) {
  return request({
    url: '/steel/stock-statics',
    method: 'post',
    data
  })
}

// 黑色金属 - 近半年库存走势
export function getSteelMonthStatics (data) {
  return request({
    url: '/steel/month-statics',
    method: 'post',
    data
  })
}

// 黑色金属 - 实时库存走势
export function getSteelActualStatics (data) {
  return request({
    url: '/steel/actual-statics',
    method: 'post',
    data
  })
}

// 黑色金属 - 双边流量分析
export function getSteelFlowStatics (data) {
  return request({
    url: '/steel/flow-statics',
    method: 'post',
    data
  })
}

// 黑色金属 - 出库趋势
export function getSteelPutStatics (data) {
  return request({
    url: '/steel/put-statics',
    method: 'post',
    data
  })
}

// 黑色金属 - 入库趋势
export function getSteelPushStatics (data) {
  return request({
    url: '/steel/push-statics',
    method: 'post',
    data
  })
}

// 黑色金属 - top 10 库存
export function getSteelAreaStockStatics (data) {
  return request({
    url: '/steel/area-stock-statics',
    method: 'post',
    data
  })
}

// 黑色金属 - top10 双边
export function getSteelAreaFlowStatics (data) {
  return request({
    url: '/steel/area-flow-statics',
    method: 'post',
    data
  })
}

// 首页 - 地图 省级
export function getIndexMap (data) {
  return request({
    url: '/index/map',
    method: 'post',
    data
  })
}

// 首页 - 地图 市级
export function getIndexCityMap (data) {
  return request({
    url: '/index/city-map',
    method: 'post',
    data
  })
}

// 首页 - 工业平分析
export function getIndexClassPercent (data) {
  return request({
    url: '/industry/class-percent',
    method: 'post',
    data
  })
}

// 首页 - 黑色金属分析
export function getIndexSteelMonthStatics (data) {
  return request({
    url: '/steel/month-statics',
    method: 'post',
    data
  })
}

// 首页 - 园区分析
export function getIndexParkStatics (data) {
  return request({
    url: '/park/statics',
    method: 'post',
    data
  })
}

// 首页 - 地图顶部数据
export function getIndexShowData (data) {
  return request({
    url: '/index/show-data',
    method: 'post',
    data
  })
}

// 园区 - 黑色金属分析
export function getSteelCapacityStatics (data) {
  return request({
    url: '/steel/capacity-statics',
    method: 'post',
    data
  })
}

// 登录
export function authLogin (data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}