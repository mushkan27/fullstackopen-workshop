require('dotenv').config()
const express = require('express')
const app = express()
const notesRouter = require('./controllers/notes')
const { PORT } = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

app.use(express.json())

app.use('/api/notes', notesRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()