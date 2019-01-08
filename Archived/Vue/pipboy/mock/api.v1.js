const Router = require('koa-router')

var router = new Router()

router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = {
    1: 2,
    3: 4
  }
})

module.exports = router
