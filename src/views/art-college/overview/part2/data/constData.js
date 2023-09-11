export const levelMaps = {
  // 楼层映射表， 用于显示楼层名
  b1: "负一层",
  level1: "一层",
  level2: "二层",
  level3: "三层",
  level4: "四层",
  level5: "五层",
  level6: "六层",
  level7: "七层",
  level8: "八层",
};

export const buildingFloorPlanData = {
  // 保存各个楼层的json文件请求地址
  fengyucaochang: {
    // 风雨操场
    level1: "fengyucaochang1.json",
    level2: "fengyucaochang2.json",
    level3: "fengyucaochang3.json",
    level4: "fengyucaochang4.json",
  },
  kantai: {
    level1: "kantai1.json",
    level2: "kantai2.json",
  },
  shitang: {
    level1: "shitang1.json",
    level2: "shitang2.json",
    level3: "shitang3.json",
  },
  xingzhenglou: {
    level1: "xingzhegnlou1.json",
    level2: "xingzhegnlou2.json",
    level3: "xingzhegnlou3.json",
  },
  jiaoxuelou: {
    level1: "jiaoxuelou1.json",
    level2: "jiaoxuelou2.json",
    level3: "jiaoxuelou3.json",
    level4: "jiaoxuelou4.json",
    level5: "jiaoxuelou5.json",
  },
  meishuguan: {
    b1: "meishuguan-b1.json",
    level1: "meishuguan1.json",
    level2: "meishuguan2.json",
    level3: "meishuguan3.json",
  },
  yishuxi: {
    level1: "yishuxi1.json",
    level2: "yishuxi2.json",
    level3: "yishuxi3.json",
    level4: "yishuxi4.json",
  },
  yinyuelou: {
    level1: "yinyuelou1.json",
    level2: "yinyuelou2.json",
    level3: "yinyuelou3.json",
    level4: "yinyuelou4.json",
    level5: "yinyuelou5.json",
  },
  sushelou1: {
    level1: "sushelou11.json",
    level2: "sushelou12.json",
    level3: "sushelou13.json",
    level4: "sushelou14.json",
    level5: "sushelou15.json",
    level6: "sushelou16.json",
  },
};

export const buildingOutlinePlanData = [
  // 保存每个建筑的轮廓数据， 用于加载总平面图
  {
    build: "tianjingchang",
    path: "playground.json",
  },
  {
    build: "fengyucaochang",
    path: "fengyucaochang-first.json",
    name: "风雨操场",
  },
  {
    build: "jiaoxuelou",
    path: "jiaoxuelou-first.json",
    name: "教学楼",
  },
  {
    build: "kantai",
    path: "kantai-first.json",
    name: "看台",
  },
  {
    build: "menwei",
    path: "menwei-first.json",
    name: "门卫",
  },
  {
    build: "shitang",
    path: "shitang-first.json",
    name: "食堂",
  },
  {
    build: "meishuguan",
    path: "meishuguan-first.json",
    name: "图书馆&美术馆",
  },
  // {
  //     build: 'wudaoxi',
  //     path: "wudaoxi-first.json",
  //     name: '舞蹈系'
  // },
  {
    build: "xingzhenglou",
    path: "xingzhegnlou-first.json",
    name: "行政楼",
  },
  {
    build: "sushelou1",
    path: "sushelou1-first.json",
    name: "学生宿舍一号楼",
  },
  {
    build: "yishuxi",
    path: "yishuxi-first.json",
    name: "艺术设计系",
  },
  {
    build: "yinyuelou",
    path: "yinyuelou-first.json",
    name: "音乐教学楼",
  },
];
