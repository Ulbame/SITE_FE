import { createRouter, createWebHistory } from 'vue-router';
import store from '@/vuex/store';

import MainPage from '@/views/MainPage.vue';
import BoardPage from '@/views/board/BoardPage.vue';
import PostListPage from '@/views/board/PostListPage.vue';
import PostDetailPage from '@/views/board/PostDetailPage.vue';
import LoginPage from '@/views/common/LoginPage.vue';
import SignupPage from '@/views/common/SignupPage.vue';

const requireAuth = () => (from, to, next) => {
  const token = localStorage.getItem('user_token');
  if (token) {
    store.state.isLogin = true;
    return next();
  } // isLogin === true면 페이지 이동
  next('/login'); // isLogin === false면 다시 로그인 화면으로 이동
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
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/signup',
      component: SignupPage,
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/NotFoundPage.vue'),
    },
  ],
});

export default router;
