export default [
  {
    label: '首页',
    icon: require('../assets/images/home/home.png'),
    path: '/layout/index'
  },
  {
    label: '碳资产管理',
    icon: require('../assets/images/home/assets.png'),
    path: '/layout/organization',
    children: [
      // {
      //   label: '预分配配额',
      //   path: '/layout/quota'
      // },
      {
        label: 'CCER管理',
        path: '/layout/ccer'
      },
      {
        label: '配额管理',
        path: '/layout/asset-dyn'
      },
      {
        label: '资产审核',
        path: '/layout/asset-audit'
      },
      {
        label: '资产台账',
        path: '/layout/asset-book'
      },
      {
        label: '资产分析',
        path: '/layout/asset-analysis'
      },
      {
        label: '资产总览',
        path: '/layout/asset-overview'
      },
    ]
  },
  {
    label: '企业边界管理',
    icon: require('../assets/images/home/edge.png'),
    path: '/',
    children: [
      {
        label: '机组管理',
        path: '/layout/crew-manage/crew-index'
      },
      // {
      //   label: '新建机组',
      //   path: '/layout/crew-manage/add-crew'
      // },
      {
        label: '生产设施管理',
        path: '/layout/equip-manage'
      },
      {
        label: '主营产品及工艺',
        path: '/layout/workmanship'
      },
      {
        label: '数据确认',
        path: '/layout/data-confirm'
      },
      // {
      //   label: '行业分类',
      //   path: '/layout/industry-class'
      // }
    ]
  },
  {
    label: '碳盘查管理',
    icon: require('../assets/images/home/search.png'),
    path: '/',
    children: [
      {
        label: '活动水平数据',
        path: '/layout/emission-level'
      },
      {
        label: '排放台账',
        path: '/layout/emission-book'
      },
      {
        label: '数据审核',
        path: '/layout/emission-examine'
      },
      {
        label: '排放分析',
        path: '/layout/emssion-analysis'
      },
      {
        label: '排放总览',
        path: '/layout/emission-overview'
      },
      {
        label: '报告审核',
        path: '/layout/report-check'
      },
      {
        label: '报告归档',
        path: '/layout/report-doc'
      }
    ]
  },
  {
    label: '碳知识库',
    icon: require('../assets/images/home/zhishiku.png'),
    path: '/',
    children: [
      {
        label: '碳文档库',
        path: '/layout/carbon-record/knowledge'
      },
      {
        label: '碳基础库',
        path: '/layout/carbon-record/base'
      }
    ]
  },
  {
    label: '企业信息管理',
    icon: require('../assets/images/home/company.png'),
    path: '/',
    children: [
      {
        label: '企业信息维护',
        path: '/layout/company-maintain'
      },
      {
        label: '企业入驻审核',
        path: '/layout/check-in-audit'
      },
      {
        label: '组织机构',
        path: '/layout/organization-chart'
      },
      {
        label: '权限设置',
        path: '/layout/jurisdiction'
      },
      {
        label: '菜单管理',
        path: '/layout/mune-manage'
      },
      {
        label: '系统设置',
        path: '/layout/config-page'
      }
    ]
  }
]
