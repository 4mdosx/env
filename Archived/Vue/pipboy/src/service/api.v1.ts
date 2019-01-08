import request from '@src/utils/request'
import { rootURL } from '@src/appConfig/index'
const JSON_DEFAULT_HEADER = {
  headers: {
    'content-type': 'application/json'
  }
}

const credentialRequest = function (url: string, options: any = {}) {
  return request(url, {
    ...options
  })
}

// auth
export const requestAuth = function (authPayload?: any) {
  let havePayload = !!authPayload
  const action = havePayload ? 'login' : 'logout'
  const method = havePayload ? 'POST' : 'GET'
  return credentialRequest(`${rootURL}/v1/auth/${action}`, {
    ...JSON_DEFAULT_HEADER,
    method,
    body: JSON.stringify(authPayload)
  })
}

export const keepFreshing = function () {
  return credentialRequest(`${rootURL}/v1/auth/me`)
}

// resource
export const fetchTagList = function () {
  return credentialRequest(`${rootURL}/v1/tag`)
}

export const fetchPostList = function () {
  return credentialRequest(`${rootURL}/v1/post`)
}

export const fetchPost = function (id: string) {
  return credentialRequest(`${rootURL}/v1/post/${id}`)
}

export const updatePost = function (id: string, formData: any) {
  return credentialRequest(`${rootURL}/v1/post/${id}`, {
    ...JSON_DEFAULT_HEADER,
    method: 'PUT',
    body: JSON.stringify(formData)
  })
}

export const createPost = function (formData: any) {
  return credentialRequest(`${rootURL}/v1/post`, {
    ...JSON_DEFAULT_HEADER,
    method: 'POST',
    body: JSON.stringify(formData)
  })
}

export const queryPost = function(queryParams: string) {
  if (queryParams) {
    return credentialRequest(`${rootURL}/v1/post/query${queryParams}`)
  } else {
    return credentialRequest(`${rootURL}/v1/post`)
  }
}

export const deletePost = function(id: string) {
  return credentialRequest(`${rootURL}/v1/post/${id}`, {
    ...JSON_DEFAULT_HEADER,
    method: 'DELETE'
  })
}

export const createTag = function (formData: any) {
  return credentialRequest(`${rootURL}/v1/tag`, {
    ...JSON_DEFAULT_HEADER,
    method: 'POST',
    body: JSON.stringify(formData)
  })
}

export const fetchTag = function (query: string) {
  return credentialRequest(`${rootURL}/v1/tag/${query}`)
}

// 3p-api
export const test = function (payload: any) {
  return request('https://api.github.com')
}