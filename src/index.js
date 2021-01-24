import _ from 'lodash';
import './style.css'
import Logo from './logo.png'
import Vue from 'vue'
import Root from './root.vue'

var app = new Vue({
  el: '#app',
  render:handle => handle(Root)
})
