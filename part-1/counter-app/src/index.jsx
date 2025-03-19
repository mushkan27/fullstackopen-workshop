import ReactDOM from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(<App />)

//Manual re-render

// let counter = 1;

// root.render(<App counter={counter} />);

// setInterval(()=>{
//     counter = counter+1;
//     root.render(<App counter={counter} />);

// },1000)
