import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// Vue.config.productionTip = false
Vue.prototype.$center=new Vue();

import common  from './common'
Vue.use(common)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

