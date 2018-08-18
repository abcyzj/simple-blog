import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ArticleList from './views/ArticleList.vue';
import ArticleViewer from './views/ArticleViewer.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: '首页',
      },
    },
    {
      path: '/list/:categoryName',
      name: 'list',
      component: ArticleList,
      props: true,
      meta: {
        title: '文章列表',
      },
    },
    {
      path: '/about',
      name: 'about',
      component: ArticleViewer,
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
      component: ArticleViewer,
      props: true,
      meta: {
        title: '文章',
      },
    },
  ],
});
