'use strict'
const Key = require('./key')
const Manual = require('./manual')
const path = require('path')

module.exports = appInfo => {
  const config = exports = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + Key.appKey

  config.uuidKey = Key.uuidKye

  // add your config here
  config.middleware = ['errorHandler', 'auth']
  config.mysql = {
    client: {
      ...Key.mysqlKey
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false
  }
  exports.security = {
    csrf: {
      ignore: ctx => true
    },
    domainWhiteList: ['http://localhost:4000', '.c2si.me']
  }
  config.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.nj': 'nunjucks'
    },
    defaultExtension: '.nj'
  }
  return config
}
