import Vue from 'vue'
import App from './App.vue'

Vue.directive('highlight', {
  bind(el, binding, vnode) {
    // el.style.backgroundColor = binding.value;
    //modifiers: . like .lazy.number
    //attrs: directive:modifier
    var delay = 0;
    if (binding.modifiers['delayed']) {
      delay = 3000;
    }
    setTimeout(() => {
      if (binding.arg == 'background') {
        el.style.backgroundColor = binding.value;
      } else {
        el.style.color = binding.value;
      }
    } , delay)
   

  }

});
new Vue({
  el: '#app',
  render: h => h(App)
})
