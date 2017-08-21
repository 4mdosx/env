async function foo (ctx, next) {
  console.log('sync start')
  next()
}

module.exports = foo
