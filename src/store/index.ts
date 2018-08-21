import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export interface ArticleList {
  [name: string]: string[];
}

export default new Vuex.Store({
  state: {
    categories: [] as string[], // 类别列表
    articleInCategory: {} as ArticleList, // 每个分类对应的Article id
  },
  mutations: {
    fetchCategories: (state, categories: string[]) => {
      state.categories = categories;
    },
    fetchLists: (state, info: {category: string, ids: string[]}) => {
      Vue.set(state.articleInCategory, info.category, info.ids); // 直接赋值会导致Vue无法检测变化
    },
  },
  actions: {
    fetchCategories: async ({commit}) => {
      let res = await axios.get('/api/categories');
      if (res.status !== 200) {
        return;
      }
      commit('fetchCategories', res.data);
    },
    fetchLists: async ({commit}, category: string) => {
      let res = await axios.get(`/api/list/${category}`);
      if (res.status !== 200) {
        return;
      }
      commit('fetchLists', {category, ids: res.data});
    },
  },
});
