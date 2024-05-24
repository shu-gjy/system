import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // dashboard
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/m2',
    component: Layout,
    redirect: 'noRedirect',
    name: 'modelShow',
    meta: { title: '模型侦测展示', icon: 'el-icon-data-analysis' },
    children: [
      {
        path: 'gamble',
        name: 'gamble',
        component: () => import('@/views/model/data'),
        meta: {
          title: '数据上传及处理',
          icon: 'gamble'
        }
      }
    ]
  },
  {
    path: '/m1',
    component: Layout,
    redirect: 'noRedirect',
    name: 'modelShow',
    meta: { title: '模型侦测展示', icon: 'el-icon-data-analysis' },
    children: [
      {
        path: 'credit',
        name: 'credit',
        component: () => import('@/views/model/apgnn'),
        meta: {
          title: '同构图欺诈检测',
          icon: 'cash'
        }
      }
    ]
  },


  {
    path: '/m3',
    component: Layout,
    redirect: 'noRedirect',
    name: 'modelShow',
    meta: { title: '模型侦测展示', icon: 'el-icon-data-analysis' },
    children: [
      {
        path: 'market',
        name: 'market',
        component: () => import('@/views/model/tahia'),
        meta: {
          title: '异构图欺诈检测',
          icon: 'scalper' }
      }
    ]
  },
  {
    path: '/m4',
    component: Layout,
    redirect: 'noRedirect',
    name: 'modelShow',
    meta: { title: '模型侦测展示', icon: 'el-icon-data-analysis' },
    children: [
      {
        path: 'credit',
        name: 'credit',
        component: () => import('@/views/model/dytes'),
        meta: {
          title: '动态图欺诈检测',
          icon: 'cash'
        }
      }
    ]
  },
  // {
  //   path: '/m4',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'modelShow',
  //   meta: { title: '模型侦测展示', icon: 'el-icon-data-analysis' },
  //   children: [
  //     {
  //       path: 'regist',
  //       name: 'register',
  //       component: () => import('@/views/model/regist'),
  //       meta: {
  //         title: '伪冒注册',
  //         icon: 'fake' }
  //     }
  //   ]
  // },
  // {
  //   path: '/m5',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'modelShow',
  //   meta: { title: '模型侦测展示', icon: 'el-icon-data-analysis' },
  //   children: [
  //     {
  //       path: 'storeIllegal',
  //       name: 'store',
  //       component: () => import('@/views/model/storeIllegal'),
  //       meta: {
  //         title: '商户违规',
  //         icon: 'illegal' }
  //     }
  //   ]
  // },
  // {
  //   path: '/m6',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'modelShow',
  //   meta: { title: '模型侦测展示', icon: 'el-icon-data-analysis' },
  //   children: [
  //     {
  //       path: 'abnormal',
  //       name: 'abnormal',
  //       component: () => import('@/views/model/abnormal'),
  //       meta: {
  //         title: '异常转账欺诈',
  //         icon: 'transfer' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
