console.log("Hello!")

// const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const url = `mongodb+srv://muskan:Scarlet%405843@cluster0.x3hvp1l.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)




app.use(express.json()); //This tells Express to automatically parse JSON in the body of POST requests and put it in request.body.
app.use(cors())
app.use(express.static('dist'))

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("we just code this");
  next();
}
app.use(requestLogger);


let notes = []

  
// const app = http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'text/json' })
//   response.end(JSON.stringify(notes))
// })

// app.get("/",(request, response) => {
//     response.send("<h1>Hello World</h1>")
//   })

app.get("/api/notes",(request, response) => {
  Note.find({}).then((result) => {
    response.json(result)
  })
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

app.use((request, response, next)=>{
  response.status(404).send("no code available to handle this request")
})


const PORT = process.env.PORT ? process.env.PORT : 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)