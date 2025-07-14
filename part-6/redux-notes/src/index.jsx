import { createRoot } from 'react-dom/client'
import './index.css'
// import { createStore, combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import noteReducer from './reducers/noteReducer'
import App from './App'
import { Provider } from 'react-redux'
import filterReducer from './reducers/filterReducer'

// const reducer = combineReducers({
//     notes: noteReducer,
//     filter: filterReducer
// })
// const store = createStore(reducer)
const store = configureStore({
    reducer: {
      notes: noteReducer,
      filter: filterReducer
    }
  })
// store.dispatch({
//   type: 'NEW_NOTE',
//   payload: {
//     content: 'the app state is in redux store',
//     important: true,
//     id: 1
//   }
// })

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
<Provider store={store}>
<App />
</Provider>
)
