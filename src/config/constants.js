export const Building = {
  Feng_Yu_Cao_Chang: { id: "fengyucaochang", text: "风雨操场" },
  Jiao_Xue_Lou: { id: "jiaoxuelou", text: "教学楼" },
  Kan_Tai: { id: "kantai", text: "看台" },
  Shi_Tang: { id: "shitang", text: "食堂" },
  Tu_Shu_Guan: { id: "meishuguan", text: "图书馆" },
  Shi_Jue_Chuan_Da: { id: "yishuxi", text: "视觉传达" },
  Xing_Zheng_Lou: { id: "xingzhenglou", text: "行政楼" },
};
export const Azimuth = {
  EAST: { code: "E", degree: 90, name: "东" },
  SOUTH: { code: "S", degree: 180, name: "南" },
  WEST: { code: "W", degree: 270, name: "西" },
  NORTH: { code: "N", degree: 0, name: "北" },
  SOUTHEAST: { code: "SE", degree: 135, name: "东南" },
  SOUTHWEST: { code: "SW", degree: 225, name: "西南" },
  NORTHWEST: { code: "NW", degree: 315, name: "西北" },
  NORTHEAST: { code: "NE", degree: 45, name: "东北" },
};
export const DEVICE_CONSTANTS = {
  DEVICE_TYPES: {
    1: "固定摄像机",
    2: "云台摄像机",
    3: "车辆卡口",
    4: "人脸识别",
    5: "速通门",
  },
  DEVICE_STATUS: {
    0: "离线",
    1: "在线",
  },
  DEVICE_ACTIONS: {
    1: {
      ACTIONS: [
        "preview",
        "playback",
        "wall",
        "alarm-query",
        "select",
        "cancel",
      ],
      TEXT_MAPPING: {
        preview: "预览",
        playback: "回放",
        wall: "上墙",
        "alarm-query": "告警查询",
        select: "选中",
        cancel: "取消",
      },
    },
    2: {
      ACTIONS: [
        "preview",
        "playback",
        "wall",
        "yuntai",
        "alarm-query",
        "select",
        "cancel",
      ],
      TEXT_MAPPING: {
        preview: "预览",
        playback: "回放",
        wall: "上墙",
        yuntai: "云台",
        "alarm-query": "告警查询",
        select: "选中",
        cancel: "取消",
      },
    },
    DEFAULT: {
      ACTIONS: [
        "preview",
        "playback",
        "wall",
        "alarm-query",
        "close",
        "select",
        "cancel",
      ],
      TEXT_MAPPING: {
        preview: "预览",
        playback: "回放",
        wall: "上墙",
        "alarm-query": "告警查询",
        close: "关闭",
        select: "选中",
        cancel: "取消",
      },
    },
  },
};
