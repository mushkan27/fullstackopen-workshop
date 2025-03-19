
import React from "react";



let SayHello = (props) =>{
    // return React.createElement("h1", {id: "myid"}, `Hello ${props.firstName}`)
    return (
        <h1 id = 'myid'>
        Hello {props.firstName}
        </h1>
    )
    
};

export default SayHello