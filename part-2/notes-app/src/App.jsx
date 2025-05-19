import Note from "./components/Note";
import { useState, useEffect } from "react";
// import axios from "axios"
// import getAll from "./services/notes"; //not valid when using `export default { getAll, create }
import noteService from "./services/notes";
import Notification from "./components/Notification";

// const App = (props) => {
//   return (
//     <>
//     <h1>Notes</h1>
//     <ul>
//       <li>{props.notes[0].content} </li>
//       <li>{props.notes[1].content}</li>
//         <li>{props.notes[2].content}</li>
//   </ul>
//   </>
// );}

//USING MAP METHOD
// const App = (props) => {
// const [notes, setNotes] = useState(props.notes)
// const [newNote, setNewNote] = useState("");
// const [showAll, setShowAll] = useState(false)

// //to show important notes
// const notesToShow = notes.filter((note)=> showAll ? true : note.important
//   // {
//   // return note.important
// // }
// )

// const handleSubmit = (event) => {
//   event.preventDefault(); //prevent page refresh
//   setNotes(notes.concat({
//     content: newNote, 
//     id: notes.length + 1, 
//     important:Math.random()>0.5}))
//   setNewNote("")
//   // debugger;
//   console.log("form has been submitted")

// }

// const handleChange = (event) => {
//   // console.log("typing")
//   // console.log(event.target.value);
//   setNewNote(event.target.value)
// }

// const handleClick = () => {
//   setShowAll(!showAll)
// }

// return (
//   <>
//   <h1>Notes</h1>
//   <button onClick={handleClick}>show {showAll?"important":"all"} </button>

//   <ul>
//     {notesToShow.map((value)=>{
//       return <Note key={value.id} note={value}/>
//     })}
// </ul>

// <form onSubmit={handleSubmit}>
// {/* <input  value={newNote}  />  //controlled component: where the form elemenents like input, select are fully controlled by component's state rather than the DOM itself */}
// <input  value={newNote} onChange={handleChange} />
// <button type="submit">Submit</button>
// </form>
// </>
// );
// };


//USE EFFECT, AXIOS
const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(false)
  const [notification, setNotification] = useState('')

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
    //   .catch((err)=>{
    //     console.log("error occured")
    //       console.dir(err)
    // })
    
    // console.log("inside useEffect get:", myAxiosPromise) //Promise Object
  }
    ,[])
  
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
    let postPromise = noteService.create(myNote)
    console.log("inside handleSubmit post:", postPromise)
    postPromise.then((result)=>{
      console.log("note created data return", result.data)
      setNotes(notes.concat(result.data))
      console.log("post note",notes)
    setNewNote("")
    
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


  return (
    <>
    <h1 style={myStyle} className="redbackground">Notes</h1>
    <Notification message={notification} />
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
