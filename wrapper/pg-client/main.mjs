import Fastify from 'fastify'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const fastify = Fastify({
  logger: true,
})


fastify.get('/', async (request, reply) => {
  const key = request.query.key
  if (key) {
    const res = await prisma.kv.findUnique({ where: { key } })
    return res
  }
  return await prisma.kv.findMany()
})

fastify.post('/', async (request, reply) => {
  const { key, value } = request.body
  const res = await prisma.kv.upsert({
    update: {
      value,
    },
    create: {
      key,
      value,
    },
    where: {
      key,
    }
  })
  return res
})

fastify.delete('/', async (request, reply) => {
  const { key } = request.body
  const res = await prisma.kv.delete({ where: { key } })
  return res
})

// Run the server!
fastify.listen(7003, '0.0.0.0', (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
})

export default fastify
