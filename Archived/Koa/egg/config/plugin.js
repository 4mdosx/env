'use strict'

// had enabled by egg
// exports.static = true;
exports.cors = {
  enable: true,
  package: 'egg-cors',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
}

exports.mysql = {
  enable: true,
  package: 'egg-mysql'
}
exports.passport = {
  enable: true,
  package: 'egg-passport'
}
exports.validate = {
  package: 'egg-validate'
}
// config/plugin.js
exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}
