<template>
  <div id="app">
    <component :is="layout">
       <router-view></router-view>
    </component>
  </div>
</template>

<script>
const default_layout = "default";
import MainLaout from "./layouts/main-layout.vue";
import BlogLayout from "./layouts/BlogLayout.vue";
export default {
  name: 'App',
  components: {
    'default-layout':MainLaout,
    'blog-layout':BlogLayout
  },
  computed:{
    layout(){
      return (this.$route.meta.layout || default_layout) + '-layout'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
