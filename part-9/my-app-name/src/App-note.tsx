import { SyntheticEvent, useState } from 'react';

interface Note {
    id: number;
    content: string;
}

const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([{id: 1, content: 'hello there'}]);

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setNotes([...notes, {id: notes.length + 1, content: newNote}])
    setNewNote('')
  }

  return (
    <>
    {notes.map((value) => (
        <div key={value.id}>{value.content}</div>
    ))}

    <form onSubmit={handleSubmit}>
        <input type="text" value={newNote} onChange={(event)=>setNewNote(event.target.value)} />
        <button>submit</button>
    </form>

    
    </>
  )
}

export default App