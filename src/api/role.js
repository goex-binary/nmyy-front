import request from '@/utils/request'

// 获取数据确认项分类列表
export function roleList (data) {
  return request.get(`/v1/web/role`, {
    params: data
  })
}

// 获取产业类型列表
export function industryList (data) {
  return request.get(`/v1/web/base-data/industry`, {
    params: data
  })
}

// 获取节点列表
export function nodeList (data) {
  return request.get(`/v1/web/node`, {
    params: data
  })
}

// 新增角色
export function addRole (data) {
  return request({
    url: `/v1/web/role`,
    method: 'post',
    data
  })
}

// 修改角色
export function modifyRole (data) {
  return request({
    url: `/v1/web/role/${data.id}`,
    method: 'put',
    data
  })
}


// 绑定企业
export function bindEnterprise (data) {
  return request({
    url: `/v1/web/cadre/${data.cadreId}/bind-enterprise`,
    method: 'post',
    data
  })
}

// 绑定领导
export function bindCadre (data) {
  return request({
    url: `/v1/web/enterprises/${data.enterpriseId}/bind-cadre`,
    method: 'post',
    data
  })
}

// 批量下发任务 按干部
export function addBatchCadre (data) {
  return request({
    url: `/v1/web/tasks/batch-cadre`,
    method: 'post',
    data
  })
}

// 添加附件
export function addAttachedFile (data) {
  return request({
    url: `/v1/web/attached-file`,
    method: 'post',
    data
  })
}


// 批量下发任务 按企业
export function addBatchEnterprise (data) {
  return request({
    url: `/v1/web/tasks/batch-enterprise`,
    method: 'post',
    data
  })
}


