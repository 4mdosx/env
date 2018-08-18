'use strict'
const Controller = require('egg').Controller

class LabController extends Controller {
  async index (ctx) {
    ctx.body = 'temp playground'
  }
  async md5 (ctx) {
    ctx.body = {
      str: ctx.query.str,
      encryptedHash: this.service.crypto.md5(ctx.query.str)
    }
  }
}

module.exports = LabController
