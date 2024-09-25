import fp from 'fastify-plugin'
import multer from 'fastify-multer'
import config from '../config.mjs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now().toString().slice(-4) + file.originalname)
  }
})

const upload = multer({  storage })

export default fp(async function (fastify, opts) {
  fastify.register(multer.contentParser)
  fastify.post(
    '/upload',
    { preHandler: upload.single('file') },
    function(request, reply) {
      reply.code(200).send('SUCCESS')
    }
  )
})

export { upload }
