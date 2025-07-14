import { useEffect } from "react"

import NoteForm from "./components/NoteForm"
import Notes from "./components/Notes"
import VisibilityFilter from "./components/VisibilityFilter"
import { getAll } from "./services/notes"
import { useDispatch } from "react-redux"
import { createNote } from "./reducers/noteReducer"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    getAll().then((response) => {
      response.forEach((note) => {
        dispatch(createNote(note))
      })
    })
  }, [])

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App
