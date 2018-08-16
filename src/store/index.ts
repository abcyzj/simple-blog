import Vue from 'vue';
import Vuex from 'vuex';
import {Article} from './Article';

Vue.use(Vuex);

export interface ArticleDict {
  [id: string]: Article;
}

export interface ArticleList {
  [name: string]: string[];
}

function sleep(ms: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
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
      await sleep(1000);
      commit('fetchCategories', ['思索', '所见']);
    },
    fetchLists: async ({commit}, category: string) => {
      await sleep(1000);
      commit('fetchLists', {category, ids: ['1', '2', '3', '4', '5', '6', '7']});
    },
  },
});
