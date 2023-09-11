import request from '@/utils/request'

export function industryInfo (data) {
  return request({
    url: '/v1/industry/info',
    method: 'get',
    data
  })
}

export function addIndustry (data) {
  return request({
    url: '/v1/industry/info',
    method: 'post',
    data
  })
}
// 获取行业排放源列表
export function emissionSources (data) {
  return request.get(`/v1/industry/${data.industryId}/emission-sources`, {
    params: data
  })
}

// 添加排放源信息
export function addEmissionSources (data) {
  return request({
    url: `/v1/industry/${data.industryId}/emission-sources`,
    method: 'post',
    data
  })
}

// 删除排放源信息
export function deleteEmissionSources (data) {
  return request({
    url: `/v1/industry/${data.industryId}/emission-sources`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 修改排放源信息
export function modifyEmissionSources (data) {
  return request({
    url: `/v1/industry/${data.industryId}/emission-sources/${data.id}`,
    method: 'put',
    data
  })
}
// 修改子行业信息
export function modifySub (data) {
  return request({
    url: `/v1/industry/info`,
    method: 'post',
    data
  })
}

// 获取子行业列表
export function fetchSubIndustry (data) {
  return request.get(`/v1/industry/${data.industryId}/sub-industry`, {
    params: data
  })
}

// 添加行业基本信息
export function addSubIndustry (data) {
  return request({
    url: `/v1/industry/info`,
    method: 'post',
    data
  })
}

// 删除行业信息
export function deleteSubIndustry (data) {
  return request.delete(`/v1/industry/${data.id}/info/`)
}


// 获取燃料类型列表
export function fuelType (data) {
  return request.get(`/v1/industry/${data.industryId}/fuel-type`, {
    params: data
  })
}

// 删除燃料类型
export function deleteFuel (data) {
  return request({
    url: `/v1/industry/${data.industryId}/fuel-type`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 添加燃料类型
export function addFuel (data) {
  return request({
    url: `/v1/industry/${data.industryId}/fuel-type`,
    method: 'post',
    data
  })
}

// 修改燃料类型
export function modifyFuel (data) {
  return request({
    url: `/v1/industry/${data.industryId}/fuel-type/${data.id}`,
    method: 'put',
    data
  })
}

// 获取生产设施列表
export function equipmentType (data) {
  return request.get(`/v1/industry/${data.industryId}/equipment-type`, {
    params: data
  })
}

// 添加生产设施类型信息
export function addEquipment (data) {
  return request({
    url: `/v1/industry/${data.industryId}/equipment-type`,
    method: 'post',
    data
  })
}

// 删除生产设施类型
export function deleteEquipment (data) {
  return request({
    url: `/v1/industry/${data.industryId}/equipment-type`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 修改生产设施类型
export function modifyEquipment (data) {
  return request({
    url: `/v1/industry/${data.industryId}/equipment-type/${data.id}`,
    method: 'put',
    data
  })
}

// 获取机组类型列表
export function machineType (data) {
  return request.get(`/v1/industry/${data.industryId}/machine-type`, {
    params: data
  })
}

// 添加机组类型
export function addMachine (data) {
  return request({
    url: `/v1/industry/machine-type`,
    method: 'post',
    data
  })
}

// 修改机组类型列表
export function modifyMachine (data) {
  return request({
    url: `/v1/industry/machine-type`,
    method: 'post',
    data
  })
}

// 删除机组类型列表
export function deleteMachine (data) {
  return request({
    url: `/v1/industry/machine-type`,
    method: 'delete',
    data: { idStr: `${data.id}` }
  })
}

// 获取数据确认项列表
export function paramsType (data) {
  return request.get(`/v1/industry/${data.industryId}/machine-parameter`, {
    params: data
  })
}

// 添加数据确认项列表
export function addParams (data) {
  return request({
    url: `/v1/industry/${data.industryId}/machine-parameter`,
    method: 'post',
    data
  })
}

// 修改数据确认项
export function modifyParams (data) {
  return request({
    url: `/v1/industry/${data.industryId}/machine-parameter/${data.id}`,
    method: 'put',
    data
  })
}


// 删除数据确认项
export function deleteParams (data) {
  return request({
    url: `/v1/industry/${data.industryId}/machine-parameter`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 获取数据确认项分类列表
export function paramsCateGory (data) {
  return request.get(`/v1/industry/${data.industryId}/machine-parameter-category`, {
    params: data
  })
}

// 获取净购入电力因子列表
export function powerFactorType (data) {
  return request.get(`/v1/power-factor`, {
    params: data
  })
}

// 获取数据确认项分类列表
export function paramsCateGory1 (data) {
  return request.get(`/v1/industry/info`)
}

// 添加电网排放因子
export function addFactor (data) {
  return request({
    url: `/v1/power-factor`,
    method: 'post',
    data
  })
}

// 修改电网排放因子
export function modifyFactor (data) {
  return request({
    url: `/v1/power-factor/${data.id}`,
    method: 'put',
    data
  })
}

// 获取净购入电力因子列表
export function fuelFactorType (data) {
  return request.get(`/v1/base-data/fuel-factor`, {
    params: data
  })
}

// 获取净购入电力因子
export function getPowerFactorType (data) {
  return request.get(`/v1/power-factor/${data.industryId}`, {
    params: data
  })
}

// 获取燃料类型
export function paramsCateGory2 (data) {
  return request.get(`/v1/industry/fuel-type-list`)
}

// 添加石燃料缺省值
export function addFuleFactor (data) {
  return request({
    url: `/v1/base-data/fuel-factor`,
    method: 'post',
    data
  })
}

// 删除电力因子
export function deleteParams1 (data) {
  return request({
    url: `/v1/power-factor`,
    method: 'delete',
    data: { industryId: `${data.industryId}` }
  })
}
// 碳文档库 //

// 获取碳文档类型列表
export function doctype (data) {
  return request.get(`/v1/web/article_category`, {
    params: data
  })
}

// 获取服务诉求类型列表
export function demandCategory (data) {
  return request.get(`/v1/web/demand_category`, {
    params: data
  })
}

// 获取碳文档类型列表 -- 分页版
export function doctypePage (data) {
  return request.get(`/v1/web/article_category/page`, {
    params: data
  })
}

// 获取服务诉求类型列表 -- 分页版
export function demandCategoryPage (data) {
  return request.get(`/v1/web/demand_category/page`, {
    params: data
  })
}

// 获取开关列表
export function fetchConfigList (data) {
  return request.get(`/v1/web/config`, {
    params: data
  })
}

// 删除文档类型列表
export function deleteDoctype (data) {
  return request({
    url: `/v1/web/article_category`,
    method: 'delete',
    data: { categoryId: data.id }
  })
}

// 删除服务诉求类型列表
export function deletedemandCategory (data) {
  return request({
    url: `/v1/web/demand_category`,
    method: 'delete',
    data: { id: data.id }
  })
}

// 删除开关配置项
export function deleteConfigItem (data) {
  return request({
    url: `/v1/web/config`,
    method: 'delete',
    data: { id: data.id }
  })
}


// 添加文档类型
export function addDoctype (data) {
  return request({
    url: `/v1/web/article_category`,
    method: 'post',
    data
  })
}

// 添加诉求类型
export function addDemandCategory (data) {
  return request({
    url: `/v1/web/demand_category`,
    method: 'post',
    data
  })
}

// 添加开关配置
export function addConfigItem (data) {
  return request({
    url: `/v1/web/config`,
    method: 'post',
    data
  })
}

// 获取碳文档列表
export function doc (data) {
  return request.get(`/v1/web/article`, {
    params: data
  })
}

// 获取领导干部列表
export function cadreList (data) {
  return request.get(`/v1/web/cadre/employer`, {
    params: data
  })
}

// 根据级别获取领导干部列表
export function cadreListByPos (data) {
  return request.get(`/v1/web/cadre/lists/${data.slug}`, {
    params: data
  })
}

// 获取碳文档列表
export function enterpriseDemand (data) {
  return request.get(`/v1/web/enterprise_demand`, {
    params: data
  })
}

// 获取人员调度 以干部 列表
export function getEnterprisesEmployer (data) {
  return request.get(`/v1/web/cadre/employer-cadre-enterprises`, {
    params: data
  })
}

// 获取报告 以干部 列表
export function getReportList (data) {
  return request.get(`/v1/web/report`, {
    params: data
  })
}

// 获取任务分析 以干部 列表
export function getStatisticsTaskCadre (data) {
  return request.get(`/v1/web/statistics/task/cadre`, {
    params: data
  })
}

// 获取任务分析 以企业 列表
export function getStatisticsTaskEnterprise (data) {
  return request.get(`/v1/web/statistics/task/enterprise`, {
    params: data
  })
}

// 获取任务 列表
export function getTasksLists (data) {
  return request.get(`/v1/web/tasks`, {
    params: data
  })
}

// 获取计划列表
export function getPlanLists (data) {
  return request.get(`/v1/web/plan`, {
    params: data
  })
}

// 获取签到列表
export function getAttendanceRecords (data) {
  return request.get(`/v1/web/cadre/attendance-records`, {
    params: data
  })
}

// 获取人员调度 以企业 列表
export function getIndustryEnterpriseCadre (data) {
  return request.get(`/v1/web/enterprises/industry-enterprise-cadre`, {
    params: data
  })
}

// 获取投诉建议列表
export function enterpriseComplaint (data) {
  return request.get(`/v1/web/enterprise_complaint`, {
    params: data
  })
}

// 获取轮播图列表
export function fetchBannerList (data) {
  return request.get(`/v1/web/banner`, {
    params: data
  })
}

// 获取投诉建议列表
export function attachedFile (data) {
  return request.get(`/v1/web/attached-file`, {
    params: data
  })
}


// 获取企业列表无分页
export function getEnterprises (data) {
  return request.get(`/v1/web/enterprises`, {
    params: data
  })
}

// 添加文档
export function addDoc (data) {
  return request({
    url: `/v1/web/article`,
    method: 'post',
    data
  })
}

// 添加轮播图
export function addBanner (data) {
  return request({
    url: `/v1/web/banner`,
    method: 'post',
    data
  })
}

// 添加干部
export function addCadre (data) {
  return request({
    url: `/v1/web/cadre`,
    method: 'post',
    data
  })
}

// 删除文档类型列表
export function deleteDoc (data) {
  return request({
    url: `/v1/web/article`,
    method: 'delete',
    data: { articleId: data.id }
  })
}

// 删除轮播图
export function deleteBanner (data) {
  return request({
    url: `/v1/web/banner/${data.id}`,
    method: 'delete',
    data: { id: data.id }
  })
}

// 修改机组类型列表
export function modifyDoc (data) {
  return request({
    url: `/v1/web/article`,
    method: 'put',
    data
  })
}

// 修改干部信息
export function modifyCadre (data) {
  return request({
    url: `/v1/web/cadre`,
    method: 'put',
    data
  })
}

// 企业诉求回复
export function demandResponse (data) {
  return request({
    url: `/v1/web/enterprise_demand/${data.id}/accepted`,
    method: 'put',
    data
  })
}

// 获取企业对应的干部列表哦
export function fetchExterCares (data) {
  return request({
    url: `/v1/web/enterprises/${data.enterpriseId}/cadres`,
    method: 'get',
    data
  })
}


// 投诉建议回复
export function complaintResponse (data) {
  return request({
    url: `/v1/web/enterprise_complaint`,
    method: 'put',
    data
  })
}

// 修改banner轮播
export function modifyBanner (data) {
  return request({
    url: `/v1/web/banner`,
    method: 'put',
    data
  })
}

// 任务提醒
export function noticeTask (data) {
  return request({
    url: `/v1/web/tasks/${data.taskId}/notice`,
    method: 'post',
    data
  })
}

// 获取确认数据列表
export function dataConfirm (data) {
  return request.get(`/v1/company/machine/parameter?machineType=${data.machineType}`)
}

// 添加机组
export function addCrew (data) {
  return request({
    url: `/v1/company/machine`,
    method: 'post',
    data
  })
}

// 获取机组列表
export function getCrewList (data) {
  return request.get(`/v1/company/machine`, {
    params: data
  })
}

// 删除机组
export function deleteCrew (data) {
  return request({
    url: `/v1/company/machine`,
    method: 'delete',
    data: { ids: `${data.id}` }
  })
}

// 修改机组
export function modifyCrew (data) {
  return request({
    url: `/v1/company/machine/${data.id}/base-info`,
    method: 'put',
    data
  })
}

// 获取企业生产设施列表
export function getEquiList (data) {
  return request.get(`/v1/equipment`, {
    params: data
  })
}
// 添加生产设施
export function addEquip (data) {
  return request({
    url: `/v1/equipment`,
    method: 'post',
    data
  })
}


// 删除生产设施
export function deleteEqui (data) {
  return request({
    url: `/v1/equipment`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 修改生产设施
export function modifyEquip (data) {
  return request({
    url: `/v1/equipment`,
    method: 'put',
    data
  })
}

// 获取主营产品列表
export function getProduction (data) {
  return request.get(`/v1/production`, {
    params: data
  })
}

// 删除主营产品
export function deleteProduction (data) {
  return request({
    url: `/v1/production`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 添加主营产品
export function addProduction (data) {
  return request({
    url: `/v1/production`,
    method: 'post',
    data
  })
}

// 修改主营产品
export function modifyProduction (data) {
  return request({
    url: `/v1/production`,
    method: 'put',
    data
  })
}

// 获取CCER列表
export function getCcer (data) {
  return request.get(`/v1/assets/ccer`, {
    params: data
  })
}

// 删除CCER
export function deleteCcer (data) {
  return request({
    url: `/v1/assets/ccer/batch`,
    method: 'delete',
    data: { ids: `${data.id}`.split(',') }
  })
}

// 添加CCER
export function addCcer (data) {
  return request({
    url: `/v1/assets/ccer`,
    method: 'post',
    data
  })
}
// 修改CCER
export function modifyCcer (data) {
  return request({
    url: `/v1/assets/ccer`,
    method: 'put',
    data
  })
}

// 拒绝审核
export function refuseCcer (data) {
  return request({
    url: `/v1/assets/ccer/authfailed`,
    method: 'put',
    data
  })
}

// 通过审核
export function passCcer (data) {
  return request({
    url: `/v1/assets/ccer/authaccess`,
    method: 'put',
    data
  })
}

// 获取首页签到排行
export function getAttendanceBillboard (data) {
  return request.get(`/v1/web/home/attendance-billboard`, {
    params: data
  })
}

// 删除项目审核列表
export function deleteProject (data) {
  return request({
    url: `/v1/assets/project/batch`,
    method: 'delete',
    data: { ids: `${data.id}`.split(',') }
  })
}

// 添加项目审核
export function addProject (data) {
  return request({
    url: `/v1/assets/project`,
    method: 'post',
    data
  })
}

// 添加项目审核
export function modifyProject (data) {
  return request({
    url: `/v1/assets/project`,
    method: 'put',
    data
  })
}

// 拒绝审核
export function refuseProject (data) {
  return request({
    url: `/v1/assets/project/authfailed`,
    method: 'put',
    data
  })
}

// 通过审核
export function passProject (data) {
  return request({
    url: `/v1/assets/project/authaccess`,
    method: 'put',
    data
  })
}

// 获取确认数据列表
export function machineConfirm (data) {
  return request.get(`/v1/company/machine/${data.machineId}/parameter`)
}

// 修改CCER
export function modifyParameter (data) {
  return request({
    url: `/v1/company/machine/${data.machineId}/parameter`,
    method: 'post',
    data
  })
}

// 获取计算标识列表
export function fetchCalc (data) {
  return request.get(`/v1/calc`)
}

// 获取数据来源管理列表
export function dataOriginList (data) {
  return request.get(`/v1/data-source/page`, {
    params: data
  })
}

// 删除数据来源
export function deleteOrigin (data) {
  return request({
    url: `/v1/data-source`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 添加数据来源
export function addOrigin (data) {
  return request({
    url: `/v1/data-source`,
    method: 'post',
    data
  })
}

// 修改数据来源
export function modifyOrigin (data) {
  return request({
    url: `/v1/data-source`,
    method: 'put',
    data
  })
}

// 获取单位数据库列表
export function fetchUnit (data) {
  return request.get(`/v1/unit/page`, {
    params: data
  })
}

// 获取单位数据库列表无分页
export function fetchUnitNoPage (data) {
  return request.get(`/v1/unit`, {
    params: data
  })
}

// 删除位数据库
export function deleteUnit (data) {
  return request({
    url: `/v1/unit`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 添加位数据库
export function addUnit (data) {
  return request({
    url: `/v1/unit`,
    method: 'post',
    data
  })
}

// 修改位数据库
export function modifyUnit (data) {
  return request({
    url: `/v1/unit`,
    method: 'put',
    data
  })
}

// 修改文档类型
export function modifyDocType (data) {
  return request({
    url: `/v1/web/article_category`,
    method: 'put',
    data
  })
}

// 修改诉求类型
export function modifyDemandCategory (data) {
  return request({
    url: `/v1/web/demand_category`,
    method: 'put',
    data
  })
}

// 修改开关配置
export function modifyConfigIatem (data) {
  return request({
    url: `/v1/web/config`,
    method: 'put',
    data
  })
}

// 获取化石燃料燃烧排放列表
export function emissionRecord (data) {
  return request.get(`/v1/company/machine/${data.machineId}/emission-record?sourceId=1`, {
    params: data
  })
}

// 获取净购入电力排放列表
export function powerEmissionRecord (data) {
  return request.get(`/v1/company/machine/${data.machineId}/emission-record?sourceId=2`, {
    params: data
  })
}

// 添加化石燃料排放
export function addEmissionRecord (data) {
  return request({
    url: `/v1/company/machine/${data.machineId}/emission-record`,
    method: 'post',
    data
  })
}

// 获取机组生产数据列表
export function getProData (data) {
  return request.get(`/v1/production-data/machine/${data.machineId}`, {
    params: {
      page: data.page,
      pageSize: data.pageSize
    }
  })
}

// 添加机组生产数据
export function addProData (data) {
  return request({
    url: `/v1/production-data/machine/${data.machineId}`,
    method: 'post',
    data
  })
}

// 删除机组生产数据
export function deleteProData (data) {
  return request({
    url: `/v1/production-data/${data.id}`,
    method: 'delete',
    data: { ids: `${data.id}` }
  })
}

// 修改机组生产数据
export function modifyProData (data) {
  return request({
    url: `/v1/production-data/machine/${data.machineId}`,
    method: 'put',
    data
  })
}

// 提交机组生产数据
export function submitProData (data) {
  return request({
    url: `/v1/production-data/machine/${data.machineId}/submit/${data.id}`,
    method: 'put',
    data
  })
}

// 删除化石燃料燃烧排放
export function deleteFossil (data) {
  return request({
    url: `/v1/company/machine/emission-record`,
    method: 'delete',
    data: { ids: `${data.id}` }
  })
}

// 修改化石燃料燃烧排放
export function modifyFossil (data) {
  return request({
    url: `/v1/company/machine/emission-record`,
    method: 'put',
    data
  })
}

// 获取数据确认列表
export function getDataConfirm (data) {
  return request.get(`/v1/parameter/machine/${data.machineId}`, {
    params: {
      page: data.page,
      pageSize: data.pageSize
    }
  })
}

// 添加数据确认列表
export function addDataConfirm (data) {
  return request({
    url: `/v1/parameter/machine/${data.machineId}`,
    method: 'post',
    data
  })
}

// 删除数据确认列表
export function deleteDataConfirm (data) {
  return request({
    url: `/v1/parameter/machine/${data.machineId}/id/${data.id}`,
    method: 'delete',
    data: { ids: `${data.id}` }
  })
}

// 修改机组生产数据
export function modifyDataConfirm (data) {
  return request({
    url: `/v1/parameter/machine/${data.machineId}`,
    method: 'put',
    data
  })
}
// 获取获取企业生产数据列表
export function getBookProData (data) {
  return request.get(`/v1/production-data/company-record`, {
    params: data
  })
}
// 获取台账化石排放列表
export function getBookFossil (data) {
  return request.get(`/v1/company/emission-record`, {
    params: data
  })
}

// 提交修改业生产数据申请
export function subModifytBookProData (data) {
  return request({
    url: `/v1/production-data/machine/${data.machineId}/apply/${data.id}`,
    method: 'put',
    data
  })
}

// 提交修改业生产数据申请
export function subModifytBookFossil (data) {
  return request({
    url: `/v1/company/machine/${data.machineId}/record-apply/${data.id}`,
    method: 'put',
    data
  })
}

// 审核业生产数据申请
export function examineModifytBookProData (data) {
  return request({
    url: `/v1/production-data/machine/${data.machineId}/verify/${data.id}`,
    method: 'put',
    data
  })
}

// 提交排放数
export function subFossilEData (data) {
  return request({
    url: `/v1/company/machine/${data.machineId}/record-submit/${data.id}`,
    method: 'put',
    data
  })
}
// 审核化石燃料排放
export function examineFossil (data) {
  return request({
    url: `/v1/company/machine/${data.machineId}/record-verify/${data.id}`,
    method: 'put',
    data
  })
}

// 清缴
export function assetPay (data) {
  return request({
    url: `/v1/assets/project/pay`,
    method: 'post',
    data
  })
}

// 获取大屏行情数据
export function getHqLine (data) {
  return request.get(`/v1/hq`, {
    params: data
  })
}

// 获取大屏行行业排放数据
export function getHBData () {
  return request.get(`/v1/industry/emissions-statistics`)
}

// 删除化石燃料管理
export function deleteFuelFactor (data) {
  return request({
    url: `/v1/base-data/fuel-factor`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 获取碳文档列表
export function fetConfig (data) {
  return request.get(`/v1/config`, {
    params: data
  })
}

// 获取净购入电力因子列表
export function fuelSubFactorType (data) {
  return request.get(`/v1/company/machine/${data.machineId}/fuel`, {
    params: data
  })
}

// 添加配置
export function addConfig (data) {
  return request({
    url: `/v1/config`,
    method: 'post',
    data
  })
}

// 删除配置
export function deleteConfig (data) {
  return request({
    url: `/v1/config`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}
// 修改配置
export function modifyConfig (data) {
  return request({
    url: `/v1/config`,
    method: 'put',
    data
  })
}

// 添加数据来源
export function getArticleDetail (data) {
  return request({
    url: `/v1/web/article/${data.id}`,
    method: 'get',
    data
  })
}
// 获取工作记录详情
export function getDailyReportDetail (data) {
  return request({
    url: `/v1/web/report/${data.id}`,
    method: 'get',
    data
  })
}