// 删除角色
export function deleteRole (data) {
  return request({
    url: `/v1/web/role/${data.id}`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 新增节点
export function addNode (data) {
  return request({
    url: `/v1/web/node`,
    method: 'post',
    data
  })
}

// 修改节点
export function modifyNode (data) {
  return request({
    url: `/v1/web/node/${data.id}`,
    method: 'put',
    data
  })
}


// 删除节点
export function deleteNode (data) {
  return request({
    url: `/v1/web/node/${data.id}`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 获取用户列表
export function userList (data) {
  return request.get(`/v1/web/account`, {
    params: data
  })
}


// 获取产业类型列表
export function getIndustryList (data) {
  return request.get(`/v1/web/base-data/industry`, {
    params: data
  })
}

// 获取产业类型列表 有企业
export function getIndustryHasEnterpriseList (data) {
  return request.get(`/v1/web/base-data/industry-has-enterprise`, {
    params: data
  })
}

// 获取工作单位列表
export function getEmployerList (data) {
  return request.get(`/v1/web/base-data/employer`, {
    params: data
  })
}

// 获取工作单位列表
export function geteEployerHasCadreList (data) {
  return request.get(`/v1/web/base-data/employer-has-cadre`, {
    params: data
  })
}


// 获取职务管理列表
export function getPostList (data) {
  return request.get(`/v1/web/base-data/post`, {
    params: data
  })
}

// 获取任务计划管理列表
export function getTaskTypeList (data) {
  return request.get(`/v1/web/base-data/task-plan-type`, {
    params: data
  })
}

// 获取完成标准管理列表
export function getEvaluateList (data) {
  return request.get(`/v1/web/base-data/evaluate`, {
    params: data
  })
}

// 获取企业列表
export function enterprisesList (data) {
  return request.get(`/v1/web/enterprises`, {
    params: data
  })
}

// 获取问卷模板列表
export function questionnaireList (data) {
  return request.get(`/v1/web/questionnaire`, {
    params: data
  })
}

// 获取问卷列表
export function questionnaireRecordList (data) {
  return request.get(`/v1/web/questionnaire_record`, {
    params: data
  })
}

// 获取问卷详情
export function questionnaireRecordDetail (data) {
  return request.get(`/v1/web/questionnaire_record/${data.id}`, {
    params: data
  })
}

// 获取菜单列表
export function menuList (data) {
  return request.get(`/v1/web/menu`, {
    params: data
  })
}

// 删除用户
export function deleteUser (data) {
  return request({
    url: `/v1/web/account/${data.id}`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 删除用户
export function deleteQuestionnaire (data) {
  return request({
    url: `/v1/web/questionnaire`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 删除问卷列表
export function deleteQuestionnaireRecord (data) {
  return request({
    url: `/v1/web/questionnaire_record`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 删除产业类型
export function deleteIndustryType (data) {
  return request({
    url: `/v1/web/base-data/industry`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 删除工作单位
export function deleteEmployerType (data) {
  return request({
    url: `/v1/web/base-data/employer`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 删除职务
export function deletePostType (data) {
  return request({
    url: `/v1/web/base-data/post`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 删除任务计划类型
export function deleteTaskType (data) {
  return request({
    url: `/v1/web/base-data/task-plan-type`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 删除完成标准类型
export function deleteEvaluate (data) {
  return request({
    url: `/v1/web/base-data/evaluate`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}

// 新增用户
export function addUser (data) {
  return request({
    url: `/v1/web/account`,
    method: 'post',
    data
  })
}

// 新增用户
export function addIndustry (data) {
  return request({
    url: `/v1/web/enterprises`,
    method: 'post',
    data
  })
}

// 新增产业类型
export function addIndustryType (data) {
  return request({
    url: `/v1/web/base-data/industry`,
    method: 'post',
    data
  })
}

// 新增问卷模板
export function addQuestionnaire (data) {
  return request({
    url: `/v1/web/questionnaire`,
    method: 'post',
    data
  })
}

// 新增工作单位
export function addEmployerType (data) {
  return request({
    url: `/v1/web/base-data/employer`,
    method: 'post',
    data
  })
}

// 新增职务
export function addPostType (data) {
  return request({
    url: `/v1/web/base-data/post`,
    method: 'post',
    data
  })
}

// 新增计划任务类型
export function addTaskType (data) {
  return request({
    url: `/v1/web/base-data/task-plan-type`,
    method: 'post',
    data
  })
}

// 新增完成标注 
export function addEvaluateType (data) {
  return request({
    url: `/v1/web/base-data/evaluate`,
    method: 'post',
    data
  })
}

// 新增企业
export function Type (data) {
  return request({
    url: `/v1/web/enterprises`,
    method: 'post',
    data
  })
}

// 修改企业
export function modifyEnterprises (data) {
  return request({
    url: `/v1/web/enterprises`,
    method: 'put',
    data
  })
}

// 修改问卷模板
export function modifyQuestionnaire (data) {
  return request({
    url: `/v1/web/questionnaire`,
    method: 'put',
    data
  })
}

// 修改产业类型
export function modifyIndustryType (data) {
  return request({
    url: `/v1/web/base-data/industry`,
    method: 'put',
    data
  })
}

// 修改工作单位
export function modifyEmployerType (data) {
  return request({
    url: `/v1/web/base-data/employer`,
    method: 'put',
    data
  })
}

// 修改职位
export function modifyPostType (data) {
  return request({
    url: `/v1/web/base-data/post`,
    method: 'put',
    data
  })
}

// 修改任务计划累心
export function modifyTaskType (data) {
  return request({
    url: `/v1/web/base-data/task-plan-type`,
    method: 'put',
    data
  })
}

// 修改完成标准
export function modifyEvaluate (data) {
  return request({
    url: `/v1/web/base-data/evaluate`,
    method: 'put',
    data
  })
}

// 修改用户
export function modifyUser (data) {
  return request({
    url: `/v1/web/account/${data.id}`,
    method: 'put',
    data
  })
}

// 新增菜单
export function addMenu (data) {
  return request({
    url: `/v1/web/menu`,
    method: 'post',
    data
  })
}

// 修改菜单
export function modifyMenu (data) {
  return request({
    url: `/v1/web/menu/${data.id}`,
    method: 'put',
    data
  })
}

// 删除菜单
export function deleteMenu (data) {
  return request({
    url: `/v1/web/menu/${data.id}`,
    method: 'delete',
    data: { id: `${data.id}` }
  })
}