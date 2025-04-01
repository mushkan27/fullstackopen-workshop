import Note from "./components/Note";
import { useState } from "react";

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

//Using Map method
const App = (props) => {
const [notes, setNotes] = useState(props.notes)
const [newNote, setNewNote] = useState("");
const [showAll, setShowAll] = useState(false)

//to show important notes
const notesToShow = notes.filter((note)=> showAll ? true : note.important
  // {
  // return note.important
// }
)

const handleSubmit = (event) => {
  event.preventDefault(); //prevent page refresh
  setNotes(notes.concat({
    content: newNote, 
    id: notes.length + 1, 
    important:Math.random()>0.5}))
  setNewNote("")
  // debugger;
  console.log("form has been submitted")

}

const handleChange = (event) => {
  // console.log("typing")
  // console.log(event.target.value);
  setNewNote(event.target.value)
}

const handleClick = () => {
  setShowAll(!showAll)
}

return (
  <>
  <h1>Notes</h1>
  <button onClick={handleClick}>show {showAll?"important":"all"} </button>

  <ul>
    {notesToShow.map((value)=>{
      return <Note key={value.id} note={value}/>
    })}
</ul>

<form onSubmit={handleSubmit}>
{/* <input  value={newNote}  />  //controlled component: where the form elemenents like input, select are fully controlled by component's state rather than the DOM itself */}
<input  value={newNote} onChange={handleChange} />
<button type="submit">Submit</button>
</form>


</>
);
};

export default App;
