async function bar (ctx, next) {
  console.log('common function start')
  const start = Date.now()
  return next().then(() => {
    console.log('common function back')
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  })
}

module.exports = bar
