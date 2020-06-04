import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {Route, Switch} from 'react-router-dom'
import Main from "./component/Main"
import ProtectedRoute from "./routing/ProtectRoute"
import Landing from './component/Landing';
import "./css/Main.css"

function App() {
  return (
      <Switch>
        <Route exact path="/land" component={Landing}/>        
        <ProtectedRoute exact path="/" component={Main} />
      </Switch>
  );
}

export default App;
