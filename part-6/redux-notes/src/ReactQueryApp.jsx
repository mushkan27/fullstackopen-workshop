import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotes, createNote, updateNote } from './services/requests'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })
   const newNoteMutation = useMutation({
    mutationFn: createNote, 
    onSuccess: (myNote) => {
       const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(myNote))
    },
  })
   const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })
  console.log(JSON.parse(JSON.stringify(result)))

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    newNoteMutation.mutate({ content, important: true })
    event.target.note.value = ''
    console.log(content)
  }

  const toggleImportance = (note) => {
    updateNoteMutation.mutate({...note, important: !note.important })
  }

  

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App