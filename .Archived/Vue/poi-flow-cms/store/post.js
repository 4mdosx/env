import * as postModel from '../api/post'

const emptyPost = {
  doc_id: null,
  doctype: null,
  title: null,
  uri_name: null,
  summary: null,
  content: null,
  tag: [],
  update_at: '',
  create_at: ''
}
export default {
  state: {
    updateCount: 0,
    focus: Object.assign({}, emptyPost)
  },
  getters: {
    showPost: state => {
      return !!state.focus.doc_id
    }
  },
  mutations: {
    updatePost (state, payload) {
      state.focus = {...state.focus, ...payload}
    },
    updatePostCountAdd (state) {
      state.updateCount++
    },
    blurPost (state, id) {
      if (id && id !== state.focus.doc_id) return
      state.focus = Object.assign({}, emptyPost)
    }
  },
  actions: {
    async callPost ({commit}, {id}) {
      try {
        commit('addLoading', 'post')
        commit('updatePost', {doc_id: id})
        commit('updatePost', await postModel.fetchContent(id))
      } catch (error) {
        commit('addError', error)
      } finally {
        commit('removeLoading', 'post')
      }
    }
  }
}