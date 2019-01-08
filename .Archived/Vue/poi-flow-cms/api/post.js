import fetch from './http'

export function fetchList (params) {
  return fetch.get('/post', params)
}

export function fetchByTag (tagId, params) {
  return fetch.get(`/post/query`, {
    tag: tagId,
    ...params
  })
}
export function fetchContent (docId) {
  return fetch.get(`/post/${docId}`)
}

export function create (payload) {
  return fetch.post(`/post`, payload)
}

export function update (docId, payload) {
  return fetch.put(`/post/${docId}`, payload)
}

export function remove (docId) {
  return fetch.delete(`/post/${docId}`)
}