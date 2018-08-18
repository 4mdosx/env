'use strict'
const Controller = require('egg').Controller

const loginRule = {
  email: 'email',
  password: 'string'
}

class AuthController extends Controller {
  async login (ctx) {
    ctx.validate(loginRule)
    const { email, password } = ctx.request.body
    const user = await ctx.service.user.findByAuth({
      email,
      password
    })
    const token = ctx.service.jwt.sign(user)
    ctx.body = {
      user,
      token
    }
  }

  async logout (ctx) {
    ctx.body = {success: true}
  }

  async heartbeat (ctx) {
    let token = ctx.request.header.authorization
    if (token) {
      try {
        const jwt = await ctx.service.jwt.verify(token)
        token = await ctx.service.jwt.sign(jwt.data)
      } catch (error) {
        throw new Error('invalid token: ' + error.message)
      }
    }
    ctx.body = {
      token
    }
  }

  async me (ctx) {
    ctx.body = {
      isAuthenticated: ctx.isAuthenticated,
      user: ctx.user
    }
  }
}

module.exports = AuthController
