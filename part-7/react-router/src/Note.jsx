import { useParams } from "react-router-dom"

const Note = ({notes}) => {
  const id = useParams().id
  const note = notes.find((note) => note.id == id)

    return (
        <>
        <h2>Note of id: {id}</h2>
        <li>{note.content}</li>
        </>
    )
}

export default Note