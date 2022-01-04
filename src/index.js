import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Provider } from "react-redux"
import configureStore from "./redux/store"

import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import "./styles/SideBar.scss"
import "./styles/HomePage.scss"
import "./styles/LikePage.scss"
import "./styles/LibraryPage.scss"
import "./styles/GeneralCard.scss"
import "./styles/Main.scss"

ReactDOM.render(
  <Provider store={configureStore}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();