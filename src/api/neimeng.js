import request from "@/utils/request";

// 获取所有摄像头列表
export function cameraList(data) {
  return request.get(`/camera/list`, {
    params: data,
  });
}
// 地图上查询所有摄像头列表
export function cameraQuery(data) {
  return request({
    url: `/camera/query?page=${data.page}&pageSize=${data.pageSize}`,
    method: "post",
    data,
  });
}
// 更新摄像头位置信息
export function cameraLocation(data) {
  return request({
    url: `/camera/${data.cameraCode}/location?longitude=${data.longitude}&latitude=${data.latitude}&building=${data.building}&floor=${data.floor}`,
    method: "PATCH",
    data,
  });
}

// 地图上获取点位
export function cameraWithLoc(data) {
  return request.get(`/camera/withLocation`, {
    params: data,
  });
}

// 注册摄像头实况流通道
export function rtspRegister(data) {
  return request({
    url: "/v1/video/camera/stream/rtsp/register",
    method: "post",
    data,
  });
}

// 获取摄像头实况流
export function streamRtsp(data) {
  return request.get(`/v1/video/camera/stream/rtsp`, {
    params: data,
  });
}

// 获取摄像头实况流
export function streamRtspList(data) {
  return request({
    url: "/v1/video/camera/stream/rtsp/list",
    method: "post",
    data,
  });
}

// 人员进出记录
export function accessRecords(data) {
  return request.get(`/api/v1/access-records`, {
    params: data,
  });
}

// 人员出入次数统计
export function accessTimesstat(data) {
  return request.get(`/api/v1/access-records/access-times-statistics`, {
    params: data,
  });
}

// 人员类型统计
export function personTypeSta(data) {
  return request.get(`/api/v1/access-records/person-type-statistics`, {
    params: data,
  });
}

export function queryMapMarker(data) {
  return request.post(`/dashboard/map/marker`, data);
}

// 更新设备位置信息
export function deviceLocation(data) {
  return request({
    url: `/device/${data.deviceCode}/location?longitude=${data.longitude}&latitude=${data.latitude}&building=${data.building}&floor=${data.floor}&azimuth=${data.azimuth}`,
    method: "PATCH",
    data,
  });
}

// 根据条件查询设备列表
export function deviceQuery({ page, pageSize, queryCondition }) {
  console.log("deviceQuery", page, pageSize, queryCondition);
  return request.post(
    `/device?page=${page}&pageSize=${pageSize}`,
    queryCondition
  );
  // return request({
  //   url: `/device?page=${page}&pageSize=${pageSize}`,
  //   method: "post",
  //   queryCondition,
  // });
}

// 地图上获取点位
export function fetchMarker(data) {
  return request.post(`/setting/marker`, { data });
}

// 保存区域网格
export function saveAreaGrid(data) {
  let {
    name: gridName,
    manager: responsiblePerson,
    latlngs: gridLatLng,
    contact,
    priority,
  } = data;
  return request.post(`/area-grid`, {
    gridName,
    responsiblePerson,
    gridLatLng,
    contact,
    priority,
  });
}

// 获取所有区域网格
export function fetchAreaGrids() {
  return request.get(`/area-grid`);
}
