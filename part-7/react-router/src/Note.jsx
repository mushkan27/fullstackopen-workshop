
const Note = ({note}) => {

    return (
        <>
        <h2>Note of id: {note.id}</h2>
        <li>{note.content}</li>
        </>
    )
}

export default Note