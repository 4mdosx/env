async function foo (ctx, next) {
  console.log('async md start')
  const start = Date.now()
  await next()
  console.log('async md back')
  const ms = Date.now() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
}

module.exports = foo
