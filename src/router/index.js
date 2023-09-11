import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout";

Vue.use(Router);

export const constantRoutes = [
  {
    path: "/",
    redirect: "/overview-part1",
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main"),
    hidden: true,
  },
  {
    path: "/overview-part1",
    name: "overviewPart1",
    component: () => import("@/views/art-college/overview/part1/index"),
    hidden: true,
  },
  {
    path: "/overview-part2",
    name: "overviewPart2",
    component: () => import("@/views/art-college/overview/part2/index"),
    hidden: true,
  },
  {
    path: "/overview-part3",
    name: "overviewPart3",
    component: () => import("@/views/art-college/overview/part3/index"),
    hidden: true,
  },

  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/modify-password",
    name: "modifyPassword",
    component: () => import("@/views/modify-password/index"),
    hidden: true,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/register/index"),
    hidden: true,
  },
  {
    perm: 'base',
    path: '/base',
    component: Layout,
    hidden: false,
    meta: {
        "title": "系统管理",
        "icon": "system",
        "noCache": false
    },
    children: [
        {
            "perm": 'baseRole',
            "path": 'role-management',
            component: () => import('@/views/jurisdiction/components/role-page'),
            "name": 'baseRole',
            "meta": {
                "title": '角色管理',
            }
        },
        {
            "perm": 'baseJur',
            "path": 'jur-management',
            component: () => import('@/views/jurisdiction/components/jur-page'),
            "name": 'baseJur',
            "meta": {
                "title": '权限管理',
            }
        },
        {
            "perm": 'baseUser',
            "path": 'user-management',
            component: () => import('@/views/jurisdiction/components/user-page'),
            "name": 'baseUser',
            "meta": {
                "title": '管理员管理',
            }
        },

    ]
},
  {
    path: "/layout",
    component: Layout,
    name: "layout",
    hidden: true,
    redirect: "/layout/device-manager",
    children: [
      {
        path: "device-manager",
        name: "deviceManager",
        component: () => import("@/views/art-college/manager/device/index"),
      },
      {
        path: "plan-manager",
        name: "planManager",
        component: () => import("@/views/art-college/manager/plan/index"),
      },
    ],
  },
];

export const asyncRoutes = [];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
