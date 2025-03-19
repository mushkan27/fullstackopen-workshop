import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.js"; // Ensure the case and extension match
import SayHello from "./SayHello"



let App = () => {
    // return React.createElement('div', {}, [
    //     React.createElement(SayHello, {firstName: "Muskan"}),
    //     React.createElement(SayHello, {firstName: "Pasang"})
    // ])

    let peopleArray = [{firstName: "Muskan", lastName: "Lama", id: 201},
        {firstName: "Pasang", lastName: "Bhuti", id: 202},
        {firstName: "Deepanjali", lastName: "Daisuke", id: 203}]

    // let peopleArray = []

        if(peopleArray > 0){
            return (
                <div>
                    {/* <SayHello firstName = {peopleArray[0].firstName} lastName = {peopleArray[0].lastName} id = {peopleArray[0].id} />
                    <SayHello firstName = {peopleArray[1].firstName} lastName = {peopleArray[1].lastName} id = {peopleArray[1].id}  />
                    <SayHello firstName = {peopleArray[2].firstName} lastName = {peopleArray[2].lastName} id = {peopleArray[2].id}  /> */}
                    
                    {/* {peopleArray.map((value) => (<SayHello firstName = {value.firstName} lastName = {value.lastName} key = {value.id} />))} */}
        {/* MAP */}
                    {peopleArray.map((value) => (<SayHello person = {value} key = {value.id} />))}
        
                </div>
            )
        }

        return (
            <h1>There is no data</h1>
        )

    
}

export default App;