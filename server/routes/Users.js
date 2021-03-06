/* eslint-disable no-console */
const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const User = require('../models/User')
users.use(cors())
users.use(cookieParser())

// Install middleware
users.use(bodyParser.json())

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
  jwt.verify(req.cookies['auth._token.local'], process.env.SECRET_KEY, function (err, decoded) {
    if (err) {
      res.status(400).json({
        error: 'Algo errado com o token'
      })
    } else {
      res.json({ user: decoded })
    }
  })
})

users.delete('/logout', (req, res) => {
  res.status(200).send('OK')
})

users.patch('/user/edit', (req, res) => {
  const userEmail = jwt.verify(
    req.cookies['auth._token.local'],
    process.env.SECRET_KEY,
    function (err, decoded) {
      if (err) {
        res.status(400).json({
          error: 'Algo errado com o token'
        })
      } else {
        return decoded.email
      }
    }
  )
  console.log(userEmail)
  const username = req.body.username
  let password = req.body.password
  const email = req.body.email
  const lastLogin = req.body.last_login

  if (username) {
    User.update({ username }, { where: { email: userEmail } }).then(() => {
      res.status(200).send('Username alterado: ' + username)
    })
  }
  if (password) {
    bcrypt.hash(password, 10, (erro, hash) => {
      password = hash
    })
    User.update({ password }, { where: { email: userEmail } }).then(() => {
      res.status(200).send('Senha alterada')
    })
  }
  if (email) {
    User.update({ email }, { where: { email: userEmail } }).then(() => {
      res.status(200).send('E-mail alterado: ' + email)
    })
  }
  if (lastLogin) {
    User.update({ lastLogin }, { where: { email: userEmail } }).then(() => {
      res.status(200)
    })
  }
})
module.exports = users
