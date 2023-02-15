// import store from '@/store/index'; // 사용할 때 import
import { createRouter, createWebHistory } from 'vue-router';

import PageHome from '@/views/PageHome.vue';
import BoardPage from '@/views/board/BoardPage.vue';
import PostListPage from '@/views/board/PostListPage.vue';
import PostDetailPage from '@/views/board/PostDetailPage.vue';
import PostWritePage from '@/views/board/PostWritePage.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  duplicateNavigationPolicy: 'reload',
  routes: [
    {
      path: '/',
      name: 'PageHome',
      component: PageHome,
    },
    {
      path: '/about',
      name: 'About',
      //meta: { auth: true },
      component: () => import('@/views/PageAbout.vue'),
    },
    {
      path: '/post',
      component: BoardPage,
      redirect: '/post/list',
      children: [
        {
          path: 'list',
          component: PostListPage,
        },
        {
          path: ':idx',
          component: PostDetailPage,
        },
        {
          path: ':idx/edit',
          component: PostWritePage,
        },
        {
          path: 'write',
          component: PostWritePage,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/NotFoundPage.vue'),
    },
  ],
});

export default router;
