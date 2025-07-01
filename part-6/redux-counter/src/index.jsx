import { createRoot } from 'react-dom/client'
import './index.css'
import { useState } from 'react'
// import App from './App.jsx'

const App = () => {
  const [counter, setCounter] = useState(0)

  const addCounter = () => {
    setCounter(counter+1)
  }

  const subtractCounter = () => {
    setCounter(counter - 1)
  }

  const makeZero = () => {
    setCounter(0)
  }


  return (
    <div>
    <div>{counter}</div>
    <button onClick={addCounter}>add</button>
    <button onClick={subtractCounter}>subtract</button>
    <button onClick={makeZero}>zero</button>
  </div>
  )
}

createRoot(document.getElementById('root')).render(
  <App />
)
