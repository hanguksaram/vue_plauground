import Vue from 'vue'
import App from './App.vue'

export const eventBus = new Vue({
  methods: {//way to emit events directly via bus
    emitRandom(random) {
      this.$emit('randomEvent', random)
    }
  }
}); //bus to create data flow between any lvls components

new Vue({
  el: '#app',
  render: h => h(App)
})

