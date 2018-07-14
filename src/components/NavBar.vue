<template>
    <div id="navigation">
        <nav class="top-bar">
            <ul class="left-list">
                <li class="avatar">
                    <a href="/">
                    <img src="@/assets/avatar.jpg" height="65" width="65" style="border-radius: 5px;"/>
                    </a>
                </li>
                <li @mouseover="showCategoryMenu = true" @mouseout="showCategoryMenu = false">
                    <a href="#">闲谈</a>
                    <ul class="dropdown-menu" v-show="showCategoryMenu">
                        <li v-for="category in articleCategories">
                            <a href="#">{{ category }}</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">关于</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
    private articleCategories: string[] = ['思考', '旅行'];
    private showCategoryMenu: boolean = false;
}
</script>


<style scoped>
.top-bar {
    background: linear-gradient(to right, rgba(107,183,86,0.95), #008f68);
    height: 3.75rem;
    width: 100%;
    overflow: visible;
    margin-bottom: 0;
}
.top-bar ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: auto;
}
.top-bar ul.dropdown-menu {
    text-align: center;
    position: absolute;
    display: block;
    columns: 86.4px 1;
    background: #398f00;
    border-radius: 5px;
}
.left-list {
    float: left;
}
.top-bar li {
    height: 3.7em;
    padding: 0;
    margin: 0;
    float: left;
}
.top-bar a {
    font-size: 1.2em;
    line-height: 3.2em;
    padding: 0 1.25em;
    display: block;
    width: 100%;
    color: white;
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
}
.top-bar a:hover {
    color: wheat;
}
.avatar img {
    transform: translateY(0.4em);
    transition: 0.5s cubic-bezier(0.215, 0.610, 0.355, 1);
}
.avatar img:hover {
    transform: translateY(1em) rotate(-5deg) scale(1.2)
}
*, ::after, ::before {
    box-sizing: border-box;
}
</style>