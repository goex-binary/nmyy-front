import request from '@/utils/request'
// 获取机组详情
export function machineDetail (data) {
  return request.get(`/v1/company/machine/${data.id}/detail`)
}