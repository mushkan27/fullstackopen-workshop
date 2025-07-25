import {
  Routes, Route, Link, Navigate, useMatch
} from 'react-router-dom'
import { useState } from 'react'
import Notes from './Notes'
import Note from './Note'
import Login from './Login'
import { Navbar, Nav } from 'react-bootstrap'
import { Container, Alert, AppBar, Toolbar, IconButton, Button } from '@mui/material'

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

  const match = useMatch('/notes/:id')
  const note = match ? notes.find(note => note.id == match.params.id) : null

  const padding = {
    padding: 5
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            home
          </Button>
          <Button color="inherit" component={Link} to="/notes">
            notes
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user
            ? <em>{user} logged in</em>
            : <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          }
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </Container>
  )
}

export default App