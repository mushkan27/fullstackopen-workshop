
import React from "react";



// let SayHello = (props) =>{
//     // return React.createElement("h1", {id: "myid"}, `Hello ${props.firstName}`)
//     return (
//         <h1 id = 'myid'>
//         {/* Hello {props.firstName} {props.lastName} {props.id} */}
// {/* MAP */}
//         Hello {props.person.firstName} {props.person.lastName} {props.person.id}
//         </h1>
//     )
    
// };


// DESTRUCTURE
let SayHello = ({person}) =>{
    const getFullName = () => {
        return `${person.firstName} ${person.lastName} ${person.id}`
    }
    return (
        <h1 id = 'myid'>
        {/* Hello {person.firstName} {person.lastName} {person.id} */}

        Hello {getFullName()}
        </h1>
    )
    
};


// Or,
// let SayHello = ({person: {firstName, lastName, id}}) =>{
//     return (
//         <h1 id = 'myid'>
//         Hello {firstName} {lastName} {id}
//         </h1>
//     )
    
// };

export default SayHello