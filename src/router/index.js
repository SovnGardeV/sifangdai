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
    icon: 'svg-name'             the icon show in the sidebar
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
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

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
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '示例', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '表格', icon: 'node' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '树', icon: 'node' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }

  // 404 page must be placed at the end !!!

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

export const asynRouter = [
  {
    path: '/form',
    component: Layout,
    redirect: '/form/index',
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '收款方式管理', icon: 'nested' }
      }
    ]
  },
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/index',
    name: 'Nested',
    children: [
      {
        path: 'index',
        component: () => import('@/views/nested/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '菜单管理', icon: 'tree' }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/index',
    name: 'Config',
    children: [
      {
        path: 'index',
        component: () => import('@/views/config/index'), // Parent router-view
        name: 'Config1',
        meta: { title: '配置管理', icon: 'config' }
      }
    ]
  },
  {
    path: '/userlist',
    component: Layout,
    redirect: '/userlist/index',
    name: 'User',
    children: [
      {
        path: 'index',
        component: () => import('@/views/user/index'), // Parent router-view
        name: 'UserList',
        meta: { title: '用户管理', icon: 'user', activeMenu: '/userlist' },
        children: [
          {
            path: 'info',
            name: 'UserInfo',
            component: () => import('@/views/user/info'),
            meta: { title: '查看信息', activeMenu: '/userlist' },
            hidden: true
          },
          {
            path: 'permission',
            name: 'UserPermisson',
            component: () => import('@/views/user/permission'),
            meta: { title: '分配权限', activeMenu: '/userlist' },
            hidden: true
          }
        ]
      }

    ]
  },
  {
    path: '/order',
    component: Layout,
    // redirect: '/nested/menu1',
    name: 'Order',
    children: [
      {
        path: 'index',
        component: () => import('@/views/order/index'), // Parent router-view
        name: 'Order',
        meta: { title: '订单管理', icon: 'form' }
      }
    ]
  }
  // { path: '*', redirect: '/404', hidden: true }
]

export default router
