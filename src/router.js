import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue'),
    },
    {
      path: '/home',
      component: () => import('@/components/Home.vue'),
      redirect: '/content',
      children: [
        {
          path: '/content',
          component: () => import('@/components/Content.vue'),
        },
        {
          path: '/users',
          component: () => import('@/components/user/Users.vue'),
        },
      ],
    },
  ],
});

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // next() 放行 next("/login") 强制跳转
  if (to.path === '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token');
  if (!tokenStr) return next('/login');
  next();
});

export default router;
