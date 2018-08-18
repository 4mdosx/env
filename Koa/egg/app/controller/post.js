'use strict'
const Controller = require('egg').Controller
const SQLHelper = require('../../utils/SQLHelper')
const createRule = {
  title: 'string',
  uri_name: 'string',
  content: { type: 'string' },
  summary: { type: 'string', required: false },
  doctype: { type: 'enum', values: [ 'markdown', 'html', 'plain' ] },
  tag: 'array' // item[] {tag_id: string}
}

const updateRule = {
  title: { type: 'string', required: false },
  content: { type: 'string', required: false },
  summary: { type: 'string', required: false },
  doctype: { type: 'enum', values: [ 'markdown', 'html', 'plain' ], required: false },
  tag: { type: 'array', required: false }
}

class PostController extends Controller {
  async create (ctx) {
    // POST /api/v1/post
    await this.ctx.service.permission.w('post')
    ctx.validate(createRule)
    const { u_id: owner_uid } = ctx.auth
    const result = await ctx.service.document.create(
      Object.assign(
        {owner_uid},
        ctx.request.body
      )
    )
    ctx.body = result
  }

  async show (ctx) {
    // GET /post/:id?type=uri
    const { id } = ctx.params
    let result
    if (ctx.query.type === "uri") {
      result = await ctx.service.document.matchURI(id)
    } else {
      result = await ctx.service.document.find(id)
    }
    ctx.body = result || {error: true, message: 'No match document'}
  }
  
  async index (ctx) {
    // GET /post?page=number&size=number
    let page = Number(ctx.query.page) || 1
    let size = Number(ctx.query.size) || 15
    let {offset, limit} = SQLHelper.page2offset(
      page,
      size
    )
    let { list, count } = await ctx.service.document.list({ offset, limit })
    ctx.body = {
      list,
      count,
      page,
      size
    }
  }

  async query (ctx) {
    // GET /post/query?tag=string&user=string&page=number&size=number
    let page = Number(ctx.query.page) || 1
    let size = Number(ctx.query.size) || 15
    let {offset, limit} = SQLHelper.page2offset(
      page,
      size
    )
    let { tag, user } = ctx.query
    let { list, count } = await ctx.service.document.query(
      { tag_id: tag, owner_uid: user }, // concat where statement
      { page, limit }
    )
    ctx.body = {
      list,
      count,
      page,
      size
    }
  }

  async update (ctx) {
    // PUT /post/:id
    await this.ctx.service.permission.w('post')
    ctx.validate(updateRule)
    const { u_id: owner_uid } = ctx.auth
    const data = {
      ...ctx.request.body,
      owner_uid,
      doc_id: ctx.params.id
    }
    const result = await ctx.service.document.update(data)
    if (result.error) {
      ctx.status = 403
      ctx.body = result
    } else {
      ctx.status = 202
      ctx.body = result
    }
  }

  async destroy (ctx) {
    // DELETE /post/:id
    await this.ctx.service.permission.w('post')
    const { id } = ctx.params
    await ctx.service.document.markRemove(id)
    ctx.status = 201
    ctx.body = {
      success: true,
      id
    }
  }
}

module.exports = PostController
