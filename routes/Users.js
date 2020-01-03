/* eslint-disable no-console */
const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')

const User = require('../models/User')
users.use(cors())
// users.use(bodyParser.urlencoded({ extended: false }))

// Install middleware
users.use(bodyParser.json())

// // JWT middleware
// users.use(
//   jwt({
//     secret: process.env.SECRET_KEY
//   }).unless({
//     path: '/users/login'
//   })
// )

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    registered: today,
    last_login: today
  }
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (erro, hash) => {
          userData.password = hash
          User.create(userData)
            .then((user) => {
              res.json({
                status: user.email + ' Registered!'
              })
            })
            .catch((erro) => {
              res.send('error: ' + erro)
            })
        })
      } else {
        res.json({
          error: 'User already exists'
        })
      }
    })
    .catch((err) => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      if (user) {
        const correctPass = bcrypt.compareSync(req.body.password, user.password)
        if (correctPass) {
          const accessToken = jwt.sign(
            user.dataValues,
            process.env.SECRET_KEY,
            { expiresIn: 1440 }
          )
          res.send({
            token: { accessToken }
          })
        } else {
          res.status(400).json({
            error: 'Wrong password'
          })
        }
      } else {
        res.status(400).json({
          error: 'User does not exist'
        })
      }
    })
    .catch((err) => {
      res.status(400).json({
        error: err
      })
    })
})

users.get('/user', (req, res) => {
  console.log(req.user)
  res.json({ user: 'teste' })
})

module.exports = users
