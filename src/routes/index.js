// import store from '@/store/index'; // 사용할 때 import
import { createRouter, createWebHistory } from 'vue-router';

import PageHome from '@/views/PageHome.vue';
import BoardList from '@/views/board/BoardList.vue';

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
      component: () => import('../views/PageAbout.vue'),
    },
    {
      path: '/board/list',
      name: 'BoardList',
      component: BoardList
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
