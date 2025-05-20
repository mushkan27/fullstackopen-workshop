console.log('Hello!')
require('dotenv').config()

// const http = require('http')
const express = require('express')   // console.log(typeof express) // function

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')  // console.log(typeof mongoose) //'object'

const { url } = require('./utils/config')
const { errorHandler,noCodeHandlers,requestLogger } = require('./utils/middleware')
const notesController = require('./controllers/notes')

mongoose.set('strictQuery',false)

mongoose.connect(url)

app.use(express.json()) //This tells Express to automatically parse JSON in the body of POST requests and put it in request.body.
app.use(cors())
app.use(express.static('dist'))


app.use(requestLogger)
app.use('/api/notes', notesController)

app.use(noCodeHandlers)
app.use(errorHandler)

module.exports = app