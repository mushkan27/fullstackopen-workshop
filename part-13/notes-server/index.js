require('dotenv').config()
const express = require('express')
const app = express()
const notesRouter = require('./controllers/notes')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

app.use(express.json())

app.use('/api/notes', notesRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()