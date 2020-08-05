import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validateQuestion } from "./utils/validateQuestion";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AddQuestions from "./components/addQuestions";
import flux from "./flux/index.js";
import GetQuestions from './components/getQuestions'
import 'semantic-ui-css/semantic.min.css'



const getFlux = () => {
  console.log(flux);
};

export default function App1() {
  return (
    <Router>
      <div className = 'container-fluid'>
        <button
          onClick={() => {
            getFlux();
          }}
        >
          get flux
        </button>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/addQuestions">Add Questions</Link>
            </li>
            <li>
              <Link to="/getQuestions">Get questions</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <h2>About</h2>
          </Route>
          <Route path="/addQuestions">
            <AddQuestions />
          </Route>
          <Route path = '/getQuestions'>
            <GetQuestions />
          </Route>
          <Route path="/">
            <h2>Home</h2>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

render(<App1 />, document.getElementById("root"))