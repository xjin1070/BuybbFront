import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import layout from '@/layout'
import icon from 'element-ui/packages/icon'

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
    path: '/',
    redirect: '/login'
    // redirect: '/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'login'
  },

  {
    path: '/404',
    component: () => import('@/views/404')
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    name: 'register'
  },

  {
    path: '/home',
    show: true,
    component: Layout,
    redirect: '/home/date',
    children: [
      {
        path: 'date',
        name: 'Date',
        component: () => import('@/views/User/index'),
        meta: { title: '个人信息', icon: 'el-icon-user' }
      }
    ]
  },
  {
    path: '/order',
    show: true,
    component: Layout,
    meta: {
      title: '订单管理',
      icon: 'el-icon-s-order'
    },
    children: [
      {
        path: 'user',
        name: 'everyOrder',
        component: () => import('@/views/acl/order/everyOrder'),
        meta: { title: '所有订单' },
        show: true
      }
      // {
      //   path: 'users',
      //   name: 'orderManagement',
      //   component: () => import('@/views/acl/order/orderManagement'),
      //   meta: { title: '订单管理' },
      //   show: true
      // }
    ]
  },

  {
    name: 'Acl',
    path: '/acl',
    show: true,
    component: Layout,
    redirect: '/acl/user/list',
    meta: {
      title: '商品管理',
      icon: 'el-icon-goods'
    },
    children: [
      {
        name: 'Role',
        path: 'role/list',
        show: true,
        component: () => import('@/views/acl/product/proType'),
        meta: {
          title: '商品类型管理'
        }
      },
      {
        name: 'User',
        path: 'user/list',
        show: true,
        component: () => import('@/views/acl/product/everyPro'),
        meta: {
          title: '所有商品管理'
        }
      }
    ]
  },
  {
    path: '/User',
    show: true,
    component: layout,
    redirect: '/User/everyUser',
    children: [
      {
        path: 'everyUser',
        name: 'everyUser',
        component: () => import('@/views/User/everyUser'),
        meta: { title: '所有用户', icon: 'el-icon-s-custom' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
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

const pathArr = ['/home/date', '/acl', '/user', '/acl/user/list', '/acl/role/list', '/user/user']

router.beforeEach(function(to, from, next) {
  if (pathArr.indexOf(to.path) !== -1) {
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
