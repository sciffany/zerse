import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import * as serviceWorker from "./serviceWorker"
import "antd/dist/antd.css"
import React from "react"

console.log(process.env.REACT_APP_STUFF)
console.log(process.env.REACT_APP_ASDF)
console.log(process.env.REACT_APP_qweRty)

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
