import React from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.js"; // Ensure the case and extension match
import SayHello from "./SayHello"

let App = () => {
    // return React.createElement('div', {}, [
    //     React.createElement(SayHello, {firstName: "Muskan"}),
    //     React.createElement(SayHello, {firstName: "Pasang"})
    // ])

    return (
        <div>
            <SayHello firstName = 'Muskan' />
            <SayHello firstName = 'Pasang' />
            <SayHello firstName = 'Deepanjali' />
        </div>
    )
}

export default App;