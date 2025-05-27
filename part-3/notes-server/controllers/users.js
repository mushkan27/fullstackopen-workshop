const app = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


app.get('/', async(request, response) => {
  let result = await User.find({})
  response.json(result)
})



app.get('/:id',async(request, response, next) => {
  try {
    const user = await User.findById(request.params.id)
    if (user) {
      response.json(user)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

app.post('/', async(request, response, next) => {
  const body = request.body

  if (!body.username || !body.password) {
    return response.status(400).json({ error: 'username or password missing' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    passwordHash,
    name: body.name,
  })
  try{
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }catch(e){
    next(e)
  }


})



// app.put('/:id', (request, response, next) => {
//   const { content, important } = request.body

//   Note.findByIdAndUpdate(request.params.id, { content, important }, { new:true, runValidators:true })
//     .then(note => {
//       if (!note) {
//         return response.status(404).end()
//       }

//       note.content = content
//       note.important = important

//       return note.save().then((updatedNote) => {
//         response.json(updatedNote)
//       })
//     })
//     .catch(error => next(error))
// })

// app.delete('/:id', async (request, response, next) => {
//   try {
//     await Note.findByIdAndDelete(request.params.id)
//     response.status(204).end()
//   } catch (error) {
//     next(error)
//   }
// })



module.exports = app