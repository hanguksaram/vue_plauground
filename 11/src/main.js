import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueResource)
//way to set global endpoint
Vue.http.options.root = 'https://vuejshttp-2cd66.firebaseio.com/';
// Vue.http.interceptors.push((request, next) => {
//     past code to activate spinner for example
//   next(response => {
//       disable spinner here
//   })
// })


new Vue({
  el: '#app',
  render: h => h(App)
})
