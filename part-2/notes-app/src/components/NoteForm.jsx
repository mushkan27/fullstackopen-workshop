import { useState } from 'react'

const NoteForm = ({ onSubmit }) => {
  const [newNote, setNewNote] = useState('')

  const mySubmit = (e) => {
    e.preventDefault()
    onSubmit({
      content: newNote,
      important: true,
    })

    setNewNote('')
  }



  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={mySubmit}>
        <input className='noteForm'
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter note"
          id='inputNote'
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default NoteForm