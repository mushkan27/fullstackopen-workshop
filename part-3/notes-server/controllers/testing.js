const testingRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')

// testingRouter.post('/reset/', async (request, response) => {
//   console.log('reset endp')
//   await Note.deleteMany({})
//   await User.deleteMany({})

//   response.status(204).end()
// })
testingRouter.post('/reset', async (request, response) => {
  try {
    console.log('Resetting database...')
    await Note.deleteMany({})
    await User.deleteMany({})
    response.status(204).end()
  } catch (error) {
    console.error('Error resetting database:', error)
    response.status(500).json({ error: 'Failed to reset database' })
  }
})

module.exports = testingRouter