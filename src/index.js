import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from 'react-router-dom'
import './css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css'
import './css/bootstrap-icons.css'
import { Provider } from 'react-redux'
import Store from './redux/Store'
ReactDOM.createRoot(document.querySelector("#root")).render(
  <BrowserRouter>
    <Provider store={Store} >
      <App />
    </Provider>
  </BrowserRouter>
);
