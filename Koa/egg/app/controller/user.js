'use strict'
const Controller = require('egg').Controller
const manualConfig = require('../../config/manual')

const createRule = {
  email: 'email',
  password: {
    type: 'password',
    min: '8',
    max: '32'
  }
}

class UserController extends Controller {
  // POST /user
  async create (ctx) {
    if (manualConfig.register.close) {
      ctx.body = '注册已关闭'
      return
    }
    ctx.validate(createRule)
    const { email, password, username } = ctx.request.body
    const result = await ctx.service.user.signIn({
      email,
      password,
      name: username
    })
    if (!result.error) {
      this.ctx.login(result)
    }
    ctx.body = result
  }

  async show (ctx) {
    // GET /user/:id
    const { id } = ctx.params
    const result = await ctx.service.user.find(id)
    ctx.body = result
  }
}

module.exports = UserController
