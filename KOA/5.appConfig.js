const Koa = require('koa')
const app = new Koa()

app.keys = ['mmm, sign cookie key']

// response
app.use(async (ctx, next) => {
  ctx.body = 'test cookie keys ' + ctx.request.subdomains
  // 创建带有sign的 cookie
  ctx.cookies.set('name', 'tobi', { signed: true })
})

app.listen(3000)
