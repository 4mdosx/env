const Koa = require('koa')
const APIRouter = require('./api.v1')

const app = new Koa()

app.use(APIRouter.routes())

app.listen(4400)
