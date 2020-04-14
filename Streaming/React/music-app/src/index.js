import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './index.css';
import App from './App';
import Login from './login/Login.js';
import CreateNewUser from './login/CreateNewUser.js';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Router>
      <div>
      <Switch>
        <Route exact path="/createNewUser">
          <CreateNewUser />
        </Route>
        <Route exact path="/">    {/** checks from top to bottom; if we dont use exact path, this one will be shown in cases of 404 - and if it was first, we could never reach any other paths */}
          <Login />
        </Route>
        
        {/* add routes to new components here */}

      </Switch>
      </div>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
