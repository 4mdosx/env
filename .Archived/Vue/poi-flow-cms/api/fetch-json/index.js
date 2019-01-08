import request from './request'
import { stringify } from 'query-string'

const JSONheaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json;charset=UTF-8'
}

function parseStatusText (err) {
  const status = Number(err.message)
  if (status === 403) {
    err.message = '没有权限'
  } else if (status === 404) {
    err.message = '数据不存在'
  } else if (status === 422) {
    err.message = '账号密码不匹配'
  } else if (status >= 500) {
    err.message = '服务异常'
  } else {
    err.message = '网络异常'
  }
  throw err
}

function bodyClear (data) {
  if (!data) return undefined
  Object.keys(data).forEach(key => {
    if (data.key === undefined) delete data.key
  })
  return JSON.stringify(data)
}

class Fetch {
  constructor (params) {
    Object.assign(this, params)
    this.headers = Object.assign({}, JSONheaders, params.headers)
    this.options = params
  }
  format (res) {
    return res.data
  }
  setHeaders (key, val) {
    this.headers[key] = val
  }
  removeHeaders (key) {
    delete this.headers[key]
  }
  get (url, payload, {params, headers} = {}) {
    const queryStr = stringify({...payload, ...params})
    return request(`${this.baseURL}${url}?${queryStr}`, {
      headers: Object.assign({}, this.headers, headers)
    }).then(res => this.format(res)).catch(err => parseStatusText(err))
  }
  post (url, payload, {params, headers} = {}) {
    const queryStr = stringify(params)
    return request(`${this.baseURL}${url}?${queryStr}`, {
      method: 'POST',
      headers: Object.assign({}, this.headers, headers),
      body: bodyClear(payload)
    }).then(res => this.format(res)).catch(err => parseStatusText(err))
  }
  put (url, payload, {params, headers} = {}) {
    const queryStr = stringify(params)
    return request(`${this.baseURL}${url}?${queryStr}`, {
      method: 'PUT',
      headers: Object.assign({}, this.headers, headers),
      body: bodyClear(payload)
    }).then(res => this.format(res)).catch(err => parseStatusText(err))
  }
  delete (url, payload, {params, headers} = {}) {
    const queryStr = stringify(params)
    return request(`${this.baseURL}${url}?${queryStr}`, {
      method: 'DELETE',
      headers: Object.assign({}, JSONheaders, this.headers),
      body: bodyClear(payload)
    }).then(res => this.format(res)).catch(err => parseStatusText(err))
  }
}

export default Fetch