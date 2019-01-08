import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import tag from './tag'
import post from './post'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: {},
    errors: []
  },
  getters: {
    isLoading (state) {
      return !!state.loading.size
    }
  },
  mutations: {
    addLoading (state, name) {
      state.loading = {
        ...state.loading,
        [name]:  state.loading[name] ? state.loading[name] + 1 : 1
      }
    },
    removeLoading (state, name) {
      if (name) {
        state.loading = {
          ...state.loading,
          [name]:  state.loading[name] - 1
        }
      } else {
        state.loading = {}
      }
    },
    addError (state, err) {
      state.errors = [err, ...state.errors.splice(19)]
    }
  },
  actions: {
    init ({commit}) {
      const auth = JSON.parse(window.localStorage.getItem('auth'))
      if (auth) commit('updateAuth', auth)
    }
  },
  modules: {
    user, tag, post
  }
})