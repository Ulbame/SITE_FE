import { createRouter, createWebHistory } from 'vue-router';
import store from '@/vuex/store';

import MainPage from '@/views/MainPage.vue';
import BoardPage from '@/views/board/BoardPage.vue';
import PostListPage from '@/views/board/PostListPage.vue';
import PostDetailPage from '@/views/board/PostDetailPage.vue';

const requireAuth = () => (from, to, next) => {
  const token = localStorage.getItem('user_token');
  if (token) {
    store.commit('IS_LOGIN', true);
    return next();
  } // isLogin === true면 페이지 이동
  else {
    store.commit('MODAL_COMPONENT', 'NeedLoginModal');
    store.commit('IS_MODAL_VIEWED', true);
  }
};

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  duplicateNavigationPolicy: 'reload',
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage,
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
      beforeEnter: requireAuth(),
      children: [
        {
          path: 'list',
          name: 'List',
          component: PostListPage,
          beforeEnter: requireAuth(),
        },
        {
          path: ':idx',
          component: PostDetailPage,
          beforeEnter: requireAuth(),
        },
        {
          path: ':idx/edit',
          component: PostDetailPage,
          beforeEnter: requireAuth(),
        },
        {
          path: 'write',
          component: PostDetailPage,
          beforeEnter: requireAuth(),
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
