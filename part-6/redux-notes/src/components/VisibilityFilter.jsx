import { useSelector,useDispatch } from "react-redux"
import { filterChange } from "../reducers/filterReducer"

const VisibilityFilter = () => {

    const filterSelected = (value) => {
        dispatch(filterChange(value))
      }

      const dispatch = useDispatch()
      const filter = useSelector((state) => {
        return state.filter
      })

    return (
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
    )
}

export default VisibilityFilter