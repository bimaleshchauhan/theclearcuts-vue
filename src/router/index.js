import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home';
import About from '../pages/aboutus'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta:{layout:'default'}
    },
    {
      path: '/about',
      name: 'About',
      meta:{layout:'blog'},
      component: About
    },
    
  ],
   mode:"history" 
})