import * as Koa from 'koa'
import router from './router'
const app = new Koa()
app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(4000)

export default app