const app = require('express').Router()
const Note = require('../models/note')


app.get('/', async(request, response) => {
  let result = await Note.find({})
  response.json(result)
})


// app.get('/api/notes/:id',(request, response, next) => {
//   request.myObj={ name:'muskan' }
//   next()
// })

app.get('/:id',async(request, response, next) => {

  // Note.findById(request.params.id).then((result) => {
  //   if(result){
  //   // let result1 = { ...result,...request.myObj }
  //   // console.log(result1)
  //     response.json(result)
  //   }else{
  //     response.status(404).send(`There are no notes at ${request.params.id}`)
  //   }
  // }).catch(e => {
  //   next(e)
  //   // console.log(e)
  //   // response.status(500).send(`${request.params.id} is not in the required format` )
  // })

  try {
    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
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

app.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.post('/', async(request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })
  try{
    const savedNote = await note.save()
    response.status(201).json(savedNote)
  }catch(e){
    next(e)
  }


  // note.save().then(savedNote => {
  //   response.status(201).json(savedNote)
  // })
  // .catch(e => {
  //   next(e)
  // })
})

module.exports = app