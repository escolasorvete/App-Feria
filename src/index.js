import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { App } from "./App";
import FormPage from "./FormPage";
import AdminSegments from "./AdminSegments"
require('dotenv').config();

const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/FormPage" component={FormPage} />
        <Route path="/AdminSegments" component={AdminSegments} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
