<template>
    <div class="article-list-wrapper">
        <div v-for="category in shownCategories">
            <CategoryBox :category="category"></CategoryBox>
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {State, Action} from 'vuex-class';
import CategoryBox from '@/components/CategoryBox.vue';

@Component({
    components: {
        CategoryBox,
    },
})
export default class ArticleList extends Vue {
    @Prop(String) private categoryName: string;
    @State('articleInCategory') private articleInCategory: {[name: string]: string[]};
    @State('categories') private articleCategories: string[];
    @Action('fetchCategories') private fetchCategories: () => void;

    get shownCategories() {
        if (this.categoryName === 'all') {
            return this.articleCategories;
        } else {
            return [this.categoryName];
        }
    }

    private async checkCategoryName() {
        await this.fetchCategories();
        if (!this.articleCategories.includes(this.categoryName) && this.categoryName !== 'all') {
            this.$router.push('/');
        }
    }

    private beforeMount() {
        this.checkCategoryName();
    }
}
</script>
