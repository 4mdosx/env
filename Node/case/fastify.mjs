import Fastify from 'fastify'

const fastify = Fastify({
  logger: true,
})

// Declare a route
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' })
})

// Run the server!
fastify.listen(3000, '0.0.0.0', (err, address) => {
  if (err) throw err
  // Server is now listening on ${address}
})

export default fastify
