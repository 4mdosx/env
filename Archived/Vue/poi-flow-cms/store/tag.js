import * as tagModel from '../api/tag'
import Vue from 'vue'

export default {
  state: {},
  getters: {
    tagsList (state) {
      return Object.entries(state)
    }
  },
  mutations: {
    cacheTag (state, payload) {
      if (payload.length) {
        payload.forEach(tag => Vue.set(state, tag.tag_id, tag))
      }
    }
  },
  actions: {
    async fetchTag ({commit}) {
      try {
        commit('addLoading', 'tag')
        commit('cacheTag', await tagModel.fetchAll())
      } catch (error) {
        commit('addError', error)
      } finally {
        commit('removeLoading', 'tag')
      }
    }
  }
}