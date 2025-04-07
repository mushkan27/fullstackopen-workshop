const Note = ({note, updateNote}) => {
    return <li>{note.content} <button onClick={updateNote}>Change {note.important?"true":"false"}</button></li>
}

export default Note;