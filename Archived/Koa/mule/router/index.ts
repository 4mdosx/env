import * as Router from 'koa-router'
import axios from 'axios'

import rssLoader from '@/loader/rss'
import atomLoader from '@/loader/atom'
const router = new Router()

router.get('/', (ctx) => {
  ctx.body = 'mmm'
})

router.get('/fetch/rss', async (ctx) => {
  const { url } = ctx.query
  const res = await axios.get(url)
  await rssLoader(res)
  ctx.body = res.data
})

router.get('/fetch/atom', async (ctx) => {
  const { url } = ctx.query
  const res = await axios.get(url)
  await atomLoader(res)
  ctx.body = res.data
})

export default router