const app = require('express').Router()
const { Note } = require('../models/index')

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  next()
}

app.get('/', async (req, res) => {
const notes = await Note.findAll()
  res.json(notes)
})

app.post('/', async (req, res) => {
  try {
    const note = await Note.create(req.body)
    return res.json(note)
  } catch(error) {
    return res.status(400).json({ error })
  }
})

app.get('/:id', noteFinder, async (req, res) => {
  // const note = await Note.findByPk(req.params.id)
  console.log(req.note.toJSON())
  // console.log(JSON.stringfy(note, null, 2))
  if (req.note) {
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

app.put('/:id', noteFinder, async (req, res) => {
  // const note = await Note.findByPk(req.params.id)
  if (req.note) {
    req.note.important = req.body.important
    await req.note.save()
    res.json(req.note)
  } else {
    res.status(404).end()
  }
})

module.exports = app