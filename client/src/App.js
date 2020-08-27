import React, { useState } from 'react';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Main from './components/main/main';
import Login from './components/login/login';
import Signup from './components/signup/signup';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const App = () => {
 
  const [toMain, setToMain] = useState('');

  function funcToMain(msg) { setToMain(msg) }

  return (
    <div className="App">

        <Router>
          <Header toMain={toMain}/>

          <Switch>
              <Route exact path="/">
                  <Main toMain={toMain}/>
              </Route>
              <Route path="/login">
                  <Login funcToMain={funcToMain} />
              </Route>
              <Route path="/signup">
                  <Signup />
              </Route>
          </Switch>

          <Footer/>
        </Router>
      
    </div>
  );
}

export default App;
