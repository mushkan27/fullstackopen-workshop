import {
  BrowserRouter as Router,
  Routes, Route, Link, Navigate
} from 'react-router-dom'
import { useState } from 'react'
import Notes from './Notes'
import Note from './Note'
import Login from './Login'

const notes = [
    {
      "id": "1",
      "content": "HTML is easy",
      "important": true
    },
    {
      "id": "2",
      "content": "Browser can execute only JavaScript",
      "important": true
    },
    {
      "id": "3",
      "content": "GET and POST are the most important methods of HTTP protocol",
      "important": false
    }
  ]

const Home = () => (
  <div> <h2>TKTL notes app</h2> </div>
)

const Users = () => (
  <div> <h2>Users</h2> </div>
)

const App = () => {

  const [user, setUser] = useState(null)

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
         {user
      ? <em>{user} logged in</em>
      : <Link style={padding} to="/login">login</Link>
    }
      </div>

      <Routes>
        <Route path="/notes/:id" element={<Note notes={notes} />} />
        <Route path="/notes" element={<Notes notes={notes}/>} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser}/>}/>
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Router>
  )
}

export default App