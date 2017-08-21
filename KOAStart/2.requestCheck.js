async function foobar (ctx, next) {
  ctx.assert(ctx.request.accepts('xml'), 406)
  // equivalent to:
  // if (!ctx.request.accepts('xml')) ctx.throw(406);
  await next()
}

module.exports = foobar
