import * as userModel from '../api/user'
import httpClient from '../api/http'

export default {
  state: {
    token: null,
    auth: null,
    users: {}
  },
  getters: {
    isAuthed (state) {
      return !!state.users
    }
  },
  mutations: {
    cacheUser (state, user) {
      state.users[user.u_id] = user
    },
    updateAuth (state, payload) {
      const { token ,user } = payload
      state.token = token
      state.auth = user
      window.localStorage.setItem('auth', JSON.stringify(payload))
      if (token) {
        httpClient.setHeaders('Authorization', token)
      } else {
        httpClient.removeHeaders('Authorization')
      }
    }
  },
  actions: {
    clearAuth ({commit}) {
      commit('updateAuth', {
        token: null,
        auth: null
      })
    },
    async submitAuth ({commit}, payload) {
      try {
        commit('addLoading', 'user')
        commit('updateAuth', await userModel.fetchUserAuth(payload))
      } catch (error) {
        commit('addError', error)
      } finally {
        commit('removeLoading', 'user')
      }
    },
    fetchUser (ctx) {

    }
  }
}