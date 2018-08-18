const Service = require('egg').Service
const jwt = require('jsonwebtoken')
const config = require('../../config/key')

class crypto extends Service {
  verify (data) {
    return jwt.verify(data, config.salt)
  }
  sign (data) {
    return jwt.sign({
      data,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 * 60,
    }, config.salt)
  }
}

module.exports = crypto
