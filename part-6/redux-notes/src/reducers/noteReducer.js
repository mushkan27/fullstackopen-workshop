import { createSlice } from '@reduxjs/toolkit'
import { createNew } from '../services/notes'

const noteReducer = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action){
      return [...state, action.payload]
    },
    toggleImportanceOf(state, action){
      let myNote = state.find(note => note.id === action.payload.id)
      let changedNote = {...myNote, important: !myNote.important}
      // changedNote.important = !changedNote.important
      return state.map(note => note.id === changedNote.id ? changedNote : note)
    }
  }
})

const { createNote, toggleImportanceOf } = noteReducer.actions

const makeNote = (newNote) => {
  return async (dispatch) => {
    const myNote = await createNew(newNote)
    dispatch(createNote(myNote))
  }
}

  export { createNote, toggleImportanceOf, makeNote}

  export default noteReducer.reducer