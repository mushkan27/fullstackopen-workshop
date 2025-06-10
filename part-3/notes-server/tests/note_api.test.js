
const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Note = require('../models/note')
const helpers = require('./tests_helper')



const api = supertest(app)

// const initialNotes = [
//   {
//     content: 'HTML is easy',
//     important: false,
//   },
//   {
//     content: 'Browser can execute only JavaScript',
//     important: true,
//   },
// ]

// beforeEach(async () => {
//   await Note.deleteMany({})
//   let noteObject = new Note(helpers.initialNotes[0])
//   await noteObject.save()
//   noteObject = new Note(helpers.initialNotes[1])
//   await noteObject.save()
// })

beforeEach(async () => {
  await Note.deleteMany({})

  const noteObjects = helpers.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
})

//GET
describe('testing GET method', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    // .expect('Content-Type', 'application/json; charset=utf-8')
  })

  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helpers.initialNotes.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(e => e.content)
    assert.strictEqual(contents.includes('HTML is easy'), true)
  })

  test('a specific note can be viewed', async () => {
    const notesAtStart = await helpers.notesInDb()
    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToView)
  })
})

//POST
describe('testing POST method', () => {
  test('a valid note can be added ', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // const response = await api.get('/api/notes')

    // const contents = response.body.map(r => r.content)

    // assert.strictEqual(response.body.length, helpers.initialNotes.length + 1)

    const notesAtEnd = await helpers.notesInDb()
    assert.strictEqual(notesAtEnd.length, helpers.initialNotes.length + 1)

    const contents = notesAtEnd.map(n => n.content)

    assert(contents.includes('async/await simplifies making async calls'))
  })

  test('note without content is not added', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helpers.initialNotes.length)
  })
})



describe('testing DELETE method', () => {
  test('a note can be deleted', async () => {
    const notesAtStart = await helpers.notesInDb()
    const noteToDelete = notesAtStart[0]


    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await helpers.notesInDb()

    const contents = notesAtEnd.map(n => n.content)
    assert(!contents.includes(noteToDelete.content))

    assert.strictEqual(notesAtEnd.length, helpers.initialNotes.length - 1)
  })
})

after(async () => {
  await mongoose.connection.close()
})