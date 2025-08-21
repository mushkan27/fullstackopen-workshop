const app = require('express').Router()
const { Note, User } = require('../models/index')
const { Op } = require('sequelize')
const { tokenExtractor } = require('../util/middleware')

const noteFinder = async (req, res, next) => {
  req.note = await Note.findByPk(req.params.id)
  next()
}



app.get('/', async (req, res) => {
  // console.log(req.query.important, "is query param important")
  // console.log(req.query.class, "is query param class")
  const where = {}
  let important = {
    [Op.in]: [true, false]
  }
  if ( req.query.important ) {
    important = req.query.important === "true"
  }
  if (req.query.search) {
    where.content = {
      [Op.substring]: req.query.search
    }
  }
const notes = await Note.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name', 'username']
    },
    where
  })
  res.json(notes)
})

app.post('/', tokenExtractor, async (req, res) => {
  try {
    req.body.userId = req.decodedToken.id
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