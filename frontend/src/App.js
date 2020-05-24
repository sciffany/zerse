import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { Route, Switch, BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"

import "./App.css"
import Password from "password/pages/Password"
import Welcome from "welcome/Welcome"
import Centered from "password/common/Centered"
import NotFound from "password/common/Notfound"
import { TopSpace } from "password/common/Styles"
import { createStore } from "redux"

import rootReducer from "password/infrastructure/rootReducer"

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function App() {
  return (
    <>
      <Provider store={store}>
        <TopSpace />
        <Centered>
          <Router>
            <Switch>
              <Route exact path={"/"} component={Welcome} />
              <Route path={"/password"} component={Password} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </Centered>
      </Provider>
    </>
  )
}

export default App
