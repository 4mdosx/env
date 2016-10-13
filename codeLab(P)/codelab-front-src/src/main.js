import Vue from 'vue'
import App from './App'
import  Ajax from './js/ajaxSimulator'
/* eslint-disable no-new */

new Vue({
  el: '#app',
  render: h => h(App)
})

var ajax = Ajax();
