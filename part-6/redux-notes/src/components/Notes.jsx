import { toggleImportanceOf } from "../reducers/noteReducer"
import { useSelector,useDispatch } from "react-redux"

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector((state) => [...state])
    const toggleImportant = (id) => {
    dispatch(toggleImportanceOf(id))
  }
    return (
        <ul>
      {notes.map(note=>
        <li key={note.id} onClick={()=>toggleImportant(note.id)}>
          {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </li>
      )}
      </ul>
    )
}

export default Notes