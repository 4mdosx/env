'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, passport } = app

  router.get('/', controller.home.index)
  router.options('*', ctx => ctx.status = 204)
  // test url
  router.get('/lab', controller.lab.index)
  router.get('/lab/md5', controller.lab.md5)

  // auth
  router.get('/auth', controller.auth.me)
  router.get('/auth/heartbeat', controller.auth.heartbeat)
  router.post('/auth', controller.auth.login)
  router.get('/auth/logout', controller.auth.logout)

  // source
  router.resources('user', '/user', controller.user)
  router.get('/post/query', controller.post.query)
  router.resources('post', '/post', controller.post)

  router.get('/tag', controller.tag.all)
  router.post('/tag', controller.tag.create)
  router.put('/tag/:id', controller.tag.update)
  router.get('/tag/:query', controller.tag.show)
}
