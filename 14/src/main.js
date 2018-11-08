import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'

import router from './router'
import store from './store'

Vue.use(Vuelidate)

axios.defaults.baseURL = 'https://vuejshttp-2cd66.firebaseio.com/'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
