import Vue from 'vue'
import Root from './components/root.vue'
import Vuex from 'vuex'
import { store } from './stores'

Vue.use(Vuex)

var app = new Vue({
  el: '#app',
   template: '<Root/>',
   components: { Root },
   store,
   render: h => h(Root)
})
