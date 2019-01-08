const Koa = require('koa')
const app = new Koa()

const asyncMW = require('./basicAsyncMiddleWare.js')
const CommonFunction = require('./CommonFunction.js')
const syncMW = require('./basicSyncMiddleWare.js')
// response
app.use(asyncMW)
app.use(CommonFunction)
app.use(syncMW)

app.listen(3000)
