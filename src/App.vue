<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import NavBar from '@/components/NavBar.vue';
import Footer from '@/components/Footer.vue';

@Component({
  components: {
    NavBar,
    Footer,
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
