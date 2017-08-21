const Koa = require('Koa')
const app = new Koa()
const { Kitten } = require('./officeStart.js')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())
app.use(async (ctx, next) => {
  await next()
  if (ctx.request.url === '/') {
    ctx.set('content-type', 'text/html; charset=utf-8')
    ctx.body = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        <form id="myform" class="" action="/addKitten" method="post">
          <input type="text" name="name" value="" placeholder="Kitten Name">
          <button type="submit" name="button">Submit</button>
        </form>
        <a href="/kittenSearch">kittenSearch List</a>
      </body>
    </html>
    `
  }
})

app.use(async (ctx, next) => {
  await next()
  if (ctx.request.url === '/kittenSearch') {
    ctx.body = {
      mmm: 'mmm'
    }
  }
  if (ctx.request.url === '/kittenList') {
    await Kitten.find(function (err, kittens) {
      if (err) return console.error(err)
      ctx.body = kittens
    })
  }
})

app.use(async (ctx, next) => {
  // test mongoose feature
  ctx.body = '404 not found'
  if (ctx.request.method === 'POST' && ctx.request.url === '/addKitten') {
    if (!ctx.request.body.name) return false
    let kit = new Kitten({ name: ctx.request.body.name })
    await kit.save(function (err, fluffy) {
      if (err) return console.error(err)
      ctx.body = kit.speak()
    })
    ctx.redirect('/kittenList')
  }
})

app.listen(3000, function () {
  console.log('listening on 3000')
})
module.exports = app
