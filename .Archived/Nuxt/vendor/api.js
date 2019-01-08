import axios from 'axios'
import { pickBy } from 'lodash'
import querystring from 'querystring'

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else if (response.status === 401) {
    throw new Error('授权已过期')
  } else if (response.status === 403) {
    throw new Error('没有权限')
  } else if (response.status === 404) {
    throw new Error('数据不存在')
  } else if (response.status >= 500) {
    throw new Error('服务异常')
  } else {
    throw new Error(response.data.message || '无法连接服务器')
  }
}

var instance = axios.create({
  baseURL: 'https://api.c2si.me/wildcors/'
})

function call (path, params, method) {
  let args = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (params) {
    if (method === 'get') {
      // 过滤掉不合理的查询条件
      params = pickBy(params, val => val !== null && val !== undefined && val !== '')
      path += ('?' + querystring.stringify(params))
    } else {
      args.body = JSON.stringify(params)
    }
  }

  return instance[method](path, args)
    .then(checkStatus)
    .then(res => {
      return res.data
    })
}

function get (path, params = {}) {
  return call(path, params, 'get')
}

function post (path, params = {}) {
  return call(path, params, 'post')
}

function del (path, params = {}) {
  return call(path, params, 'delete')
}

function put (path, params = {}) {
  return call(path, params, 'put')
}

function patch (path, params = {}) {
  return call(path, params, 'patch')
}

export default { get, post, del, put, patch }