// import store from '@/store/index'; // 사용할 때 import
import { createRouter, createWebHistory } from 'vue-router';

import PageHome from '@/views/PageHome.vue';
import BoardPage from '@/views/board/BoardPage.vue';
import PostListPage from '@/views/board/PostListPage.vue';
import PostDetailPage from '@/views/board/PostDetailPage.vue';
import PostWritePage from '@/views/board/PostWritePage.vue';

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
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
      path: '/board',
      component: BoardPage,
      redirect: '/board/list',
      children: [
        {
          path: 'list',
          component: PostListPage
        },
        {
          path: 'post/:idx',
          component: PostDetailPage,
        },
        {
          path: 'edit/:idx',
          component: PostWritePage,
        },
        {
          path: 'write',
          component: PostWritePage,
        }
      ],
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/NotFoundPage.vue'),
    },
  ]
});

// 라우팅 가드? 용 소스
// router.beforeEach((to, from, next) => {
//   if (to.meta.auth && !store.getters.isLogin) {
//     alert('인증이 필요합니다.');
//     next('/login');
//     return;
//   }
//   next();
// });

export default router;