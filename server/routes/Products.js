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

products.get('/product/:id', (req, res) => {
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

module.exports = products
