import NoteForm from "./components/NoteForm"
import Notes from "./components/Notes"
import { useState } from "react"

const App = () => {
  const [filter, setFilter] = useState('ALL')

  const filterSelected = (value) => {
    setFilter(value)
  }

  return (
    <div>
      <NoteForm />
      <div>
        all         
         <input type="radio" name="filter"
          onChange={() => filterSelected('ALL')} />

        important   
         <input type="radio" name="filter"
          onChange={() => filterSelected('IMPORTANT')} />

        nonimportant
         <input type="radio" name="filter"
          onChange={() => filterSelected('NONIMPORTANT')} />
      </div>
      <Notes filter={filter} />
  </div>
  )
}

export default App
