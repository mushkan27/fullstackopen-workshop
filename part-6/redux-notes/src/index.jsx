import { createRoot } from 'react-dom/client'
import './index.css'
import { createStore } from 'redux'
import noteReducer, {createNote, toggleImportanceOf} from './reducers/noteReducer'


const store = createStore(noteReducer)
store.dispatch({
  type: 'NEW_NOTE',
  payload: {
    content: 'the app state is in redux store',
    important: true,
    id: 1
  }
})



const App = () => {

  const addNote = (e) => {
    e.preventDefault()
    console.dir(e.target.myInput.value)
    const newNote = {
      content: e.target.myInput.value,
      important: true,
      id: store.getState().length + 1
    }
    store.dispatch(createNote(newNote))
    e.target.myInput.value = ''
  }


  const toggleImportant = (id) => {
    store.dispatch(toggleImportanceOf(id))
  }

  return (
    <div>
      <form onSubmit={addNote}>
        <input name="myInput" />
        <button>Add note</button>
      </form>
    <ul>
      {store.getState().map(note=>
        <li key={note.id} onClick={()=>toggleImportant(note.id)}>
          {note.content} <strong>{note.important ? 'important' : ''}</strong>
        </li>
      )}
      </ul>
  </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<App />)
store.subscribe(() => {
  root.render(<App />)
})