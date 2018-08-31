import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/list/:categoryName',
      name: 'list',
      component: () => import('@/views/ArticleList.vue'),
      props: true,
      meta: {
        title: '文章列表',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/ArticleViewer.vue'),
      props: {
        id: 'about',
      },
      meta: {
        title: '关于',
      },
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('@/views/ArticleViewer.vue'),
      props: true,
      meta: {
        title: '文章',
      },
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/404.vue'),
      meta: {
        title: '404',
      },
    },
  ],
});
