const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
// const bodyParser = require('body-parser')

const User = require('../models/User')
users.use(cors())
// users.use(bodyParser.urlencoded({ extended: false }))

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
          const JWTtoken = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
            expiresIn: 1440
          })
          res.send({
            user,
            token: JWTtoken
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

// users.get('/users/user', (req, res, next) => {
//   res.json({ user: req.user })
// })

// users.use((err, req, res, next) => {
//   console.error(err) // eslint-disable-line no-console
//   res.status(401).send(err + '')
// })
module.exports = users
