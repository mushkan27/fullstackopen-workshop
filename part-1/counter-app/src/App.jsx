import { useState } from "react";
import Display from "./Display";


//Manual re-render
// const App = (props) => {
//   return <div>{props.counter}</div>;
// };

//useState
// const App = () => {
//   let [counter, setCounter] = useState(1)

//   setTimeout(()=>{
//     setCounter(counter+1)
//   },1000)

//   return <div>{counter}</div>
// }

//React Event Handling
const App = () => {
let [counter, setCounter] = useState(1);

// setTimeout(()=> {
//   setCounter(counter+1)
// }, 1000)

const increaseByOne = () => {
  setCounter(counter+1);
}

  return <div>
    <Display counter = {counter} />
  <button onClick = {increaseByOne} >Plus one</button>
  </div>
}

export default App;
