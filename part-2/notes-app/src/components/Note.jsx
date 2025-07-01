import React from 'react'

const Note = ({ note, updateNote }) => {
  return <li className='note'>{note.content} <button onClick={updateNote}>Change {note.important?'true':'false'}</button></li>
}

export default Note