import { createRoot } from 'react-dom/client'
import './index.css'
// import { useState } from 'react'
import { createStore } from 'redux'

const counterReducer = (state=0, action) => {
  console.log(action)
  console.log(state)
  if(action.type === 'ADD'){
    const newState = state + 1
    return newState
  }else if(action.type === 'SUBTRACT'){
    return state -1
  }else if(action.type === 'ZERO'){
    return 0
  }

  return state
}

const store = createStore(counterReducer)

const App = () => {
  // const [counter, setCounter] = useState(0)

  const addCounter = () => {
    // setCounter(counter+1)
    store.dispatch({type: 'ADD'})
  }

  const subtractCounter = () => {
    // setCounter(counter - 1)
    store.dispatch({type: 'SUBTRACT'})
  }

  const makeZero = () => {
    // setCounter(0)
    store.dispatch({type: 'ZERO'})
  }


  return (
    <div>
    {/* <div>{counter}</div> */}
    <div>{store.getState()}</div>
    <button onClick={addCounter}>add</button>
    <button onClick={subtractCounter}>subtract</button>
    <button onClick={makeZero}>zero</button>
  </div>
  )
}

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<App />)
store.subscribe(() => {
  root.render(<App />)
})