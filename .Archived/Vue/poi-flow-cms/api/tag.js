import fetch from './http'

export function fetchAll () {
  return fetch.get('/tag')
}

export function create (payload) {
  return fetch.post(`/tag`, payload)
}

export function update ({id, name, comment}) {
  return fetch.put(`/tag/${id}`, {name, comment})
}
