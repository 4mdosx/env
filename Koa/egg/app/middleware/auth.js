module.exports = () => {
  return async function (ctx, next) {
    const token = ctx.request.header.authorization
    if (token) {
      try {
        const jwt = await ctx.service.jwt.verify(token)
        ctx.auth = jwt.data
        ctx.isAuthenticated = function () {return true}
        await next()
      } catch (error) {
        const err = new Error('invalid token: ' + error.message)
        err.status = 401
        throw err
      }
    } else {
      ctx.auth = null
      ctx.isAuthenticated = function () {return false}
      await next()
    }
  }
}
