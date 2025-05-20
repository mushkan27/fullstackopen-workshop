const { info } = require('./logger')

const noCodeHandlers = (request, response) => {
  response.status(404).send('no code available to handle this request')
}

const requestLogger = (request, response, next) => {
  info('Method:', request.method)
  info('Path:', request.path)
  info('Body:', request.body)
  info('we just code this')
  next()
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

module.exports = {
  errorHandler,
  noCodeHandlers,
  requestLogger
}