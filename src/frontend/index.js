import Vue from 'vue'
import Root from './root.vue'
import LoginScreen from './login-screen.vue'
import PhotoViewer from './photo-viewer.vue'

var app = new Vue({
  el: '#app',
   template: '<Root/>',
   components: { Root },
   render: h => h(Root)
})
