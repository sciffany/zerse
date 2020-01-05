import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import App from "./App"
import Password from "./components/password/index.tsx"
import NotFound from "./components/common/notfound.tsx"
import * as serviceWorker from "./serviceWorker"
import "bootstrap/dist/css/bootstrap.css"

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/password" component={Password} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
