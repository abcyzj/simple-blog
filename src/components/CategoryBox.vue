<template>
    <div class="category-box">
        <hr>
        <p class="category-title">
            {{ category }}
        </p>
        <div class="article-wrapper">
            <div class="flex">
                <router-link class="article-teaser" v-for="article in shownArticles" :to="{name: 'article', params: {id: article.id}}" :title="article.excerpt" :key="article.id">
                    <h3>{{ article.title }}</h3>
                </router-link>
            </div>
        </div>
        <p v-show="shownArticles.length < totalArticleNum" :style="{textAlign: 'center', margin: 0}">
            <a class="btn-small" @click="addArticles">更多</a>
        </p>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator';
import {State, Action} from 'vuex-class';
import { setTimeout } from 'timers';

interface Article {
    title: string;
    excerpt: string;
    id: string;
}

// for test
function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

@Component
export default class CategoryBox extends Vue {
    @Prop(String) private category: string;
    @Prop({type: Number, default: 6}) private numberOfArticles: number;
    @Prop({type: Number, default: 3}) private numberPerAdd: number;
    @State('articleInCategory') private articleInCategory: {[name: string]: string[]};
    @Action('fetchLists') private fetchLists: (category: string) => void;

    private shownArticles: Article[] = [];
    private totalArticleNum: number = 0;

    private async initArticles() {
        this.shownArticles = [];
        await this.fetchLists(this.category);
        this.totalArticleNum = this.articleInCategory[this.category].length;
        let ids = this.articleInCategory[this.category].slice(0, this.numberOfArticles);
        for (let id of ids) {
            this.shownArticles.push({
                title: '',
                excerpt: '',
                id,
            });
        }
        for (let article of this.shownArticles) {
            this.getArticleInfo(article);
        }
    }

    private async addArticles() {
        let ids = this.articleInCategory[this.category].slice(this.shownArticles.length, this.shownArticles.length + this.numberPerAdd);
        for (let id of ids) {
            this.shownArticles.push({
                title: '',
                excerpt: '',
                id,
            });
        }
        for (let i = this.shownArticles.length - this.numberPerAdd; i < this.shownArticles.length; i++) {
            this.getArticleInfo(this.shownArticles[i]);
        }
    }

    private async getArticleInfo(article: Article) {
        await sleep(300);
        Vue.set(article, 'title', '在北京的一天');
        Vue.set(article, 'excerpt', '舒服');
    }

    private async addMoreArticles() {
        let curNumOfArticles = this.shownArticles.length;
        let newIds = this.articleInCategory[this.category].slice(curNumOfArticles, curNumOfArticles + 5);
        for (let id of newIds) {
            let newArticle: Article = {
                title: '',
                excerpt: '',
                id,
            };
            this.shownArticles.push(newArticle);
            this.getArticleInfo(newArticle);
        }
    }

    private mounted() {
        this.initArticles();
    }

    @Watch('category')
    private onCategoryChanged() {
        this.initArticles();
    }
}
</script>

<style scoped>
hr {
    width: 15%;
    border-top: 4px solid #FAE042;
    margin: 2.5em auto 2.3em;
    box-sizing: border-box;
}
.category-title {
    color: #41B883;
    margin-bottom: 0;
    font-size: 1.5em;
    margin-top: 1.5em;
    text-align: center;
}
.article-wrapper {
    max-width: 55rem;
    margin: 0 auto;
    padding: 0 0.9rem;
    box-sizing: border-box;
}
.flex {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    margin: 0;
    padding: 0;
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    line-height: 1.6;
    font-weight: 300;
}
.article-teaser {
    text-decoration: none;
    text-align: center;
    color: #4AAE9B;
    transition: all 0.2s;
    display: flex;
    border-radius: 3px;
    align-items: center;
    box-shadow: 1px 1px 15px rgba(67,38,100,0.15);
    padding: 1.85rem;
    background: #fcfcfc linear-gradient(135deg, #41B883 10px, rgba(0,0,0,0.01) 0);
    margin: 1em .7em;
    hyphens: auto;
    word-break: break-all;
    justify-content: center;
}
.article-teaser:hover {
    transform: translateY(-2px);
}
.btn-small {
    cursor: pointer;
    background-image: linear-gradient(to bottom, #fff, #f8f8f8);
    border-radius: 8px;
    color: #4AAE9B;
    letter-spacing: 1px;
    padding: 10px 20px;
    border: 0;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    text-decoration: none;
}
</style>
