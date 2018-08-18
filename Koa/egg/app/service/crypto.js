const Service = require('egg').Service
const uuidv5 = require('uuid/v5')
const uuidv4 = require('uuid/v4')
const md5 = require('md5')

class crypto extends Service {
  uuid (str) {
    if (str.length) {
      return uuidv5(str, this.config.uuidKey).replace(/-/g, '')
    } else {
      return uuidv4().replace(/-/g, '')
    }
  }
  md5 (val) {
    return md5(val + this.config.salt)
  }
}

module.exports = crypto
