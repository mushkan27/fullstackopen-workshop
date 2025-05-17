console.log('Hello!')

// const http = require('http')
const express = require('express')
// console.log(typeof express) // function
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// console.log(typeof mongoose) //'object'

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)

mongoose.connect(url)

//Schema is a class(constructor function) provided by mongoose that's why new keyword
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})
// console.log(typeof noteSchema) //object

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)




app.use(express.json()) //This tells Express to automatically parse JSON in the body of POST requests and put it in request.body.
app.use(cors())
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('we just code this')
  next()
}
app.use(requestLogger)


// let notes = []


/* const app = http.createServer((request, response) => {
   response.writeHead(200, { 'Content-Type': 'text/json' })
   response.end(JSON.stringify(notes))
 })

 app.get("/",(request, response) => {
   response.send("<h1>Hello World</h1>")
  })

 app.get("/api/notes",(request, response) => {
   response.json(notes)
 })

 app.get("/api/notes/:id",(request, response)=>{
   const myId = Number(request.params.id); //turns URL id into a Number //request.param always comes as string
   const myNote = notes.find((note) => note.id === myId);
   if(myNote){
     response.json(myNote)
   }else{
     response.status(404).send(`There are no notes at ${myId}`)
   }
  })

  //to create a DELETE route that allows a user to delete a specific note by its id
app.delete("/api/notes/:id",(request, response)=>{
  const myId = Number(request.params.id);
  notes = notes.filter((note) => note.id !== myId);
  response.status(204).send(`The note at id ${myId} has been deleted`)
})

app.post("/api/notes", (request, response)=>{
  const myNewPost = request.body;
  myNewPost.id = notes.length + 1
  notes.push(myNewPost)
  response.status(201).json(myNewPost)

  // const note = new Note({
  //   content: 'HTML is easy',
  //   important: true,
  // })

  // note.save().then(result => {
  //   console.log('note saved!')
  //   mongoose.connection.close()
  // })
})

  app.put("api/notes/:id", (request, response)=>{
    const myId = Number(request.params.id);
    const updatedNote = request.body;
    let noteFound = false;
    notes= notes.map((note)=>{
      if(note.id !== myId)return note;
      else{
      noteFound = true;
    return updatedNote;
      }
      })

      if(noteFound){
      response.status(202).json(updatedNote)
      }else{
      response.status(404).send(`There are no notes at ${myId}`)
      }
    })

  */

app.get('/api/notes',(request, response) => {
  Note.find({}).then((result) => {
    response.json(result)
  })
})

app.get('/api/notes/:id',(request, response, next) => {
  Note.findById(request.params.id).then((result) => {
    if(result){
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

app.put('/api/notes/:id', (request, response, next) => {
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

app.delete('/api/notes/:id', (request, response, next) => {
  Note.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/notes', (request, response, next) => {
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



app.use((request, response) => {
  response.status(404).send('no code available to handle this request')
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT ? process.env.PORT : 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)