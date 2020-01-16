const express = require('express')
const products = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const Product = require('../models/Product')
products.use(cors())
products.use(cookieParser())
products.use(bodyParser.json())

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'static/images/products')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  }
})

products.post(
  '/register',
  multer({ storage }).single('filePath'),
  (req, res) => {
    const path = req.file.destination.replace('static/', '/')
    const filePath = `${path}/${req.file.filename}`
    const productData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      filePath
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
  }
)
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

products.patch('/edit', multer({ storage }).single('filePath'), (req, res) => {
  const productId = req.body.productId
  const name = req.body.name
  const description = req.body.description
  const price = req.body.price
  let filePath
  if (req.file) {
    const path = req.file.destination.replace('static/', '/')
    filePath = `${path}/${req.file.filename}`
  }
  if (name) {
    Product.update({ name }, { where: { id: productId } }).then(() => {
      res.status(200).send('Nome alterado: ' + name)
    })
  }
  if (description) {
    Product.update({ description }, { where: { id: productId } }).then(() => {
      res.status(200).send('Descrição alterada')
    })
  }
  if (price) {
    Product.update({ price }, { where: { id: productId } }).then(() => {
      res.status(200).send('Preço alterado: ' + price)
    })
  }
  if (filePath) {
    Product.update({ filePath }, { where: { id: productId } }).then(() => {
      res.status(200).send('Imagem alterada: ' + filePath)
    })
  }
})

products.delete('/delete', (req, res) => {
  const productId = req.body.id
  Product.findOne({
    where: {
      id: productId
    }
  }).then((product) => {
    const productName = product.name
    product.destroy()
    res.status(200).send(productName + ' foi removido')
  })
})

module.exports = products
