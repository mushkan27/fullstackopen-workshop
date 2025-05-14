const mongoose = require('mongoose')

//process.argv is an array containing the command line arguments passed when the Node.js process was launched
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

//password captures the second command line argument
const password = process.argv[2]

const url = `mongodb+srv://muskan:${password}@cluster0.x3hvp1l.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

//schema is a plan that outlines how dara is organised or stored in a database
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})