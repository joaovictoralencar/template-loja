const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require('../nuxt.config.js')
const Users = require('./routes/Users')
const Products = require('./routes/Products')

// Import and Set Nuxt.js options
config.dev = process.env.NODE_ENV !== 'production'
require('dotenv').config()

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }
  app.use(bodyParser.json())
  app.use(cors())
  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  )
  app.use('/api/users', Users)
  app.use('/api/products', Products)
  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
