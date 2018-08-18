const Koa = require('koa')
const app = new Koa()

// x-response-time
app.use(async (ctx, next) => {
  // (1) 进入路由
  var start = new Date()
  await next()
  // (5) 再次进入 x-response-time 中间件，记录2次通过此中间件「穿越」的时间
  var ms = new Date() - start
  console.log('X-Response-Time', ms + 'ms')
  // (6) 返回 ctx.body
})

// logger
app.use(async (ctx, next) => {
  // (2) 进入 logger 中间件
  var start = new Date()
  await next()
  // (4) 再次进入 logger 中间件，记录2次通过此中间件「穿越」的时间
  var ms = new Date() - start
  console.log(ctx.method, ctx.url, ms + 'ms')
})

// response
app.use((ctx, next) => {
  // (3) 进入 response 中间件，没有捕获到下一个符合条件的中间件，传递到 upstream
  ctx.body = 'Hello World!'
})

app.listen(3000)
