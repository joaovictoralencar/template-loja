const express = require('express')
const products = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const Product = require('../models/Product')
products.use(cors())
products.use(cookieParser())

// Install middleware
products.use(bodyParser.json())

products.post('/register', (req, res) => {
  const productData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price
  }
  Product.create(productData)
    .then((product) => {
      res.json({
        status: product.name + ' Registered!'
      })
    })
    .catch((erro) => {
      res.send('erro: ' + erro)
    })
})
products.get('/all', (req, res) => {
  Product.findAll().then((products) => {
    res.status(200).send({
      products
    })
  })
})

products.get('/:id', (req, res) => {
  const productId = req.params.id
  Product.findOne({
    where: {
      id: productId
    }
  }).then((product) => {
    res.status(200).send({
      product
    })
  })
})

products.patch('/:id/edit', (req, res) => {
  const productId = req.params.id
  const name = req.body.name
  const description = req.body.description
  const price = req.body.price
  if (name) {
    Product.update({ name, where: { id: productId } }).then(() => {
      res.status(200).send('Nome alterado: ' + name)
    })
  }
  if (description) {
    Product.update({ description, where: { id: productId } }).then(() => {
      res.status(200).send('Descrição alterada')
    })
  }
  if (price) {
    Product.update({ price, where: { id: productId } }).then(() => {
      res.status(200).send('Preço alterado: ' + price)
    })
  }
})

module.exports = products
