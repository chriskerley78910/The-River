import Vue from 'vue'
import Root from './components/root.vue'

var app = new Vue({
  el: '#app',
   template: '<Root/>',
   components: { Root },
   render: h => h(Root)
})
