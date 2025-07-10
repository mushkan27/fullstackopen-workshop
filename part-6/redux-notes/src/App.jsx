import NoteForm from "./components/NoteForm"
import Notes from "./components/Notes"
import { useSelector,useDispatch } from "react-redux"
import { filterChange } from "./reducers/filterReducer"

const App = () => {
    const dispatch = useDispatch()
    const filter = useSelector((state) => {
      return state.filter
    })

    const filterSelected = (value) => {
      dispatch(filterChange(value))
    }
  

  return (
    <div>
      <NoteForm />
      <div>
        all         
         <input type="radio" name="filter"
          onChange={() => filterSelected('ALL')} 
          checked={filter === 'ALL'}/>

        important   
         <input type="radio" name="filter"
          onChange={() => filterSelected('IMPORTANT')} />

        nonimportant
         <input type="radio" name="filter"
          onChange={() => filterSelected('NONIMPORTANT')} />
      </div>
      <Notes  />
  </div>
  )
}

export default App
