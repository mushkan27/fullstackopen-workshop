let SayHello = (props) =>{
    return React.createElement("h1", {id: "myid"}, `Hello ${props.firstName}`)
};

let App = () => {
    return React.createElement("div", {}, [
        React.createElement(SayHello, {firstName: 'Muskan'}), 
        React.createElement(SayHello, {firstName: 'Pasang'})
    ])
}


let container = document.getElementById("root")
let root = ReactDOM.createRoot(container);

root.render(React.createElement(App))



