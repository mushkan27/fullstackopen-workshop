import { useSelector, useDispatch } from "react-redux"
import { makeNote } from "../reducers/noteReducer"

const NoteForm = () => {
    const dispatch = useDispatch()

    const notes = useSelector((state) => state.notes)

    const addNote = (e) => {
        e.preventDefault()
        console.dir(e.target.myInput.value)
        const newNote = {
          content: e.target.myInput.value,
          important: true,
          id: notes.length + 1
        }
        dispatch(makeNote(newNote))
        e.target.myInput.value = ''
      }

   return (
        <form onSubmit={addNote}>
        <input name="myInput" />
        <button>Add note</button>
      </form>
   ) 
      
}

export default NoteForm