'use strict'
const Controller = require('egg').Controller

class HomeController extends Controller {
  async index (ctx) {
    await ctx.render('block')
  }
}

module.exports = HomeController
