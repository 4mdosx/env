'use strict'
const Controller = require('egg').Controller

const createRule = {
  name: {
    type: 'string',
    max: 15,
    min: 2
  }
}

class TagController extends Controller {
  async show (ctx) {
    // GET /tag/:query
    const { query } = ctx.params
    const result = await ctx.service.tag.find(query)
    ctx.body = result
  }

  async all (ctx) {
    // GET /tag
    const result = await ctx.service.tag.listAll()
    ctx.body = result
  }
  
  async create (ctx) {
    // POST /tag
    await this.ctx.service.permission.w('post')
    ctx.validate(createRule)
    const { name, comment = '' } = ctx.request.body
    const result = await ctx.service.tag.create({
      name,
      comment
    })
    ctx.body = result
  }

  async update (ctx) {
    // PUT /tag/:id
    await ctx.service.permission.w('post')
    ctx.validate(createRule)
    const { id } = ctx.params
    const { name, comment = '' } = ctx.request.body
    const result = await ctx.service.tag.update({
      id,
      name,
      comment
    })
    ctx.body = result
  }
}

module.exports = TagController
