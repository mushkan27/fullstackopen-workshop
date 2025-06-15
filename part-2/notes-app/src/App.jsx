import Note from "./components/Note";
import { useState, useEffect } from "react";
// import axios from "axios"
// import getAll from "./services/notes"; //not valid when using `export default { getAll, create }
import noteService from "./services/notes";
import Notification from "./components/Notification";
import loginService from './services/login'
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";


//USE EFFECT, AXIOS
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(false)
  const [notification, setNotification] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(()=>{
    // console.log("hello world")
    //1. Getting data from the backend server
    let myAxiosPromise = noteService.getAll();
    myAxiosPromise.then((myData)=>{
      // console.log("myResult:", myResult) //Promise result which is object
      // console.dir("myResultdata", myResult.data)
      myData.push({
        id: 1000,
        content: "this is fake",
        important: true
      })

      //2. Put the data into notes state
      setNotes(myData)})

      //Get user from localStorage if available
      let myUser = window.localStorage.getItem('noteUser')

      if(myUser){
        setUser(JSON.parse(myUser))
      }
  },[])
  
  const notesToShow = notes.filter((note)=> showAll ? true : note.important)
  console.log('notes to show', notesToShow)
  
  const handleSubmit = (event) => {
    event.preventDefault(); //prevent page refresh
    let myNote = {
      content: newNote, 
      id: notes.length + 1, 
      important:Math.random()>0.5
    }
    //Create (axios.post)
    let postPromise = noteService.create(myNote, user.token)
    console.log("inside handleSubmit post:", postPromise)
    postPromise.then((result)=>{
      console.log("note created data return", result.data)
      setNotes(notes.concat(result.data))
      console.log("post note",notes)
    setNewNote("")
    }).catch(error => {
      setNotification(error.response.data.error);
        setTimeout(() => {
          setNotification("")
        }, 2000)
        if(error.response.data.error === 'token expired'){
          setUser(null)
          window.localStorage.removeItem('noteUser')
        }
    })
  
  }
  
  const handleChange = (event) => {
    setNewNote(event.target.value)
  }
  
  const handleClick = () => {
    setShowAll(!showAll)
  }

//Button that display and change notes.important in FrontEnd(state) and BackEnd(server)
  const updateData =(id)=> {
    //1. update the server
    let currentNote = notes.find((note)=>{return note.id === id})
    let updatedNote = {...currentNote, important: !currentNote.important}
    let putPromise=noteService.update(id, updatedNote)
    putPromise.then((result)=>{
      console.dir(result)
      let updatedNote = result.data
      //2. update the state
      setNotes(
        notes.map((note)=>
          note.id===updatedNote.id?updatedNote:note)
      )
    }).catch(err=>{
      console.log("some error here")
      console.dir(err)
      if(err.response.status===404){
        console.log("this means id doesnot exists in server");
        // alert(`This note "${currentNote.content}" doesnot exist`)
        setNotification(`This note "${currentNote.content}" doesnot exist`);
        setTimeout(() => {
          setNotification("")
        }, 2000);
        setNotes(notes.filter((note)=> note.id !== currentNote.id))
      }else{console.log('this is some other error')}
    })
    
  }
  
  //For inline styling
  const myStyle = {
    fontSize: "60px"
  }

   //For handling login 
   const handleLogin = async(event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      let loggedinUser = await loginService.login({
        username,
        password
      })
      console.log('logged in user', loggedinUser)
      setUser(loggedinUser)
      setUsername('')
      setPassword('')
      //For storing data in the browser's local storage which is a way to persist data even after the page is refreshed or the browser is closed and reopened.
      window.localStorage.setItem('noteUser', JSON.stringify(loggedinUser))
    } catch (error) {
      setNotification(error.response.data.error);
        setTimeout(() => {
          setNotification("")
        }, 2000)
    }
    
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
    )
  }

  const noteForm = () => {
    return (
      <form onSubmit={handleSubmit}>
  <input  value={newNote} onChange={handleChange} />
  <button type="submit">Submit</button>
  </form>
    )
  }



  return (
    <>
    <h1 style={myStyle} className="redbackground">Notes</h1>
    <Notification message={notification} />

    <h1>Login Form</h1>
    {user === null?loginForm():noteForm()}

    <br />
    <h1>Notes</h1>
    <button onClick={handleClick}>show {showAll?"important":"all"} </button>
  
    <ul>
      {notesToShow.map((value)=>{
        return <Note key={value.id} note={value} updateNote={()=>{updateData(value.id)}} />
      })}
  </ul>
  
  <form onSubmit={handleSubmit}>
  <input  value={newNote} onChange={handleChange} />
  <button type="submit">Submit</button>
  </form>
  </>
  );
  };

export default App;
