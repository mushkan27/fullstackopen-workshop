import { toggleImportanceOf } from "../reducers/noteReducer"
import { useSelector,useDispatch } from "react-redux"

const Notes = ({ filter }) => {
    const dispatch = useDispatch()
    const notes = useSelector((state) => {
      if(filter === 'ALL'){
        return state
      }
      else if(filter === 'IMPORTANT'){
        return state.filter((note) => {
          if(note.important === true){
            return true
          }
        })
      }
      else if(filter === 'NONIMPORTANT'){
        return state.filter((note) => {
          if(note.important === false){
            return true
          }
        })
      }
    })


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