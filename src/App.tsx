import React from "react"
import { Provider, useSelector } from "react-redux"
import Router from "./common/router/Router"
// pages
import store from "./store/index"
import { RootState } from "./store/reducers"

const App: React.FC = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  )
}

export default App
