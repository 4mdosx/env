import fetch from './http'

export function fetchUserAuth ({username, password}) {
  return fetch.post('/auth', {
    email: username,
    password
  })
}