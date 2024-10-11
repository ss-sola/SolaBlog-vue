import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/blog/linux-程序安装/centos安装'
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/views/Index.vue')
    },
    {
      path: '/blog/:groupName/:fileName',
      name: 'blog',
      component: () => import('@/views/Blog.vue')
    }
  ]
})

export default router
