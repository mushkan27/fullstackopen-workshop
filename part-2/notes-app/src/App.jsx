import Note from "./components/Note";

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
const App = ({notes}) => {
return (
  <>
  <h1>Notes</h1>
  <ul>
    {notes.map((value)=>{
      return <Note key={value.id} note={value}/>
    })}
</ul>
</>
);
};

export default App;
