console.log('Hello!')
require('dotenv').config()

// const http = require('http')
const express = require('express')   // console.log(typeof express) // function

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')  // console.log(typeof mongoose) //'object'

const config = require('./utils/config')
const { errorHandler,noCodeHandlers,requestLogger } = require('./utils/middleware')
const notesController = require('./controllers/notes')
const usersController = require('./controllers/users')
const loginController = require('./controllers/login')

mongoose.set('strictQuery',false)

mongoose.connect(config.MONGODB_URI)

app.use(express.json()) //This tells Express to automatically parse JSON in the body of POST requests and put it in request.body.
app.use(cors())
app.use(express.static('dist'))



app.use(requestLogger)

app.use('/api/notes', notesController)
app.use('/api/users', usersController)
app.use('/api/login', loginController)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}


app.use(errorHandler)
app.use(noCodeHandlers)

module.exports = app