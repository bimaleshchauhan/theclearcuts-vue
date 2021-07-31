import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



// Vue.component('default-layout', MainLaout)
// Vue.component('blog-layout', BlogLayout)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
