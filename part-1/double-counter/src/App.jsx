import { useState } from "react";
import Display from "./Display";
import MyButton from "./MyButton";
import History from "./History";

// const App = () => {
// let [left, setLeft] = useState(1);
// let [right, setRight] = useState(1);

// const increaseByOneLeft = () => {
//   setLeft(left+1);
// }

// const increaseByOneRight = () => {
//   setRight(right + 1);
// }

//   return <div>
//     {left}
//     <MyButton somefunc={increaseByOneLeft} text={"Plus one"} />
//     {right}
//     <MyButton somefunc={increaseByOneRight} text={"Plus one"} />
  
//   </div>
// }

//Combined

const App = () => {
  let initialState = {
    left: 0,
    right: 0
  }

//Using object, array in state
  let [clicks, setClicks] = useState(initialState);
  let [clickHistory, setHistory] = useState([])
  let [totalClicks, setTotal] = useState(0)

  const increaseByOneLeft = () => {
    let newLeft = clicks.left + 1;
    let newState = {
      left: newLeft,
      right: clicks.right
    }
    setClicks(newState);
    setHistory(clickHistory.concat("L"));
    setTotal(newLeft + clicks.right);  // in case of push method it will show length of an array
  }

  const increaseByOneRight = () => {
    let newRight = clicks.right +1;
    setClicks({left:clicks.left, right: newRight});
    setHistory([...clickHistory, "R"]); //spread operator
    setTotal(clicks.left + newRight);
  }
  
  return (
    <div>
      {clicks.left}
      <MyButton somefunc={increaseByOneLeft} text={"Plus one"} />
      {clicks.right}
      <MyButton somefunc={increaseByOneRight} text={"Plus one"} />
      <History history={clickHistory}/>
      {/* <div>clickHistory: {clickHistory}</div> */}
      <div>totalClicks: {totalClicks}</div>
    </div>
  )



}



export default App;
