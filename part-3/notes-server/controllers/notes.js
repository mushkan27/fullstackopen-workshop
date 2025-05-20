const app = require('express').Router()
const Note = require('../models/note')


app.get('/',(request, response) => {
  Note.find({}).then((result) => {
    response.json(result)
  })
})

// app.get('/api/notes/:id',(request, response, next) => {
//   request.myObj={ name:'muskan' }
//   next()
// })

app.get('/:id',(request, response, next) => {

  Note.findById(request.params.id).then((result) => {
    if(result){
    // let result1 = { ...result,...request.myObj }
    // console.log(result1)
      response.json(result)
    }else{
      response.status(404).send(`There are no notes at ${request.params.id}`)
    }
  }).catch(e => {
    next(e)
    // console.log(e)
    // response.status(500).send(`${request.params.id} is not in the required format` )
  })
})



app.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Note.findByIdAndUpdate(request.params.id, { content, important }, { new:true, runValidators:true })
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      note.content = content
      note.important = important

      return note.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

app.delete('/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/', (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  }).catch(e => {
    next(e)
  })
})

module.exports = app