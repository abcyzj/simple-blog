<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
    <Footer></Footer>
    <TopButton :visibleOffset="600"></TopButton>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';
import TopButton from '@/components/TopButton.vue';

@Component({
  components: {
    NavBar,
    Footer,
    TopButton,
  },
})
export default class App extends Vue {}
</script>

<style>
body {
  margin: 0;
  background: #fafafa;
}
a {
  text-decoration: none;
}
</style>
