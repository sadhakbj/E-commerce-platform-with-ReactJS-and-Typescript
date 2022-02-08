import React from "react"
import { Provider } from "react-redux"
import Router from "./common/router/Router"
import store from "./store/index"

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
