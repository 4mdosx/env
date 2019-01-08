import Vue from 'vue'
import store from './store'
import router from './router'
import Vuesax from 'vuesax'
import 'bulma'
import 'vuesax/dist/vuesax.css'
import './assets/global.sass'

Vue.use(Vuesax)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h('router-view'),
  mounted () {
    this.$store.dispatch('init')
  }
})
